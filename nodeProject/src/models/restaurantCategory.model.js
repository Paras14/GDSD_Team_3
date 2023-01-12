module.exports = (sequelize, datatypes) => {
    const RestaurantCategory = sequelize.define("restaurantCategory", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    name: {
    type: datatypes.STRING
    }
    });
    return RestaurantCategory;
    
};