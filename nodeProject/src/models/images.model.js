

module.express = (sequelize, Sequelize) => {
    const Images = sequelize.define("images", {
    imageId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    foodId: {
    type: Sequelize.INTEGER
    },
    restaurantId: {
    type: Sequelize.INTEGER
    },
    imagePath: {
        type: Sequelize.STRING
    }
    });
    return Images;
    };