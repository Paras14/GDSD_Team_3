const db = require("../models");
const Reservation = db.reservation;
const Restaurant = db.restaurant;
const Op = db.Sequelize.Op;

// Create and Save a new Reservation
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body.date) {
      res.status(400).send({
        message: "Reservation date can not be empty!"
      });
      return;
    }
  
    // Create a Reservation
    const reservation = {
        date: req.body.date,
        numberofplaces: req.body.numberofplaces,
        userId: req.body.userId,
        restaurantId: req.body.restaurantId
    };
  
    // Save Reservation in the database
    Reservation.create(reservation)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Reservation."
        });
      });
  };

exports.update = (req, res) => {
    const id = req.params.id;
  
    Reservation.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Reservation was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Reservation with id=${id}. Maybe Reservation was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Reservation with id=" + id
        });
      });
  }
  
  
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Reservation.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Reservation was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Reservation with id=${id}. Maybe Reservation was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Reservation with id=" + id
        });
      });
  };

//Get a single Reservation with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Reservation.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Reservation with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Reservation with id=" + id
        });
      });
  };

  //Get all reservations from a user
    exports.findAllFromUser = (req, res) => {
        const id = req.params.id;
        Reservation.findAll({ where: { userId: id } })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving reservations."
            });
          });
      };

//Get all reservations from a restaurant
exports.findAllFromRestaurant = (req, res) => {
    const id = req.params.id;
    Reservation.findAll({ where: { restaurantId: id } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving reservations."
        });
      });
  };

  //Get all reservations from a manager
    exports.findAllFromManager = (req, res) => {
        const id = req.params.id;
        Restaurant.findOne({ where: { userId: id } }).then(data => {
            Reservation.findAll({ where: { restaurantId: data.id } })
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving reservations."
              });
            });
        });
        };
