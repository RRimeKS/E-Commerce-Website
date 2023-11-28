const mongoose = require('mongoose'); // Erase if already required
//models
const Product = require("./product.model");

// Declare the Schema of the Mongo model
var reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
        min: [1, "Min rating value is 1"],
        max: [5, "Min rating value is 5"]
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
}, { timestamps: true });

reviewSchema.pre(/^find/, function (next) {
    this.populate({ path: "user", select: "-_id" });
    this.populate({ path: "product", select: "" });
    next();
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (productId) {
    const result = await this.aggregate([
        {
            $match: { product: productId }
        },
        {
            $group: {
                _id: "product",
                avgRating: { $avg: "$ratings" },
                ratingQuantity: { $sum: 1 }
            }
        }
    ]);

    if (result.length > 0) {
        await Product.findByIdAndUpdate(productId, { ratingsAverage: result[0].avgRating, ratingQuantity: result[0].ratingQuantity });
    }
    console.log(result);
}

//added review
reviewSchema.post("save", async function () {
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
});
//deleted review
reviewSchema.post("remove", async function () {
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

//Export the model
module.exports = mongoose.model('Reviews', reviewSchema);