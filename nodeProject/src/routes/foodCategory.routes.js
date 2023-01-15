module.exports = app => {
    const foodCategories = require("../controllers/foodCategory.controller");
  
    var router = require("express").Router();
  

    // Retrieve all Food Categories
    router.get("/", foodCategories.findAll);
    // Retrieve a single Food Category with id
    router.get("/:id", foodCategories.findOne);

    // Create a Food Category
    router.post("/", foodCategories.create);

  
    app.use('/foodCategories', router);
  };