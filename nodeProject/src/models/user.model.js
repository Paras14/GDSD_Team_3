module.exports = (sequelize, datatypes) => {
    const User = sequelize.define("user", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    username: {
    type: datatypes.STRING,
    unique: true
    },
    password: {
    type: datatypes.STRING
    },
    firstname: {
    type: datatypes.STRING
    },
    lastname: {
    type: datatypes.STRING
    },
    email: {
    type: datatypes.STRING,
    unique: true
    },
    city: {
    type: datatypes.STRING
    },
    state: {
    type: datatypes.STRING
    },
    zip: {
    type: datatypes.STRING
    },
    description: {
    type: datatypes.STRING
    },
    image: {
    type: datatypes.STRING
    }
    });
    return User;
    
};