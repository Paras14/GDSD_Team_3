
module.exports = app => {
    const restaurants = require("../controllers/restaurants.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", restaurants.create);
  
    // Retrieve all REstaurants with accepted petition
    router.get("/", restaurants.findAllAccepted);
    // Retrieve all REstaurants with pending petition
    router.get("/pending", restaurants.findAllPending);

    // Retrieve a single Tutorial with id
    router.get("/:id", restaurants.findOne);

    // Update a Restaurant with id
    router.put("/:id", restaurants.update); 

    // Delete a Restaurant with id
    router.delete("/:id", restaurants.delete);

    // Delete all Restaurants
    router.delete("/", restaurants.deleteAll);

    router.get("/tables/:id", restaurants.getTablesByManager);

    router.put("/tables/:id", restaurants.updateTableStatus);

    app.use('/restaurants', router);
  };