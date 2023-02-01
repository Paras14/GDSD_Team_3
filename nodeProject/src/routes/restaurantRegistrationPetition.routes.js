const { checkAdmin } = require("../auth/role_validation");

module.exports = app => {

    const restaurantResgistrationPetition = require("../controllers/restaurantRegistrationPetition.controller");

    var router = require("express").Router();

    // Get all petitions
    router.get("/all", checkAdmin, restaurantResgistrationPetition.getAllPetitions);

    // Get petition of a restaurant
    router.get("/:id", restaurantResgistrationPetition.getPetition);

    // Get pending petitions
    router.get("/pending", checkAdmin, restaurantResgistrationPetition.getPendingPetitions);

    // Update a petition
    router.put("/update", checkAdmin, restaurantResgistrationPetition.update);

    app.use('/admin/petitions/restaurant', router);
};