const { verifyEdit } = require("../middlewares");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
module.exports = app => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  const tutorials = require("../controllers/tutorial.controller.js");
  var router = require("express").Router();
  router.post("/", tutorials.create);
  router.get("/", tutorials.findAll);
  router.get("/:id", tutorials.findOne);
  router.put("/:id", [
    verifyEdit.checkDuplicateUsername
  ], tutorials.update);
  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials 
  router.delete("/", tutorials.deleteAll);

  app.use('/api/usersAll', [authJwt.verifyToken, authJwt.isAdmin], router);
  // app.use("/api/csv", router);
};
