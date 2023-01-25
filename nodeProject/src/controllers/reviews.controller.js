const db = require("../models");
const Review = db.review;
const Op = db.Sequelize.Op;

// Create and Save a new Review
exports.create = (req, res) => {
    // Validate request
    console.log(req.query);
    if (!req.query.rating) {
      res.status(400).send({
        message: "Review rating can not be empty!"
      });
      return;
    }
  
    // Create a Restaurant
    const review = {
        restaurantId:req.query.restaurantId,
        userId: req.query.userId,
        rating:req. query.rating,
        quickService: req.query.quickService,
        deliciousFood: req.query.deliciousFood,
        politeBehavior: req.query.politeBehavior,
        valueForMoney: req.query.valueForMoney,
        comment: req.query.comment
    };
  
    // Save Review in the database
    Review.create(review)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Review."
        });
      });
  };

// Retrieve all Restaurants from the database.
exports.findAll = (req, res) => {
  
    Review.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving reviews."
        });
      });
  };

// // Find a single Restaurant with an id
exports.findOne = (req, res) => {
    const id = req.query.id;
  
    Review.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Review with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Review with id=" + id
        });
      });
  };


// Update a Restaurant by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;
    
    Review.update(req.query, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Review was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Review with id=${id}. Maybe Review was not found or req.query is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Review with id=" + id
        });
      });
  };

// // Delete a Restaurant with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    Review.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Review was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Review with id=${id}. Maybe Review was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Review with id=" + id
        });
      });
  };

// // Delete all Restaurants from the database.
exports.deleteAll = (req, res) => {
    Review.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Reviews were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all reviews."
        });
      });
      


  
  };

// // Find all single Restaurant with an id
exports.findByRestaurant = (req, res) => {
    const restaurantId = req.query.restaurantId;
    
    Review.findAll({ where: { restaurantId: restaurantId } })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Review with restaurant Id=${restaurantId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Review with restaurant Id=" + restaurantId
        });
      });
  };

  // // Find all single User with an id
exports.findByUser = (req, res) => {
    const userId = req.query.userId;

    
    Review.findAll({ where: { userId: userId } })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Review with User Id=${userId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Review with User Id=" + userId
        });
      });
  };      

  
// Find average Rating for a restaurant
exports.getRestaurantAverageRatings = (req, res) => {
    const restaurantId = req.query.restaurantId;
    
    Review.findAll({ where: { restaurantId: restaurantId } })
      .then(data => {
        if (data) {
            var average = 0;
            var n = Object.keys(data).length;
            for( val in data){
                average += parseFloat(data[val].rating);
            }
            average /= n;
            res.status(200).send({
                average: average
              });
        } else {
          res.status(404).send({
            message: `Cannot find Review with restaurant Id=${restaurantId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Review with restaurant Id=" + restaurantId
        });
      });
  };
  


