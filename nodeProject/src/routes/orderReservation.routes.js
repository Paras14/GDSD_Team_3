const { checkAdmin } = require("../auth/role_validation");
const { checkToken } = require("../auth/token_validation");

module.exports = app => {
    const orderReservations = require("../controllers/orderReservation.controller");
    var router = require("express").Router();

    //Waiters can check the food order list.
    

    app.use('waiters', router);
};