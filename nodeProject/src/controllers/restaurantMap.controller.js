const db = require("../models");
const RestaurantMap = db.restaurantMap;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
const sequelize = db.sequelize;

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
                restaurantId: req.body[i][j].restaurantId
            };
            restaurantMap.push(element);
        }
        
        
    }
     
  
    // Save RestaurantMap in the database
    RestaurantMap.bulkCreate(restaurantMap)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the RestaurantMap."
        });
      });
  }

  exports.update = (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body) {
      res.status(400).send({
        message: "RestaurantMap body can not be empty!"
      });
      return;
    }
    let restaurantMap = [];
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
            restaurantMap.push(element);
        }
    }
     
    RestaurantMap.destroy({where:{restaurantId: req.params.restaurantId}})
        .then(data => {
            // Save RestaurantMap in the database
            RestaurantMap.bulkCreate(restaurantMap)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
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
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving RestaurantMap."
        });
      });
  }