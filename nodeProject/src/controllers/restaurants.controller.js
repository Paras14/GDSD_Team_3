const db = require("../models");
const Restaurant = db.restaurant;
const Op = db.Sequelize.Op;

// Create and Save a new Restaurant
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body.name) {
      res.status(400).send({
        message: "Restaurant name can not be empty!"
      });
      return;
    }
  
    // Create a Restaurant
    const restaurant = {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        image: req.body.image,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        telephone: req.body.telephone,
        restaurantCategoryId: req.body.restaurantCategoryId,
        userId: req.body.userId
    };

    console.log(restaurant);
  
    // Save Restaurant in the database
    Restaurant.create(restaurant)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Restaurant."
        });
      });
  };

// Retrieve all Restaurants from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Restaurant.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving restaurants."
        });
      });
  };

// // Find a single Restaurant with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Restaurant.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Restaurant with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Restaurant with id=" + id
        });
      });
  };

// Update a Restaurant by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;
    
    Restaurant.update(req.query, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Restaurant was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found or req.query is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Restaurant with id=" + id
        });
      });
  };

// // Delete a Restaurant with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    Restaurant.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Restaurant was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Restaurant with id=${id}. Maybe Restaurant was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Restaurant with id=" + id
        });
      });
  };

// // Delete all Restaurants from the database.
exports.deleteAll = (req, res) => {
    Restaurant.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Restaurants were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all restaurants."
        });
      });
  };


  


