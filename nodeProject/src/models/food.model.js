
module.exports = (sequelize, datatypes) => {
    const Food = sequelize.define("food", {
    id: {
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
    price: {
    type: datatypes.NUMBER
    },
    image: {
    type: datatypes.STRING
    }
    });
    return Food;
    
};

