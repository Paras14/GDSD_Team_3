module.exports = (sequelize, datatypes) => {
    const Chat = sequelize.define("chat", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    
    text: {
    type: datatypes.STRING
    },
    date: {
    type: datatypes.DATE
    },
    
    });
    //Food.belongsTo(FoodCategory);
    return Chat;
    
};