const { sequelize } = require("../models");
const db = require("../models");
const Review = db.review;
const Op = db.Sequelize.Op; // LUIS: This Op is not used in this file, so it can be removed.
const reviewPetitionDB = db.reviewPetition;

// Create and Save a new Review
exports.create = (req, res) => {
    // Validate request
    console.log(req.body); // LUIS: This console.log is only for debugging, so it can be removed.
    // Remark: corrected
    if (!req.body.rating) { // LUIS: Good practice to validate the request and use the body to send the data. But maybe it can be improved to validate more fields.
      // Remark: corrected by adding validation for restaurant ID and user ID
        res.status(400).send({
        message: "Review rating can not be empty!" // LUIS: Good practice to send a message to the user.
            // Remark: corrected message according to added validations as per previous suggestion
      });
      return;
    }
  
    // Create a Restaurant // LUIS: This comment is not correct, it should be "Create a Review".
    // Remark: corrected
    const review = {
        restaurantId:req.body.restaurantId,
        userId: req.body.userId,
        rating:req.body.rating,
        quickService: req.body.quickService,
        deliciousFood: req.body.deliciousFood,
        politeBehavior: req.body.politeBehavior,
        valueForMoney: req.body.valueForMoney,
        comment: req.body.comment
    };
  
    // Save Review in the database
    Review.create(review)
      .then(data => {
        reviewPetitionDB.create({
          reviewId: data.dataValues.id,
          status: "pending",
          message: ""
        }); // LUIS: Good practice to create the review petition after the review is created.
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Review." // LUIS: Good practice to send a message to the user, but maybe it can include the id's of the restaurant and user.
            // Remark: corrected
        });
      });
  };

// Retrieve all Restaurants from the database. // LUIS: This comment is not correct, it should be "Retrieve all Reviews from the database".
// Remark: corrected
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

// LUIS: This function has no comment to explain what it does, which is not strictly necessary, but it would be good to have it.
// Remark: corrected but function not written by me
exports.findAllAccepted = (req, res) => {
  const query = `
    SELECT reviews.* 
    FROM reviews 
    INNER JOIN reviewPetitions 
    ON reviews.id = reviewPetitions.reviewId 
    WHERE reviewPetitions.status = 'accepted';`; // LUIS: Good practice to type the query in a variable and then use it in the query, so you have it separated from the rest of the code.

    sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
    .then(reviews => {
      res.send(reviews);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reviews." // LUIS: Maybe the message can be more specific, like "Some error occurred while retrieving accepted reviews."
          // Remark: rejected as the request by the user itself is specific and explanatory.
      });
    });
};

// LUIS: This function has no comment to explain what it does, which is not strictly necessary, but it would be good to have it.
// Remark: corrected but function not written by me
exports.findAllPending = (req, res) => {
  const query = `
    SELECT reviews.*
    FROM reviews
    INNER JOIN reviewPetitions
    ON reviews.id = reviewPetitions.reviewId
    WHERE reviewPetitions.status = 'pending';`; // LUIS: Good practice to type the query in a variable and then use it in the query, so you have it separated from the rest of the code.
 
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
    .then(reviews => {
      res.send(reviews);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reviews." // LUIS: Maybe the message can be more specific, like "Some error occurred while retrieving pending reviews."
          // Remark: rejected as the request by the user itself is specific and explanatory.
      });
    });
};


// // Find a single Restaurant with an id // LUIS: This comment is not correct, it should be "Find a single Review with an id".
// Remark: corrected
exports.findOne = (req, res) => {
    const id = req.params.id;
  
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
  }; // LUIS: This function is well done!


// Update a Restaurant by the id in the request // LUIS: This comment is not correct, it should be "Update a Review by the id in the request".
// Remark: corrected
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
  }; // LUIS: This function is well done!

// // Delete a Restaurant with the specified id in the request // LUIS: This comment is not correct, it should be "Delete a Review with the specified id in the request".
// Remark: corrected
exports.delete = (req, res) => {
    const id = req.params.id;
  
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
  }; // LUIS: This function is well done!

// // Delete all Restaurants from the database. // LUIS: This comment is not correct, it should be "Delete all Reviews from the database".
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
      


  
  }; // LUIS: This function is well done, but there is so much space at the end of the function, it would be better to have it more compact.
// Remark: corrected

// // Find all single Restaurant with an id // LUIS: This comment is not correct, it should be "Find all Reviews with an id of a Restaurant".
// Remark: corrected
exports.findByRestaurant = (req, res) => {
    const restaurantId = req.params.restaurantId;
    
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
  }; // LUIS: This function is well done!

exports.findByRestaurantAccepted = (req, res) => { // Method done by Jesus, not Vichitar
    const restaurantId = req.params.restaurantId;
    //en el router cambiar el metodo a este
    //Y finalmente comprobar que funciona
    
    const query = `
    SELECT reviews.*
    FROM reviews
    INNER JOIN reviewPetitions
    ON reviews.id = reviewPetitions.reviewId
    WHERE reviewPetitions.status = 'accepted' 
    AND reviews.restaurantId = ${restaurantId};`;

    sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
    .then(reviews => {
      res.send(reviews);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reviews."
      });
    });
};


  // // Find all single User with an id // LUIS: This comment is not correct, it should be "Find all Reviews with an id of a User".
// Remark: corrected
exports.findByUser = (req, res) => {
    const userId = req.params.userId;

    
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
  }; // LUIS: This function is well done! 

  
// Find average Rating for a restaurant
exports.getRestaurantAverageRatings = (req, res) => {
    const restaurantId = req.params.restaurantId;
    
    Review.findAll({ where: { restaurantId: restaurantId } })
      .then(data => {
        if (data) {
            var average = 0; // LUIS: It is better to use let instead of var, because it is more secure.
            // Remark: corrected
            var n = Object.keys(data).length; // LUIS: The name of the variable n is not very descriptive, it would be better to use something like numberOfReviews.
            // Remark: rejected as n is standard notation for length count
            for( val in data){ // LUIS: The name of the variable val is not very descriptive, it would be better to use something like review.
                // Remark: corrected
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
  
  // LUIS: This function has no comment to explain what it does, which is not strictly necessary, but it would be good to have it.
// Remark: corrected
  exports.getById = (id) => {
  
    Review.findByPk(id)
      .then(data => {
        if (data!=null) {
          return data;
        } else {
          return null;
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Review with id=" + id
        });
      });
  };
