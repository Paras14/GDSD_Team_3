
module.exports = (sequelize, datatypes) => {
    const RestaurantRegistrationPetition = sequelize.define("restaurantRegistrationPetition", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    status: {
        type: datatypes.STRING,
        defaultValue: "pending"
    },
    message:{
        type: datatypes.STRING
    }
    
});
    return RestaurantRegistrationPetition;
};