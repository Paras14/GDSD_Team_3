const {checkAdmin} = require("../auth/role_validation");

module.exports = app => {
    const reviewPetition = require("../controllers/reviewPetition.controller");

    var router = require("express").Router();

    // Get all petitions
    router.get("/all", checkAdmin, reviewPetition.getAllPetitions);

    // Get petition of a review
    router.get("/:id", reviewPetition.getPetition);

    // Get pending petitions
    router.get("/pending", checkAdmin, reviewPetition.getPendingPetitions);

    // Update a petition
    router.put("/update", checkAdmin, reviewPetition.update);

    router.get("/detailedPending/a", checkAdmin, reviewPetition.getDetailedPendingPetitions);

    app.use('/admin/petitions/review', router);
};