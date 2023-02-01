const { checkAdmin } = require("../auth/role_validation");
const { checkToken } = require("../auth/token_validation");

module.exports = app => {
  const reviews = require("../controllers/reviews.controller");
  
  var router = require("express").Router();
  
  // Create a new Reviews
  router.post("/", checkToken, reviews.create);
  
  // Retrieve all accepted Reviews
  router.get("/", reviews.findAllAccepted);
  // Retrieve all pending Reviews
  router.get("/pending", checkAdmin, reviews.findAllPending);

  // Retrieve a single Reviews with id
  router.get("/one/:id", reviews.findOne);

  // Update a Reviews with id
  router.put("/:id", checkToken, reviews.update);

  // Delete a Reviews with id
  router.delete("/:id", checkToken, reviews.delete);

  // Delete all Reviews
  router.delete("/", checkToken, reviews.deleteAll);

  router.get("/restaurant/:restaurantId", reviews.findByRestaurantAccepted);

  router.get("/restaurant/averageRating/:restaurantId", reviews.getRestaurantAverageRatings);

  router.get("/user/:userId", reviews.findByUser);


  
    app.use('/reviews', router);
  };