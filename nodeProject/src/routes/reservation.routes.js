module.exports = app => {
    const reservations = require("../controllers/reservation.controller");
  
    var router = require("express").Router();
  
    // Create a new Reservation
    router.post("/", reservations.create);
  
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

    // Create new orders for a reservation
    router.post("/order/add", reservations.addOrder);

    // Get all food corresponding to a reservation
    router.get("/order/:reservationId", reservations.getAllOrder);

     // Delete all food corresponding to a reservation
    router.delete("/order/:reservationId", reservations.deleteAllOrder);

    // Get a list of orders for a reservation
    //router.get("/order/:id", reservations.findAllOrders);

    // Delete all orders for a reservation
    //router.delete("/order/delete/:id", reservations.deleteAllOrders);


  
    app.use('/reservations', router);
  };