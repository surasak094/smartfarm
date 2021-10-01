const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const weatherRoutes = require("./routes/weather.routes");
const path = __dirname + '/../public';

const db = require("./models");
const initRoutes = require("./routes/csv.routes");
app.use(express.static(path));

global.__basedir = __dirname + "/";
var corsOptions = {
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
};
app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();
const Role = db.role;

//route
app.get('/', (req, res) => { res.header("Access-Control-Allow-Origin", "*"); res.sendFile(path + "index.html") });


//routes
weatherRoutes(app);
initRoutes(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require("./routes/turorial.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.\n`);
});
// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });

//   Role.create({
//     id: 2,
//     name: "moderator"
//   });

//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }