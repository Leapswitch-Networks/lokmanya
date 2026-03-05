const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|icon|webp|svg/;
  const isAllowedType = allowedImageTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  if (!isAllowedType) {
    return cb(new Error("Invalid file type. Only JPEG/PNG/icons are allowed."));
  }
  cb(null, true);
};
const customFilename = (req, file, cb) => {
  let { prefix } = req.uploadOptions;
  const timestamp = Date.now();
  const filename = `${prefix || ""}_${timestamp}_${file.originalname}`;
  cb(null, filename);
};

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(req.uploadOptions.destination));
  },
  filename: customFilename,
});

exports.upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
});

exports.uploadMiddleware = (options, Modal, prefix) => {
  return async (req, res, next) => {
    req.uploadOptions = {
      destination: "./uploads/" + options.destination,
      prefix: `${prefix ? "_" + prefix : ""}`,
    };

    await upload.any("file")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  };
};
