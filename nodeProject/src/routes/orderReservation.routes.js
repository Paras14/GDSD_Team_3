const { checkAdmin } = require("../auth/role_validation");
const { checkToken } = require("../auth/token_validation");

module.exports = app => {
    const orderReservations = require("../controllers/orderReservation.controller");
    var router = require("express").Router();

    //Waiters can check the food order list.
    router.get("/:id/getFoodOrders", checkToken, orderReservations.getFoodOrders);

    //Waiters can mark orders as served.
    router.post("/markOrderAsServed/:id", orderReservations.markAsServed);

    app.use('/waiters', router);
};

