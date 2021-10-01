const multer = require("multer");

// const csvFilter = (req, file, cb) => {
//   if (file.mimetype.includes("vnd.ms-excel")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only csv file.", false);
//   }
// };

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-AI-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage});
module.exports = uploadFile;
