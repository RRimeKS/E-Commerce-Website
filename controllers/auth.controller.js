const ApiError = require("../utils/ApiError");
const bcrypt = require('bcrypt');
const crypto = require("crypto")
let jwt = require('jsonwebtoken');
const slugify = require('slugify');
//models
const User = require("../models/user.model");
//middlewares
const sendEmail = require("../middlewares/email-send.middleware")

exports.get_login = async (req, res, next) => {
    const message = req.session.message;
    delete req.session.message;
    try {
        res.render("auth/login", {
            title: "Giriş Yap",
            message: message
        });
    } catch (error) {
        return next(new ApiError(error, 400));
    }
}
exports.post_login = async (req, res, next) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            req.session.message = { text: "Girdiğiniz e-posta adresi ile eşleşen kullanıcı mevcut değil.", class: "warning" }
            return res.redirect("/signin");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            req.session.message = { text: "Hatalı parola.", class: "warning" }
            return res.redirect("/signin");
        }
        req.session.isAuth = true
        req.session.name = user.name;
        req.session.role = user.role;
        req.session.userId = (user._id).toString();

        const url = req.query.returnUrl || "/";
        res.redirect(url);

    } catch (error) {
        return next(new ApiError(error, 400));
    }
}

exports.get_register = async (req, res, next) => {
    try {
        res.render("auth/register", {
            title: "Kayıt Ol"
        });
    } catch (error) {
        return next(new ApiError(error, 400));
    }
}
exports.post_register = async (req, res, next) => {
    const user = User.findOne({ email: req.body.email })
    if (user) {
        req.session.message = { text: "Kayıt olmaya çalıştığınız eposta adresi ile kayıtlı kullanıcı bulunmaktadır", class: "warning" }
        return res.redirect("/signin");
    }
    try {
        const createUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 12),
            phone: req.body.phone,
            slug: slugify(req.body.name)
        });

        req.session.message = { text: "Kaydınız başarıyla tamamlanmıştır lütfen giriş yapınız.", class: "success" }
        sendEmail.sendMail({
            to: user.email,
            subject: "Kaydınız oluşturuldu",
            html: `Merhaba ${user.name}, </br> Petexpress'e hoş geldin bu epostayı görüyorsan hesabın başarıyla oluşturulmuş demektir </br> keyifli hobiler :)`
        });
        return res.redirect("/signin")
    } catch (error) {
        return next(new ApiError(error, 400));
    }
}

exports.get_logout = async (req, res, next) => {
    try {
        req.session.destroy();
        return res.redirect("/");
    } catch (error) {
        return next(new ApiError(error, 400));
    }
}

exports.get_resetPassword = async (req, res, next) => {
    const message = req.session.message;
    delete req.session.message;
    try {
        res.render("auth/reset-password", {
            title: "Şifremi Unuttum",
            message: message
        });

    } catch (error) {
        return next(new ApiError(error, 400))
    }
}
exports.post_resetPassword = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (!user) {
        req.session.message = { text: "Giridiğiniz eposta adresi ile eşleşen kullanıcı bulunmamaktadır!", class: "warning" }
        return res.redirect("/signin");
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto.createHash("sha256").update(resetCode).digest("hex")

    user.passwordResetCode = hashedResetCode;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerifed = false;

    await user.save();
    try {
        sendEmail.sendMail({
            from: "denemehesabi0102@outlook.com",
            to: user.email, subject: "Şifremi unuttum", html: `Merhaba <h4>${user.name}</h4> </br>
            Sana parola sıfırlama kodunu gönderdik lütfen 10dk içinde sıfırlama işlemini gerçekleştir eğer kod sana geç geldiyse yeni istek oluşturmayı unutma
            sıfırlama kodun: <h1>${resetCode}</h1> </br>

            kod doğrulama ekranını kapatırsan buradan tekrar ulaşabilirsin: <a href="localhost:5000/verify-code">Kod doğrulama</a>
           `,
        });

        req.session.message = { text: "Doğrulama kodun e-posta adresine gönderildi", class: "success" }
        return res.redirect("/verify-code");

    } catch (error) {
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetVerifed = undefined;

        await user.save();
        return next(new ApiError(error, 400))
    }
}

exports.get_verifyCode = async (req, res, next) => {
    const message = req.session.message;
    delete req.session.message;
    try {
        res.render("auth/verify-code", {
            title: "Kodunu doğrula",
            message: message
        });

    } catch (error) {
        return next(new ApiError(error, 400));
    }
}
exports.post_verifyCode = async (req, res, next) => {
    const resetCode = req.body.code;
    const hashedResetCode = await crypto.createHash("sha256").update(resetCode).digest("hex");
    try {
        const user = await User.findOne({ passwordResetCode: hashedResetCode, passwordResetExpires: { $gt: Date.now() } });

        if (!user) {
            req.session.message = { text: "Yanlış yada süresi geçmiş kod", class: "danger" }
            return res.redirect("/verify-code");
        }
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "90d" })

        user.passwordResetVerifed = true;
        user.resetToken = token;
        await user.save();

        return res.redirect(`/new-password/${token}`);
    } catch (error) {
        user.passwordResetVerifed = undefined;
        user.resetToken = undefined;
        await user.save();

        return next(new ApiError(error, 400));
    }
}

exports.get_newPassword = async (req, res, next) => {

    try {
        res.render("auth/new-password", {
            title: "Şifremi yenile"
        });

    } catch (error) {
        return next(new ApiError(error, 400));
    }
}
exports.post_newPassword = async (req, res, next) => {
    const token = req.params.token;
    try {
        const user = await User.findOne({ resetToken: token, passwordResetExpires: { $gt: Date.now() }, passwordResetVerifed: true });

        if (!user) {
            req.session.message = { text: "Eşleşme hatası tekrar deneyiniz.", class: "warning" }
            return res.redirect("/reset-password");
        }

        user.password = await bcrypt.hash(req.body.password, 12);
        user.passwordResetVerifed = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetCode = undefined;
        user.resetToken = undefined;
        await user.save();

        req.session.message = { text: "Parolanız başarıyla güncellendi.", class: "success" }
        return res.redirect("/signin");
    } catch (error) {
        user.passwordResetVerifed = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetCode = undefined;
        user.resetToken = undefined;
        await user.save();

        return next(new ApiError(error, 400));
    }
}