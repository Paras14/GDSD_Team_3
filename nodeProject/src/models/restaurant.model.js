const FoodCategory = require('./foodCategory.model');
module.exports = (sequelize, datatypes) => {
    const Restaurant = sequelize.define("restaurant", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    name: {
    type: datatypes.STRING
    },
    address: {
    type: datatypes.STRING
    },
    description: {
    type: datatypes.STRING
    },
    image: {
    type: datatypes.STRING
    }
    });
    //Food.belongsTo(FoodCategory);
    return Restaurant;
    
};
//12312,12321
/*restaurantLatitute
restaurantLongitude
restaurantAddress

category
description
photo */