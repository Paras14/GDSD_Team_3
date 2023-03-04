const {checkManager } = require("../auth/role_validation");

module.exports = app => {

    const table = require("../controllers/tables.controller");

    var router = require("express").Router();

    // Create a table
    router.post("/", checkManager, table.create);

    // Get all tables
    router.get("/all", table.findAll);

    // Get one table by id
    router.get("/:id", table.findOne);

    // Update table by Id
    router.put("/:id", table.update);

    // Delete table by id
    router.delete("/:id", checkManager, table.delete);

    // Get all tables in a restaurant
    router.get("/restaurant/:restaurantId", table.findAllInRestaurant);


    app.use('/tables', router);
};