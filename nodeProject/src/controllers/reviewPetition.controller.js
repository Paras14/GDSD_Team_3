const db = require("../models");
const reviewPetitionDB = db.reviewPetition;
const Op = db.Sequelize.Op;
const Sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.getPendingPetitions = (req, res) => {
    reviewPetitionDB.findAll({where: {status: "pending"}})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving pending petitions"
        });
    });
}

exports.getAllPetitions = (req, res) => {
    reviewPetitionDB.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving all petitions"
        });
    });
}

// Get petition of a review
exports.getPetition = (req, res) => {
    const id = req.params.id;
    reviewPetitionDB.findAll({where: {reviewId: id}})
    .then(data => {
        res.send(data); 
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving petition with id=" + id
        });
    });
}


exports.update = (req, res) => {
    const id = req.body.id;
    reviewPetitionDB.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Petition was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Petition with id=${id}. Maybe Petition was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Petition with id=" + id
        });
    });
}

exports.create = (idReview) => {
    reviewPetitionDB.create({
        reviewId: idReview,
        status: "pending",
        message: ""
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getDetailedPendingPetitions = (req, res) => {
    const query = "SELECT rp.id as reviewPetitionID," + 
    "rp.status as reviewPetitionStatus," + 
    "rp.message as reviewPetitionMessage," + 
    "rp.createdAt as reviewPetitionCreatedAt," + 
    "rp.updatedAt as reviewPetitionUpdatedAt," + 
    "rp.reviewId as reviewPetitionReviewId, " + 
    "rv.id as reviewId," + 
   "rv.rating as reviewRating," + 
    "rv.quickService as reviewQuickService," + 
    "rv.deliciousFood as reviewDeliciousFood," + 
    "rv.PoliteBehavior as reviewPopiteVehaviour," + 
    "rv.valueForMoney as reviewValueForMoney," + 
    "rv.comment as reviewComment," + 
    "rv.createdAt as reviewCreatedAt," + 
    "rv.updatedAt as reviewUpdatedAt," + 
    "rv.userId as reviewUserId," + 
    "rv.restaurantId as reviewRestaurantId," + 
    "us.id as userId," + 
    "us.username as userUsername," + 
    "us.password as userPassword," + 
    "us.firstname as userFirstname," + 
    "us.lastname as userLastname," + 
    "us.email as userEmail," + 
    "us.city as userCity," + 
    "us.state as userState," + 
    "us.zip as userZip," + 
    "us.description as userDescription, " + 
    "us.image as userImage, " + 
    "  us.createdAt as userCreatedAt, " + 
    " us.updatedAt as userUpdatedAt, " + 
    "us.rolId as userRolId " + 
    "FROM reviewPetitions rp " + 
   "inner join reviews rv on rp.reviewId = rv.id " + 
   "inner join users us on rv.userId = us.id " + 
   "where rp.status = \"pending\"";
    console.log("Reached Here");
   Sequelize.query(query, { type: QueryTypes.SELECT })
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch((error) => {
            res.send({
                message: error.message || "Could not fetch records"
            })
        });
}