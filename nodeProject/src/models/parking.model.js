
module.exports = (sequelize, datatypes) => {
    const Parking = sequelize.define("parking", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    number: {
    type: datatypes.INTEGER
    },
    status: {
        type: datatypes.BOOLEAN
    }
    });
    return Parking;
    
};