const e = require("express");
const { table } = require("../models");
const db = require("../models");
const Reservation = db.reservation;
const Restaurant = db.restaurant;
const OrderReservation = db.orderReservation; 
const Table = require('./table.controller');
const Parking = require('./parking.controller');
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
        restaurantId: req.body.restaurantId,
        table: req.body.table,
        parking: req.body.parking
    };
    
    Table.checkFree(req, res)
      .then((out) => {
        const req = out.req;
        const res = out.res;
        console.log("reached table.then");
        console.log(req.body);
        Parking.checkFree(req, res)
          .then((out) => {
              const req = out.req;
              const res = out.res;
              // Save Reservation in the database
              const reservation = {};
              reservation.date = req.body.date;
              reservation.numberofplaces = req.body.numberofplaces;
              reservation.userId = req.body.userId;
              reservation.restaurantId = req.body.restaurantId;
              db.reservation.create(reservation)
              .then(async (data) => {
                //res.send(data);
                let tables = [];
                let parkings = [];
                

                //create list of tables to update
                for(i in req.body.table){
                  let current = req.body.table[i];
                  current.status = 1;
                  tables.push(current);
                }
                

                //create list of parkings to update
                for(i in req.body.parking){
                  let current = req.body.parking[i];
                  current.status = 1;
                  parkings.push(current);
                }
                
                data.table = tables;
                data.parking = parkings;
                
                const output = {};
                output.reservation = data;
                
                output.table = await db.table.bulkCreate(tables, { updateOnDuplicate: ["status"] })
                  .catch(err => {
                    res.status(500).send({
                      message:
                        err.message || "Some error occurred while updating the tables."
                    });
                  });

                //update status of parkings
                output.parking = await db.parking.bulkCreate(parkings, { updateOnDuplicate: ["status"] })
                  .catch(err => {
                    res.status(500).send({
                      message:
                        err.message || "Some error occurred while updating the parkings."
                    });
                  });

                  res.send(output);
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the Reservation."
                });
              });
              
              
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Reservation."
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Reservation."
        });
      });
      
    // Save Reservation in the database
    // Reservation.create(reservation)
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the Reservation."
    //     });
    //   });
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



//Adding code for managing orders for a reservation

exports.addOrder = (req, res) => {
      const id = req.body.id;
      const foodQuantity = req.body.list; 
      if(!req.body.id){
        res.status(400).send({
          message: "Reservation Id can not be empty!"
        });
        return;
      }

      let list = [];
      for(i in foodQuantity){
        let currentRow = {};
        currentRow.reservationId = parseInt(id);
        currentRow.foodId = parseInt(foodQuantity[i].foodId);
        currentRow.quantity = parseInt(foodQuantity[i].quantity);
        list.push(currentRow);
      }
      console.log(list);
      OrderReservation.bulkCreate(list)
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

exports.getAllOrder = (req, res) => {
    const id = req.body.reservationId;
    OrderReservation.findAll({where:{reservationId:id}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving foods for given Reservation ID"
      });
    });
}

exports.deleteAllOrder = (req, res) => {
  const id = req.params.reservationId;

  OrderReservation.destroy({
    where: { restaurantId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "All orderes were deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete orders with reservation id=${id}. Maybe Reservation was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete orders with reservation id=" + id
      });
    });
};
