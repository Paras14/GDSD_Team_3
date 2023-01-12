
module.exports = app => {
    const restaurants = require("../controllers/restaurants.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", restaurants.create);
  
    // Retrieve all Tutorials
    router.get("/", restaurants.findAll);
  // Retrieve a single Tutorial with id
  router.get("/:id", restaurants.findOne);

  // Update a Tutorial with id
    router.put("/:id", restaurants.update);

  // Delete a Tutorial with id
    router.delete("/:id", restaurants.delete);

  // Delete all Tutorials
    router.delete("/", restaurants.deleteAll);

  
    app.use('/restaurants', router);
  };