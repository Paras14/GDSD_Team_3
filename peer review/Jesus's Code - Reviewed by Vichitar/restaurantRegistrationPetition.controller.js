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
    /* SUGGESTION:
              The else part could be better handled by throwing an error to the catch block instead of directly sending an error message
        ANSWER: REJECTED. This code is in try{}catch{} block in case the DB does not work. If the DB works, other errors can be handled in another way.

    */
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
    /* SUGGESTION:
                After creating, the response should be sent to client instead of logging in the console
        ANSWER: I agree. I forgot.
    */
            console.log(data);
        })
        .catch(err => {
            console.log("Error creating the restaurant petiton");
        });
    }

}