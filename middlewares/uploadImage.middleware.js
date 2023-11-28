//modules
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const ApiError = require("../utils/ApiError");

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "images/jpg",
    "image/gif",
    "image/jpeg",
    "image/png",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb("Not allowed type", false);
  }

  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    console.log(require.main.filename);
    fs.mkdirSync(path.join(rootDir, "/uploads"), { recursive: true });
    cb(null, path.join(rootDir, "/uploads"));
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const fileName = `image_${Date.now()}-${uuidv4()}.${extension}`;

    if (!req.savedImages) req.savedImages = [];

    req.savedImages = [...req.savedImages, path.join(fileName)];

    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
