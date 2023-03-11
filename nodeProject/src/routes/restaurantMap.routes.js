module.exports = app => {
    const restaurantMap = require("../controllers/restaurantMap.controller");
    var router = require("express").Router();

    router.get("/:restaurantId", restaurantMap.findAll);
    router.post("/", restaurantMap.create);
    router.put("/:restaurantId", restaurantMap.update);
    app.use('/restaurantMap', router);
};