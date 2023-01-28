const db = require("../models");
const Parking = db.parking;
const Op = db.Sequelize.Op;

// Create and Save a new Parking
exports.create = (req, res) => {
    // Validate request
    console.log(req.query);
    if (!req.query.name) {
      res.status(400).send({
        message: "Parking name can not be empty!"
      });
      return;
    }
  
    // Create a Parking
    const parking = {
        number: req.query.number
    };
  
    // Save Parking in the database
    Parking.create(parking)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Parking."
        });
      });
  };

// Retrieve all Parkings from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Parking.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving parkings."
        });
      });
  };

// // Find a single Parking with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Parking.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Parking with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Parking with id=" + id
      });
    });
};
// };

// Update a Parking by the id in the request
exports.update = (req, res) => {
  const id = req.query.id;
  
  Parking.update(req.query, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Parking was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Parking with id=${id}. Maybe Parking was not found or req.query is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Parking with id=" + id
      });
    });
};

// // Delete a Parking with the specified id in the request
exports.delete = (req, res) => {
  const id = req.query.id;

  Parking.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Parking was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Parking with id=${id}. Maybe Parking was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Parking with id=" + id
      });
    });
};

// // Delete all Parkings from the database.
exports.deleteAll = (req, res) => {
  Parking.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Parkings were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all parkings."
      });
    });
};


exports.findAllInRestaurant = (req, res) => {
    const restaurantId = req.params.restaurantId;
    const condition = restaurantId ? { restaurantId: { [Op.eq]: restaurantId } } : null;
    
    Parking.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving parkings."
        });
      });
}

exports.checkFree = async (req, res) => {
    const idList = req.body.parking;
    for(i in idList){
        Parking.findByPk(idList[i].id)
            .then((data) => {
                if(data.status==1)
                    throw err;
            })
            .catch((err) => {
                res.status(500).send({
                    message: err || "Selected parkings are not free."
                });
            });
    }
    const out = {};
    out.req = req;
    out.res = res;
    return out;
}