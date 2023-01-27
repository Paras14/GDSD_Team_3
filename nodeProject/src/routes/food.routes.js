
module.exports = app => {
    const foods = require("../controllers/foods.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Food
    router.post("/", foods.create);
  
    // Retrieve all Foods
    router.get("/", foods.findAll);

  // Retrieve a single Food with id
    router.get("/:id", foods.findOne);

  // Update a Food with id
    router.put("/:id", foods.update);

  // Delete a Food with id
    router.delete("/:id", foods.delete);

  // Delete all Foods
    router.delete("/", foods.deleteAll);

   // Retrieve all Foods with same restaurant id
    router.get("/restaurant/:restaurantId", foods.findAllInRestaurant);

    // Retrieve all Foods from a reservation id (NOT TO IMPLEMENT)
    //router.get("/reservation/:reservationId", foods.findAllFromReservation);

    app.use('/foods', router);
  };