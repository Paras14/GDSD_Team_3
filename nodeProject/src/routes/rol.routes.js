const { checkToken } = require("../auth/token_validation");

module.exports = app => {
    const rols = require("../controllers/rols.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", checkToken, rols.create);
  
    // Retrieve all Tutorials
    router.get("/", rols.findAll);
  // Retrieve a single Tutorial with id
  router.get("/:id", rols.findOne);

  // Update a Tutorial with id
    router.put("/:id", checkToken, rols.update);

  // Delete a Tutorial with id
    router.delete("/:id", checkToken, rols.delete);

  // Delete all Tutorials
    router.delete("/", checkToken, rols.deleteAll);

  
    app.use('/rols', router);
  };