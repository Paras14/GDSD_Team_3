const db = require("../models");
const Rol = db.rol;
const Op = db.Sequelize.Op;

// Create and Save a new Rol
exports.create = (req, res) => {
    // Validate request
    console.log(req.query);
    if (!req.query.name) {
      res.status(400).send({
        message: "Rol name can not be empty!"
      });
      return;
    }
  
    // Create a Rol
    const rol = {
        name: req.query.name
    };
  
    // Save Rol in the database
    Rol.create(rol)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Rol."
        });
      });
  };

// Retrieve all Rols from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Rol.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving rols."
        });
      });
  };

// // Find a single Rol with an id
exports.findOne = (req, res) => {
    const id = req.query.id;
  
    Rol.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Rol with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Rol with id=" + id
        });
      });
  };

// Update a Rol by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;
    
    Rol.update(req.query, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Rol was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Rol with id=${id}. Maybe Rol was not found or req.query is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Rol with id=" + id
        });
      });
  };

// Delete a Rol with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    Rol.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Rol was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Rol with id=${id}. Maybe Rol was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Rol with id=" + id
        });
      });
  };

// Delete all Rols from the database.
exports.deleteAll = (req, res) => {
    Rol.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Rols were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all rols."
        });
      });
  };


  


