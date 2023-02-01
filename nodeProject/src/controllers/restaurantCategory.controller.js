const db = require("../models");
const RestaurantCategory = db.restaurantCategory;
const Op = db.Sequelize.Op;


// Create and Save a new Restaurant Category
exports.create = (req, res) => {
    // Validate request
    console.log(req.query);
    if (!req.query.name) {
      res.status(400).send({
        message: "Food Category name can not be empty!"
      });
      return;
    }
  
    // Create a Restaurant Category
    const restaurantCategory = {
        name: req.query.name
    };
  
    // Save Food Category in the database
    RestaurantCategory.create(restaurantCategory)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Restaurant Category."
        });
      });
  };

// Retrieve all Restaurant Categories from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    
    RestaurantCategory.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving restaurant category."
        });
      });
  };

// // Find a single Restaurant Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  RestaurantCategory.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Restaurant Category with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Restaurant Category with id=" + id
      });
    });
};




