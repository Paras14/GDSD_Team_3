const db = require("../models");
const Chat = db.chat;
const Op = db.Sequelize.Op;

// Create and Save a new Chat (message of a conversation)
exports.create = (req, res) => {
    // Validate request
    if (!req.body.user_emitter || !req.body.user_receiver) {
      res.status(400).send({
        message: "Chat must have sender and receiver id"
      });
      return;
    }
  
    // Create a chat
    const chat = {
        user_emitter: req.body.user_emitter,
        user_receiver: req.body.user_receiver,
        text: req.body.text
    };
  
    // Save Chat in the database
    Chat.create(chat)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Chat."
        });
      });
  };

// Retrieve all users which have a chat with the user with the id: userid
exports.findAllConversationsFromUser = (req, res) => {
    const userid = req.params.userid;

    db.sequelize.query("SELECT * FROM users u WHERE u.id IN (SELECT DISTINCT user_receiver FROM chats WHERE user_emitter = :user UNION SELECT DISTINCT user_emitter FROM chats WHERE user_receiver = :user)", {
        replacements: { user: userid },
        type: db.sequelize.QueryTypes.SELECT,
      })
        .then(users => {
          res.send(users);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving users."
            });
        });

    };

// Retrieve all Chats between 2 users from the database.
exports.findAllByConversation = (req, res) => {
    const userid1 = req.query.userid1;
    const userid2 = req.query.userid2;

    Chat.findAll({
        where: {
            [Op.or]: [
                { user_emitter: userid1, user_receiver: userid2 },
                { user_emitter: userid2, user_receiver: userid1 }
            ]
        }
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving chats."
        });
    });
      
  };

// Find a single Chat with an id
exports.findOne = (req, res) => {
    const id = req.query.id;
  
    Chat.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Chat with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Chat with id=" + id
        });
      });
  };

// Update a Chat by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;
    
    Chat.update(req.query, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Chat was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Chat with id=${id}. Maybe Chat was not found or req.query is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Chat with id=" + id
        });
      });
  };

// Delete a Chat with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    Chat.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Chat was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Chat with id=${id}. Maybe Chat was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Chat with id=" + id
        });
      });
  };

// Delete all Chats from the database.
exports.deleteAll = (req, res) => {
    Chat.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Chats were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all chats."
        });
      });
  };

