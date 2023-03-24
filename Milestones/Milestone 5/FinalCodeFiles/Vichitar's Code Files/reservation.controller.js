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

// Create and Save a new Reservation
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.date) {
      res.status(400).send({
        message: "Reservation date can not be empty!"
      });
      return;
    }
    //Check if the tables requested are free
    Table.checkFree(req, res)
      .then((out) => {
        const req = out.req;  //out will return req and res objects
        const res = out.res;
        //Check if the parking spots requested are free
        Parking.checkFree(req, res)
          .then((out) => {
              const req = out.req;
              const res = out.res;
              // Save Reservation in the database
              const reservation = {};
              if(!req.params.noHeader)  
                reservation.id = req.body.id;
              reservation.date = req.body.date;
              reservation.numberofplaces = req.body.numberofplaces;
              reservation.userId = req.body.userId;
              reservation.restaurantId = req.body.restaurantId;
              Reservation.create(reservation)
              .then(async (data) => {
                let tables = [];
                let parkings = [];
                let reservationTablesQuery = "INSERT INTO reservationTable (reservationId, tableId, createdAt, updatedAt) VALUES";
                let reservationParkingsQuery = "INSERT INTO reservationParking (reservationId, parkingId, createdAt, updatedAt) VALUES";
                //create list of tables to update
                for(i in req.body.table){
                  let current = req.body.table[i];
                  current.status = 1;
                  tables.push(current);
                  reservationTablesQuery += `(${data.id}, ${current.id}, '${new Date(data.createdAt).toISOString().replace("T", " ").split(".")[0]}', '${new Date(data.updatedAt).toISOString().replace("T", " ").split(".")[0]}'),`;
                }
                

                //create list of parkings to update
                for(i in req.body.parking){
                  let current = req.body.parking[i];
                  current.status = 1;
                  parkings.push(current);
                  reservationParkingsQuery += `(${data.id}, ${current.id}, '${new Date(data.createdAt).toISOString().replace("T", " ").split(".")[0]}', '${new Date(data.updatedAt).toISOString().replace("T", " ").split(".")[0]}'),`;
                }
                
                data.table = tables;
                data.parking = parkings;
                
                const output = {};
                output.reservation = data;
                //update status of tables
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

                  //link reservation to tables
                  if(tables.length > 0){
                      reservationTablesQuery = reservationTablesQuery.slice(0, -1);
                    Sequelize.query(reservationTablesQuery, { type: QueryTypes.INSERT })
                      .catch(err => {
                        res.status(500).send({
                          message:
                            err.message || "Some error occurred while updating the orderReservation."
                        });
                      });
                    }
                  
                  //link reservation to parkings
                  if(parkings.length > 0){
                    reservationParkingsQuery = reservationParkingsQuery.slice(0, -1);
                    Sequelize.query(reservationParkingsQuery, { type: QueryTypes.INSERT })
                      .catch(err => {
                        res.status(500).send({
                          message:
                            err.message || "Some error occurred while updating the orderReservation."
                        });
                      });
                  }
                  
                  if(!req.params.noHeader)  //if update is being executed, do not send headers
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
  };

exports.update = (req, res) => {
    const id = req.params.id;
    
    // Validate request
    console.log(req.body);
    if (!req.body.date) {
      res.status(400).send({
        message: "Reservation date can not be empty!"
      });
      return;
    }
  
    //check if the new selected tables are available
    let query = "Select * from tables where (id in (";
  for(let table in req.body.table){
    query += req.body.table[table].id + ",";
  }
  if(req.body.table.length == 0)
    query += "0";
  else
    query = query.slice(0, -1);
  query += ")) and (id not in (select tableId from reservationTable where reservationId = " + id + ")) and status = 1";
  Sequelize.query(query, { type: QueryTypes.SELECT })
    .then( (data) => {
      if(data.length > 0){  //if there is any new selected table with status 1, do not proceed further
        res.status(500).send({
          message:
            "Some tables are already reserved."
        });
      }
      //check if the new selected parkings are available
      let query = "Select * from parkings where (id in (";
      for(let parking in req.body.parking){
        query += req.body.parking[parking].id + ",";
      }
      if(req.body.parking.length == 0)
        query += "0";
      else
        query = query.slice(0, -1);
      query += ")) and (id not in (select parkingId from reservationParking where reservationId = " + id + ")) and status = 1";
      Sequelize.query(query, { type: QueryTypes.SELECT })
        .then( (data) => {
          if(data.length > 0){  //if the newly selected parkings are not available, do not proceed further
            res.status(500).send({
              message:
                "Some parkings are already reserved."
            });
          }
          // Update the reservation in the database
          let newReq = req;
          newReq.params.id = id;
          newReq.params.noHeader = true;
          exports.delete(newReq, res) //first delete the old reservation
            .then( () => {
              exports.create(newReq, res) //after deleting the reservation, create a new one with the updated details
                .then( (data) => {
                  setTimeout(() => {res.send(data);}, 1000);
                })
                .catch(err => {
                  res.status(500).send({
                    message:
                      err.message || "Some error occurred while updating the orderReservation."
                  });
                });
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while updating the orderReservation."
              });
            });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while updating the orderReservation."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the orderReservation."
      });
    });

  }
  
  
exports.delete = async (req, res) => {
    const id = req.params.id;
    //get all the tables and parkings linked to the reservation
    const tables = await Sequelize.query(`SELECT tableId FROM reservationTable WHERE reservationId = ${id}`, { type: QueryTypes.SELECT });
    const parkings = await Sequelize.query(`SELECT parkingId FROM reservationParking WHERE reservationId = ${id}`, { type: QueryTypes.SELECT });
    //free the tables
    for(let i in tables){
      Sequelize.query(`UPDATE tables SET status = 0 WHERE id = ${tables[i].tableId}`, { type: QueryTypes.UPDATE })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while deleting the orderReservation."
          });
      });
    }
    //free the parkings
    for(let i in parkings){
      Sequelize.query(`UPDATE parkings SET status = 0 WHERE id = ${parkings[i].parkingId}`, { type: QueryTypes.UPDATE })
        .catch(err => {
          res.status(500).send({
            message: 
              err.message || "Some error occurred while deleting the orderReservation."
          });
      });
    }
    //delete the entries corresponding to the reservation in the foreign key relation table
    Sequelize.query(`DELETE FROM reservationTable WHERE reservationId = ${id}`, { type: QueryTypes.DELETE })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while deleting the orderReservation."
            });
    });
    Sequelize.query(`DELETE FROM reservationParking WHERE reservationId = ${id}`, { type: QueryTypes.DELETE })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while deleting the orderReservation."
            });
    });
    //now that all related tables have been set, finally delete the reservation record
    Reservation.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1 && !req.params.noHeader) {
          res.send({
            message: "Reservation was deleted successfully!"
          });
        } else {
          if(!req.params.noHeader)
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
      //create a list of food id and corresponding quantity for the reservation
      let list = [];
      for(i in foodQuantity){
        let currentRow = {};
        currentRow.reservationId = parseInt(id);
        currentRow.foodId = parseInt(foodQuantity[i].foodId);
        currentRow.quantity = parseInt(foodQuantity[i].quantity);
        list.push(currentRow);
      }
      //add all the food pre ordered to the reservation
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

//get all the orders corresponding to a reservation
exports.getAllOrder = (req, res) => {
    const id = req.params.reservationId;
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

//delete all the orders corresponding to a reservation
exports.deleteAllOrder = (req, res) => {
  const id = req.params.reservationId;

  OrderReservation.destroy({
    where: { reservationId: id }
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

//get all the tables reserved in a reservation
exports.getReservationTables = (req, res) => {
  const id = req.params.reservationId;
  Sequelize.query(`Select tableId from reservationTable WHERE reservationId = ${id}`, { type: QueryTypes.SELECT })
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the tables reserved."
      });
    });

}

//get all the parkings reserved in a reservation
exports.getReservationParkings = (req, res) => {
  const id = req.params.reservationId;
  Sequelize.query(`Select tableId from reservationParking WHERE reservationId = ${id}`, { type: QueryTypes.SELECT })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the parkings reserved."
      });
    });

}

//change the status of all foods in the reservation
exports.changeStatus = (req, res) => {
  const status = req.body.data.status;
  console.log(status);
  OrderReservation.findOne({where: {reservationId: req.params.id}})
    .then( (data) => {
        const reservationId = data.reservationId;
        const query = "Update orderReservations set status = '" + status + "' where reservationId = " + reservationId;
        Sequelize.query(query, {type: QueryTypes.UPDATE})
        .then((data) => {
          res.status(200).send(
            {message: "Updated status of reservation with Id: " + reservationId + " to '" + status + "'"}
          );
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not change status"
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not change status"
      });
    });
}
