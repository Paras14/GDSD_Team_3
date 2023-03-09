const { checkToken } = require("../auth/token_validation");
const { checkAdmin } = require("../auth/role_validation");

module.exports = app => {
    const chats = require("../controllers/chats.controller");
  
    var router = require("express").Router();
  
    // Create a new Chat
    router.post("/", checkToken, chats.create);

    // Retrieve all conversations from a user
    router.get("/user/:userid", chats.findAllConversationsFromUser);

    // Retrieve all messages from a conversation
    router.get("/conversation/", chats.findAllByConversation);
  
    // Retrieve all Chats
    //router.get("/", chats.findAll);
    
    // Retrieve a single Chat with id
    router.get("/:id", chats.findOne);

    // Update a Chat with id
    router.put("/:id", checkToken, chats.update);

    // Delete a Chat with id
    router.delete("/:id", checkToken, chats.delete);

    // Delete all Chats
    router.delete("/", checkAdmin, chats.deleteAll);

  
    app.use('/chats', router);
  };