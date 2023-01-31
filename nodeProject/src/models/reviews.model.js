module.exports = (sequelize, datatypes) => {
    const Review = sequelize.define("review", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    rating: {
        type: datatypes.FLOAT,
    },
    quickService: {
        type: datatypes.BOOLEAN,
        defaultValue: false,
    },
    deliciousFood: {
        type: datatypes.BOOLEAN,
        defaultValue: false,
    },
    politeBehavior: {
        type: datatypes.BOOLEAN,
        defaultValue: false,
    },
    valueForMoney: {
        type: datatypes.BOOLEAN,
        defaultValue: false,
    },
    comment: {
        type: datatypes.STRING(1000)
    }
    });
    return Review;
    
};
