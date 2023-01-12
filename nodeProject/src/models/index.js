const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.foodCategory = require("./foodCategory.model")(sequelize, Sequelize);
db.foods = require("./food.model")(sequelize, Sequelize);
db.restaurant = require("./restaurant.model")(sequelize, Sequelize);
db.restaurantCategory = require("./restaurantCategory.model")(sequelize, Sequelize);

db.foods.belongsTo(db.foodCategory);
db.foods.belongsTo(db.restaurant);
db.restaurant.belongsToMany(db.foodCategory, {through:'foodCategoryRestaurant'});
db.restaurant.belongsTo(db.restaurantCategory);

module.exports = db;

