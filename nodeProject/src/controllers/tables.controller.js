const db = require("../models");
const Table = db.table;
const Op = db.Sequelize.Op;

// Create and Save a new Table
exports.create = (req, res) => {
    // Validate request
    if (!req.body.number || !req.body.restaurantId) {
      res.status(400).send({
        message: "Table number or Restaurant ID can not be empty!"
      });
      return;
    }
  
    // Create a Table
    const table = {
        number: req.body.number,
        status: 0,
        restaurantId: req.body.restaurantId
    };
  
    // Save Table in the database
    Table.create(table)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Table with number: " + table.number + " and Restaurant ID: " + table.restaurantId
        });
      });
  };

// Retrieve all Tables from the database.
exports.findAll = (req, res) => {
    const number = req.body.number;
    var condition = number ? { number: { [Op.eq]: `%${number}%` } } : null;
  
    Table.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving table" + condition?" number: " + number + ".":"s."
        });
      });
  };

// Find a single Table with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Table.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Table with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Table with id=" + id
      });
    });
};

// Update a Table by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Table.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Table was updated successfully with id = " + id
        });
      } else {
        res.send({
          message: `Cannot update Table with id=${id}. Maybe Table was not found or req.query is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating Table with id=" + id
      });
    });
};

// Delete a Table with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Table.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Table with id: " + id + " was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Table with id=${id}. Maybe Table was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Table with id=" + id
      });
    });
};

// Delete all Tables from the database.
exports.deleteAll = (req, res) => {
  Table.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tables were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tables."
      });
    });
};

// Find all tables belonging to a restaurant
exports.findAllInRestaurant =  (req, res) => {
    const restaurantId = req.params.restaurantId;
    const condition = restaurantId ? { restaurantId: { [Op.eq]: restaurantId } } : null;
    
     Table.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tables from restaurant with Id: " + restaurantId
        });
      });
}

//Check if a list of provided tables are all free
exports.checkFree = async (req, res) => {
    const idList = req.body.table;
    for(i in idList){
        Table.findByPk(idList[i].id)
            .then((data) => {
                if(data.status==1)
                    throw err;
            })
            .catch((err) => {
                res.status(500).send({
                    message: err || "Selected tables are not free."
                });
            });
    }
    const out = {}; //will send the request and response input back to be used by the calling function.
    out.req = req;
    out.res = res;
    return out;
    
}

