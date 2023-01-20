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
db.user = require("./user.model")(sequelize, Sequelize);
db.rol = require("./rol.model")(sequelize, Sequelize);
db.chat = require("./chat.model")(sequelize, Sequelize);
db.reservations = require("./reservation.model")(sequelize, Sequelize);

db.foods.belongsTo(db.foodCategory);
db.foods.belongsTo(db.restaurant);
db.restaurant.belongsToMany(db.foodCategory, {through:'foodCategoryRestaurant'});
db.restaurant.belongsTo(db.restaurantCategory);
db.user.hasOne(db.restaurant);
db.user.belongsTo(db.rol);
db.chat.belongsTo(db.user, {foreignKey: 'user_emitter'});
db.chat.belongsTo(db.user, {foreignKey: 'user_receiver'});

db.reservations.belongsTo(db.user);
db.reservations.belongsTo(db.restaurant);

module.exports = db;

