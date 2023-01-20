module.exports = app => {
    const reservations = require("../controllers/reservations.controller");
  
    var router = require("express").Router();
  
    // Create a new Reservation
    router.post("/", reservations.create);
  
    // Retrieve all Reservations
    router.get("/", reservations.findAll);
  
    // Retrieve a single Reservation with id
    router.get("/:id", reservations.findOne);
  
    // Update a Reservation with id
    router.put("/:id", reservations.update);
  
    // Delete a Reservation with id
    router.delete("/:id", reservations.delete);

    // Get a list of reservations of a user
    router.get("/user/:id", reservations.findAllFromUser);

    //Get a list of reservations of a manager
    router.get("/manager/:id", reservations.findAllFromManager);

    //Get a list of reservations of a restaurant
    router.get("/restaurant/:id", reservations.findAllFromRestaurant);


  
    app.use('/reservations', router);
  }