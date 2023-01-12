module.exports = (sequelize, datatypes) => {
    const FoodCategory = sequelize.define("foodCategory", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    name: {
    type: datatypes.STRING
    }
    });
    return FoodCategory;
    
};