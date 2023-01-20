module.exports = (sequelize, datatypes) => {
    
const Reservation = sequelize.define("reservation", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    date: {
    type: datatypes.DATE
    },
    numberofplaces: {
    type: datatypes.INTEGER
    }
    });
    return Reservation;
}