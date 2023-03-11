module.exports = (sequelize, datatypes) => {
    const RestaurantMap = sequelize.define("restaurantMap", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    
    elementNumber:{
        type: datatypes.INTEGER
    },
    elementType:{
        type: datatypes.STRING
    },
    x:{
        type: datatypes.INTEGER
    },
    y:{
        type: datatypes.INTEGER
    },
    height:{
        type: datatypes.INTEGER
    },
    width:{
        type: datatypes.INTEGER
    },
    viewWidth:{
        type: datatypes.INTEGER
    },
    viewHeight:{
        type: datatypes.INTEGER
    }
    });
    return RestaurantMap;
    
};