const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const managerWaiterModel = db.managerWaiter;
const Sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  // console.log(req.query);
  console.log("Username is: " + req.body);
  if (!req.body.username) {
    res.status(400).send({
      message: "User name can not be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    username: req.body.username,
    password: hashSync(req.body.password, genSaltSync(10)),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    description: req.body.description,
    image: req.body.image,
    rolId: req.body.rolId,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const name = req.query.username;
  var condition = name ? { username: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// // Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `User was updated successfully. ${num}`,
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.query is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// // Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// // Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

exports.findUserByEmail = (req, res) => {
  const email = req.query.email;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({
          message: `Cannot find User with email=${email}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
};


exports.findLocalUserByEmail = (req, res, next) => {
  if (!req.query.email) {
    res.status(400).send({
      message: "User email can not be empty!",
    });
  }
  const email = req.query.email;
  
   return User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        return user;;
      } else {
        res.status(500).send({
          message: "Error retrieving User with email=" + email,
        });
      }
    })
    
};


exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email: email } })
    .then((user) => {
      console.log(password);
      const result = compareSync(password, user.password);

      if (result) {
        user.password = undefined;
        const jsonToken = sign({ result: user }, "qwe1234", {
          expiresIn: "1h",
        });
        res.json({
          message: "Login successful",
          token: jsonToken,
          user: user,
        });
      } else {
        res.status(404).send({
          message: `Cannot find User with email=${email} or password is not correct.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
};

exports.getById = async (id) => {
  
  Review.findByPk(id)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw err;
    });
};

// Create a mapping table between manager and the waiter
exports.mapManagerAndWaiter = async (req, res) => {
  const {
    waiterId, managerId
  } = req.body
  
  const resp = await managerWaiterModel.create({
    managerId,
    waiterId
  })
    .catch(err => {
      throw err;
    });

    return res.status(200).json(resp)
};

exports.getByManagerIdByWaiterId = async (req, res) => {
  
  const resp = await managerWaiterModel.findOne({where: {waiterId: req.params.id}})
    .catch(err => {
      throw err;
    });

  if(resp){
    return res.status(200).json(resp)
  }
};

exports.registerWaiter = (req, res) => {
    const waiter = req.body.waiter;
    waiter.password = hashSync(waiter.password, genSaltSync(10));
    waiter.rolId = 10;
    const managerId = req.body.managerId;

    User.create(waiter)
      .then((data) => {
        const waiter = data;
        const query = "Insert into managerWaiters(managerId, waiterId, createdAt, updatedAt) values(" + managerId + ", " + data.id + 
        ", '" + new Date(data.createdAt).toISOString().replace("T", " ").split(".")[0] + "', '" + new Date(data.updatedAt).toISOString().replace("T", " ").split(".")[0] + "')";
        Sequelize.query(query, { type: QueryTypes.INSERT })
          .then((data) => {
              res.send({managerId, waiter});  
          })
          .catch((error) => {
              res.send({
                  message: error.message || "Could not create manager-waiter reference"
              })
         
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Waiter.",
        });
      });
    
     
};