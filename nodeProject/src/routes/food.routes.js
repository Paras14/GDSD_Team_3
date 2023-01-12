
module.exports = app => {
    const foods = require("../controllers/foods.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", foods.create);
  
    // Retrieve all Tutorials
    router.get("/", foods.findAll);
  
  
    app.use('/foods', router);
  };