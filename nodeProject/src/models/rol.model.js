module.exports = (sequelize, datatypes) => {
    const Rol = sequelize.define("rol", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    name: {
    type: datatypes.STRING
    }
    
    });
    //Food.belongsTo(FoodCategory);
    return Rol;
    
};