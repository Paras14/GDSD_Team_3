
module.exports = (sequelize, datatypes) => {
    const Food = sequelize.define("food", {
    foodId: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    name: {
    type: datatypes.STRING
    },
    ingredients: {
    type: datatypes.STRING
    },
    foodCategory: {
        type: datatypes.INTEGER
    }
    });
    return Food;
    
};

