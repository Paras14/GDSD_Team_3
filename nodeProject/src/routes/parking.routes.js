const {checkManager } = require("../auth/role_validation");

module.exports = app => {

    const parking = require("../controllers/parkings.controller");

    var router = require("express").Router();

    // Create a parking
    router.post("/", checkManager, parking.create);

    // Get all parkings
    router.get("/all", parking.findAll);

    // Get one parking by id
    router.get("/:id", parking.findOne);

    // Update parking by Id
    router.put("/:id", parking.update);

    // Delete parking by id
    router.delete("/:id", checkManager, parking.delete);

    // Get all parkings in a restaurant
    router.get("/restaurant/:restaurantId", parking.findAllInRestaurant);


    app.use('/parkings', router);
};