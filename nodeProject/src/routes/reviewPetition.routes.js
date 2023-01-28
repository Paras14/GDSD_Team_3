const {checkAdmin} = require("../auth/role_validation");

module.exports = app => {
    const reviewPetition = require("../controllers/reviewPetition.controller");

    var router = require("express").Router();

    // Get all petitions
    router.get("/all", checkAdmin, reviewPetition.getAllPetitions);

    // Get pending petitions
    router.get("/pending", checkAdmin, reviewPetition.getPendingPetitions);

    // Update a petition
    router.put("/update", checkAdmin, reviewPetition.update);

    app.use('/admin/petitions/review', router);
};