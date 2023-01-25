
module.exports = (sequelize, datatypes) => {
    const Table = sequelize.define("table", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    Number: {
    type: datatypes.INTEGER
    }
    });
    return Table;
    
};