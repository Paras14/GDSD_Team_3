module.exports = (sequelize, datatypes) => {
    
    const OrderReservation = sequelize.define("orderReservation", {
        id: {
        type: datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
        quantity: {
        type: datatypes.INTEGER
        },
        status:{
        type: datatypes.STRING
        }
        });
        return OrderReservation;
    }