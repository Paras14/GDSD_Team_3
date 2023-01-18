module.exports = (sequelize, datatypes) => {
    const Chat = sequelize.define("chat", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    
    text: {
    type: datatypes.STRING
    }
    
    });
    //Food.belongsTo(FoodCategory);
    return Chat;
    
};