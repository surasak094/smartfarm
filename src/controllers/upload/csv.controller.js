const db = require("../../models");
const Tutorial = db.weathers;

const fs = require("fs");
const csv = require("fast-csv");
const CsvParser = require("json2csv").Parser;
const CsvData = [];
const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    // let tutorials = [];
    let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        CsvData.push(row);
      })
      .on("end", () => {
        res.json(CsvData);
        // console.log(tutorials);
        // Tutorial.bulkCreate(tutorials)
        //   .then(() => {
        //     res.status(200).send({
        //       message:
        //         "Uploaded the file successfully: " + req.file.originalname,
        //     });
        //   })
        //   .catch((error) => {
        //     res.status(500).send({
        //       message: "Fail to import data into database!",
        //       error: error.message,
        //     });
        //   });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getTutorials = (req, res) => {
  res.send(CsvData);
  // Tutorial.findAll()
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: 
  //         err.message || "Some error occurred while retrieving tutorials.",
  //     });
  //   });
};
const DeleteAPI = (req,res) =>{
  CsvData.splice(0)
  res.send(CsvData);
};
const download = (req, res) => {
  Tutorial.findAll().then((objs) => {
    let tutorials = [];

    objs.forEach((obj) => {
      const { id, title, description, published } = obj;
      tutorials.push({ id, title, description, published });
    });

    const csvFields = ["Id", "Title", "Description", "Published"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(tutorials);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");

    res.status(200).end(csvData);
  });
};

module.exports = {
  upload,
  getTutorials,
  download,
  DeleteAPI
};
