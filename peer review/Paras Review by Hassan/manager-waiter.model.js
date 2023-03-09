module.exports = (sequelize, datatypes) => {//Hassan; This code is fine
    const ManagerWaiter = sequelize.define("managerWaiter", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    managerId: {
    type: datatypes.INTEGER
    },
    waiterId: {
        type: datatypes.INTEGER
    }
    });
    return ManagerWaiter;
    
};