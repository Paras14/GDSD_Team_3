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

    router.put("/order/:id/status", reservations.changeStatus);

    // Get all food corresponding to a reservation
    router.get("/order/:reservationId", reservations.getAllOrder);

     // Delete all food corresponding to a reservation
    router.delete("/order/:reservationId", reservations.deleteAllOrder);

    //Get a Table corresponding to the reservation
    router.get("/tables/:id", reservations.getTableNumber);

    router.get("/:reservationId/tables", reservations.getReservationTables);

    router.get("/:reservationId/parkings", reservations.getReservationParkings);

    // Get a list of orders for a reservation
    //router.get("/order/:id", reservations.findAllOrders);

    // Delete all orders for a reservation
    //router.delete("/order/delete/:id", reservations.deleteAllOrders);


  
    app.use('/reservations', router);
  };