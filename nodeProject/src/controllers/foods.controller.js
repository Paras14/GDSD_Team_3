const db = require("../models");
const Food = db.foods;
const Op = db.Sequelize.Op;

// Create and Save a new Food
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body.name) {
      res.status(400).send({
        message: "Food name can not be empty!"
      });
      return;
    }
  
    // Create a Food
    const food = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        price: req.body.price,
        image: req.body.image,
        foodCategoryId: req.body.foodCategoryId,
        restaurantId: req.body.restaurantId
    };
  
    // Save Food in the database
    Food.create(food)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Food."
        });
      });
  };

// Retrieve all Foods from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Food.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving foods."
        });
      });
  };

// // Find a single Food with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Food.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Food with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Food with id=" + id
      });
    });
};
// };

// Update a Food by the id in the request
exports.update = (req, res) => {
  const id = req.query.id;
  
  Food.update(req.query, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Food was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Food with id=${id}. Maybe Food was not found or req.query is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Food with id=" + id
      });
    });
};

// // Delete a Food with the specified id in the request
exports.delete = (req, res) => {
  const id = req.query.id;

  Food.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Food was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Food with id=${id}. Maybe Food was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Food with id=" + id
      });
    });
};

// // Delete all Foods from the database.
exports.deleteAll = (req, res) => {
  Food.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Foods were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all foods."
      });
    });
};


exports.findAllInRestaurant = (req, res) => {
    const restaurantId = req.params.restaurantId;
    const condition = restaurantId ? { restaurantId: { [Op.eq]: restaurantId } } : null;
    
    Food.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving foods."
        });
      });
}