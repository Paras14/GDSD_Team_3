const db = require("../models");
const FoodCategory = db.foodCategory;
const Op = db.Sequelize.Op;


// Create and Save a new Food Category
exports.create = (req, res) => {
    // Validate request
    console.log(req.query);
    if (!req.query.name) {
      res.status(400).send({
        message: "Food Category name can not be empty!"
      });
      return;
    }
  
    // Create a Food Category
    const foodCategory = {
        name: req.query.name
    };
   
    // Save Food Category in the database
    FoodCategory.create(foodCategory)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Food Category."
        });
      });
  };

// Retrieve all Food Categories from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;//Paras: Use constants instead of vars if the variable is not reassigned
    
    FoodCategory.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving food categories."
        });
      });
  };

// // Find a single Food Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  FoodCategory.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Food Category with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Food Category with id=" + id//Paras: Use template literals instead of concatenation, as done on line 62
      });
    });
};




