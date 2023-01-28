const db = require("../models");
const reviewPetitionDB = db.reviewPetition;
const Op = db.Sequelize.Op;

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