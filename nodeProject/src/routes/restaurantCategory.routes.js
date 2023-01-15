module.exports = app => {
    const restaurantCategory = require("../controllers/restaurantCategory.controller");
  
    var router = require("express").Router();
  

    // Retrieve all Food Categories
    router.get("/", restaurantCategory.findAll);
    // Retrieve a single Food Category with id
    router.get("/:id", restaurantCategory.findOne);

    // Create a Food Category
    router.post("/", restaurantCategory.create);

  
    app.use('/restaurantCategories', router);
  };