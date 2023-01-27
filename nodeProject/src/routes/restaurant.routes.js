
module.exports = app => {
    const restaurants = require("../controllers/restaurants.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", restaurants.create);
  
    // Retrieve all REstaurants with accepted petition
    router.get("/", restaurants.findAllAccepted);
    // Retrieve a single Tutorial with id
    router.get("/:id", restaurants.findOne);

    // Update a Restaurant with id
    router.put("/:id", restaurants.update);

    // Delete a Restaurant with id
    router.delete("/:id", restaurants.delete);

    // Delete all Restaurants
    router.delete("/", restaurants.deleteAll);

  
    app.use('/restaurants', router);
  };