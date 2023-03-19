const db = require("../models");
const RestaurantMap = db.restaurantMap;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
const sequelize = db.sequelize;
const Table = db.table;
// Create and Save a new RestaurantMap
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body) {
      res.status(400).send({
        message: "RestaurantMap body can not be empty!"
      });
      return;
    }
    let restaurantMap = [];
    let tablesList = [];
    // Create a RestaurantMap
    for(let i in req.body){
        console.log(i);
        for(let j in req.body[i]){
            const element = {
                elementNumber: req.body[i][j].id.substring(1),
                elementType: i,
                x: req.body[i][j].x,
                y: req.body[i][j].y,
                height: req.body[i][j].h,
                width: req.body[i][j].w,
                viewWidth: req.body[i][j].vw,
                viewHeight: req.body[i][j].vh,
                restaurantId: req.params.restaurantId
            };
            if(i==="Table"){
              const table = {
                number: req.body[i][j].id.substring(1),
                status: 0,
                restaurantId: req.params.restaurantId
              };
              tablesList.push(table);
            }
            restaurantMap.push(element);
        }
        
        
    }
     Table.bulkCreate(tablesList)
      .then(data => {
        console.log("Tables created");
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tables."
        });
      });
  
    // Save RestaurantMap in the database
    RestaurantMap.bulkCreate(restaurantMap)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        Table.destroy({where:{restaurantId: req.params.restaurantId}});
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the RestaurantMap."
        });
      });
  }

  exports.update = (req, res) => {
    // Validate request
    // console.log(req.body);
    if (!req.body) {
      res.status(400).send({
        message: "RestaurantMap body can not be empty!"
      });
      return;
    }
    let restaurantMap = [];
    let tablesList = [];
    // Create a RestaurantMap
    for(let i in req.body){
        console.log(i);
        for(let j in req.body[i]){
            const element = {
                elementNumber: req.body[i][j].id.substring(1),
                elementType: i,
                x: req.body[i][j].x,
                y: req.body[i][j].y,
                height: req.body[i][j].h,
                width: req.body[i][j].w,
                viewWidth: req.body[i][j].vw,
                viewHeight: req.body[i][j].vh,
                restaurantId: req.params.restaurantId
            };
            if(i==="Table"){
              const table = {
                number: req.body[i][j].id.substring(1),
                status: 0,
                restaurantId: req.params.restaurantId
              };
              tablesList.push(table);
            }
            restaurantMap.push(element);
        }
    }
     
    RestaurantMap.destroy({where:{restaurantId: req.params.restaurantId}})
        .then(data => {
            Table.destroy({where:{restaurantId: req.params.restaurantId}})
              .then(() => {
                console.log(tablesList);
                Table.bulkCreate(tablesList)
                  .then(data => {
                    console.log("Tables created");
                  })
                  .catch(err => {
                    res.status(500).send({
                      message:
                        err.message || "Some error occurred while updating the Tables."
                    });
                });
              });
            

            // Save RestaurantMap in the database
            RestaurantMap.bulkCreate(restaurantMap)
              .then(data => {
                res.send(data);
              })
              .catch(err => {
                Table.destroy({where:{restaurantId: req.params.restaurantId}});
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the RestaurantMap."
                });
            });
        })
        .catch(err => {
          
            res.status(500).send({
                message:
                err.message || "Some error occurred while deleting the RestaurantMap."
            });
        });
  }

  exports.findAll = (req, res) => {
    const restaurantId = req.params.restaurantId;
    
    const query = `SELECT * FROM restaurantMaps WHERE restaurantId = ${restaurantId} ORDER BY elementType, elementNumber`;
    
    
    sequelize.query(query, { type: QueryTypes.SELECT })
      .then(data => {

        Table.findAll({where: {restaurantId: restaurantId}, order:[['number', 'ASC']]})
          .then(tables => {
            let tableCount = 0;
            let result = [];
            for(let i in data){
              result.push(data[i]);
              if(data[i].elementType == "Table"){
                result[i].tableId = tables[tableCount].id;
                result[i].status = tables[tableCount].status;
                tableCount++;
              }
              else{
                result[i].tableId = null;
                result[i].status = null;
              }
            }
            res.send(result);
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving Tables with restaurantId=" + restaurantId
            });
          });
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving RestaurantMap."
        });
      });
  }

 