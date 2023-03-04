const {sequelize} = require("../models");
const db = require("../models");
const orderReservation = db.orderReservation;
const Op = db.Sequelize.Op;


//Waiters can check the food order list.
exports.getFoodOrders = (req, res) => {
    const id = req.params.id;
    
    
}