const { checkAdmin, checkManager } = require("../auth/role_validation");
const { checkToken } = require("../auth/token_validation");

module.exports = app => {
    const users = require("../controllers/users.controller");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve all Tutorials
    router.get("/",checkAdmin, users.findAll);
  // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);

  // Update a Tutorial with id
    router.put("/:id", users.update);

  // Delete a Tutorial with id
    router.delete("/:id", users.delete);

  // Delete all Tutorials
    router.delete("/", users.deleteAll);

    // Find user by email
    router.get("/email/find", users.findUserByEmail);

    // Login
    router.post("/login", users.login);

  // Connect manager with waiter 
    router.post("/map-mw", users.mapManagerAndWaiter);

    router.post("/registerWaiter", checkManager, users.registerWaiter);

    router.get("/map-mw/:id", users.getByManagerIdByWaiterId);
    
    app.use('/users', router);
    
  };