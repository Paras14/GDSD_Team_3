const e = require("express");
const { table } = require("../models");
const db = require("../models");
const Reservation = db.reservation;
const Restaurant = db.restaurant;
const OrderReservation = db.orderReservation; 
const Table = require('./tables.controller');
const Parking = require('./parkings.controller');
const Op = db.Sequelize.Op;
const Sequelize = db.sequelize;
const {QueryTypes} = require('sequelize');

//Get table number by reservationId
exports.getTableNumber = (req, res) => {
  console.log("In the controller for getTableNumber");
  const tableGetQuery = `Select * from reservationTable where reservationId = ${req.params.id}`;
  Sequelize.query(tableGetQuery, { type: QueryTypes.SELECT })
  .then((data) => {
    res.status(200).send(
      data
    );
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while selecting ReservationTable entry."
    });
  })
}