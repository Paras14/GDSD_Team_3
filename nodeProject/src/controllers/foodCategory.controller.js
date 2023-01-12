const db = require("../models");
const FoodCategory = db.foodCategory;
const Op = db.Sequelize.Op;


// Retrieve all Food Categories from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    
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
        message: "Error retrieving Food Category with id=" + id
      });
    });
};




