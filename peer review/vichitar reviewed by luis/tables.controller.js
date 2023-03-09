const db = require("../models");
const Table = db.table;
const Op = db.Sequelize.Op;

// Create and Save a new Table
exports.create = (req, res) => {
    // Validate request
    if (!req.body.number) { // LUIS: Good practice to validate the number of the table, but could be better if more fields are validated, like the restaurantId
            //Remark: Corrected -  added validation for restaurantId input
      res.status(400).send({
        message: "Table number can not be empty!"
      });
      return;
    }
  
    // Create a Table
    const table = {
        number: req.body.number, // LUIS: Good practice to send the data in the body of the request
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
            err.message || "Some error occurred while creating the Table." // LUIS: Good practice to send a message to the user, but could be better if the message is more specific, like "Some error occurred while creating the Table with number: " + table.number + " and restaurantId: " + table.restaurantId
                // Remark: corrected
        });
      });
  };

// Retrieve all Tables from the database.
exports.findAll = (req, res) => {
    const number = req.body.number;
    var condition = number ? { number: { [Op.eq]: `%${number}%` } } : null; // LUIS: It is better to declare variables using const or let, instead of var
  
    Table.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tables." // LUIS: Good practice to send a message to the user, but could be better if the message is more specific, like "Some error occurred while retrieving tables with condition: " + condition
                //Remark: Corrected
        });
      });
  };

// // Find a single Table with an id
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
}; // LUIS: This function is well done!
// }; // LUIS: This comment line is not necessary, it is better to delete it 
// Remark: corrected

// Update a Table by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Table.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Table was updated successfully." // LUIS: Good practice to send a message to the user, but could be better if the message is more specific, like "Table with id: " + id + " was updated successfully."
        // Remark: corrected
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
}; // LUIS: This function is well done!

// Delete a Table with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Table.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Table was deleted successfully!" // LUIS: Good practice to send a message to the user, but could be better if the message is more specific, like "Table with id: " + id + " was deleted successfully."
        // Remark: corrected
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
}; // LUIS: This function is well done!

// // Delete all Tables from the database. // LUIS: This comment has two double slashes, it is better to have only one double slash
// Remark: corrected
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
}; // LUIS: This function is well done!

// LUIS: This function has no comment to explain what it does, which is not strictly necessary, but it would be good to have it.
// Remark: corrected
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
            err.message || "Some error occurred while retrieving tables." // LUIS: Good practice to send a message to the user, but could be better if the message is more specific, like "Some error occurred while retrieving tables with condition: " + condition + " and restaurantId: " + restaurantId
        // Remark: corrected
        });
      });
}
// LUIS: This function has no comment to explain what it does, which is not strictly necessary, but it would be good to have it.
// Remark: corrected
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
    const out = {}; // LUIS: The name of this variable is not very descriptive, it would be better to use a more descriptive name
    // Remark: rejected as out is standard description for output. But added a comment explaining the need for the variable.
    out.req = req;
    out.res = res;
    return out;
    
}

