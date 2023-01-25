const { checkToken } = require("../auth/token_validation");

module.exports = app => {
    const reviews = require("../controllers/reviews.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", checkToken, reviews.create);
  
    // Retrieve all Tutorials
    router.get("/", reviews.findAll);
  // Retrieve a single Tutorial with id
  router.get("/:id", reviews.findOne);

  // Update a Tutorial with id
    router.put("/:id", checkToken, reviews.update);

  // Delete a Tutorial with id
    router.delete("/:id", checkToken, reviews.delete);

  // Delete all Tutorials
    router.delete("/", checkToken, reviews.deleteAll);

    router.get("/restaurant/id/", reviews.findByRestaurant);

    router.get("/user/id/", reviews.findByUser);

  
    app.use('/reviews', router);
  };