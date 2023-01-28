module.exports = (sequelize, datatypes) => {
    const ReviewPetition = sequelize.define("reviewPetition", {
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
    return ReviewPetition;
};