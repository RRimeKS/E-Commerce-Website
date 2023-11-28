//custom modules
const ApiError = require("../utils/ApiError");
//modules

exports.get_all = (Model) => async (req, res, next) => {
  try {
    const documents = await Model.find();
    res.status(200).json({ data: documents });
  } catch (error) {
    return next(new ApiError(`Document error: ${error}`, 400));
  }
};
exports.get_one = (Model) => async (req, res, next) => {
  const id = req.params.id;
  try {
    const Document = await Model.findById(id);
    if (!Document) {
      return res.render("partials/404");
    }
    res.status(200).json({ data: Document });
  } catch (error) {
    return next(new ApiError(`Document error: ${error}`, 400));
  }
};

exports.create_one = (Model, Path) => async (req, res, next) => {
  try {
    console.log(req.body);
    const Document = await Model.create(req.body);
    res.redirect(Path);
  } catch (error) {
    return next(new ApiError(`create Document error: ${error}`, 400));
  }
};

exports.deleteOne = (Model) => async (req, res, next) => {
  const id = req.params.id;
  try {
    const Document = await Model.findByIdAndDelete(id);
    res.status(200).json({ data: Document });
  } catch (error) {
    return next(new ApiError(`Document error: ${error}`, 400));
  }
};

exports.updateOne = (Model, path) => async (req, res, next) => {
  const id = req.params.id;
  const bodyData = req.body;
  console.log(bodyData);
  try {
    const findData = await Model.findOneAndUpdate({ _id: id }, { bodyData });
    res.redirect(path);
  } catch (error) {
    return next(new ApiError(`Document error: ${error}`, 400));
  }
};