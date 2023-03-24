const {sequelize} = require("../models");
const db = require("../models");
const orderReservationDB = db.orderReservation;


//Waiters can check the food order list.
exports.getFoodOrders = async (req, res) => {
    const id = req.params.id;

    //With this query we will get the orderReservations and the table they are related to (null if there is no table).
    //we use joins to relate the tables managerWaiters, restaurants, reservations, orderReservations and reservationTable and then we get the parameters we need.
    var query = `
        SELECT orderReservations.id as reservationId, orderReservations.quantity, orderReservations.foodId, reservationTable.tableId
        FROM managerWaiters
        INNER JOIN restaurants ON managerWaiters.managerId = restaurants.userId
        INNER JOIN reservations ON restaurants.id = reservations.restaurantId
        INNER JOIN orderReservations ON reservations.id = orderReservations.reservationId
        LEFT JOIN reservationTable ON reservations.id = reservationTable.reservationId
        WHERE managerWaiters.id = ${id};
    `;

    await sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
    .then(data => {
        if(data){
            res.send(data);
        }else {
            res.status(404).send({
                message: `Cannot get orderReservations with restaurantId=${restaurantId}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving orderReservations with restaurantId = " + restaurantId + ". err: " + err
        });
    });
};


//Waiters can mark orders as served.
exports.markAsServed = async (req, res) => {
    const id = req.body.id;
    orderReservationDB.update({status: "done"}, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Order was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Order with id=" + id
        });
    });

};
