const db = require("../models");
const restaurantRegistrationPetition = db.restaurantRegistrationPetition;
const Op = db.Sequelize.Op;

exports.getPendingPetitions = (req, res) => {
    restaurantRegistrationPetition.findAll({where: {status: "pending"}})
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
    restaurantRegistrationPetition.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving all petitions"
        });
    });
}

// Get petition of a restaurant by id
exports.getPetition = (req, res) => {
    const id = req.params.id;

    restaurantRegistrationPetition.findAll({where: {restaurantId: id}})
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
    restaurantRegistrationPetition.update(req.body, {
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

    exports.create = (idRestaurant) => {
        restaurantRegistrationPetition.create({
            restaurantId: idRestaurant,
            status: "pending",
            message: ""
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log("Error creating the restaurant petiton");
        });
    }

}