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
db.reservation = require("./reservation.model")(sequelize, Sequelize);
db.review = require("./reviews.model")(sequelize, Sequelize);
db.orderReservation = require('./orderReservation.model')(sequelize, Sequelize);
db.table = require('./table.model')(sequelize, Sequelize);
db.restaurantRegistrationPetition = require('./restaurantRegistrationPetition.model')(sequelize, Sequelize);
db.parking = require('./parking.model')(sequelize, Sequelize);
db.reviewPetition = require('./reviewPetition.model')(sequelize, Sequelize);
db.managerWaiter = require('./manager-waiter.model')(sequelize, Sequelize);
db.restaurantMap = require('./restaurantMap.model')(sequelize, Sequelize);

//add to food category
//add to restaurant
//food category with id 1  -- restaurant with id 5
//
db.foods.belongsTo(db.foodCategory);
db.foods.belongsTo(db.restaurant);
db.restaurant.belongsToMany(db.foodCategory, {through:'foodCategoryRestaurant'});
db.restaurant.belongsTo(db.restaurantCategory);
db.user.hasOne(db.restaurant);
db.user.belongsTo(db.rol);
db.chat.belongsTo(db.user, {foreignKey: 'user_emitter'});
db.chat.belongsTo(db.user, {foreignKey: 'user_receiver'});
db.review.belongsTo(db.user);
db.review.belongsTo(db.restaurant);



db.table.belongsTo(db.restaurant);
db.reservation.belongsToMany(db.table, {through:'reservationTable'});
db.parking.belongsTo(db.restaurant);
db.reservation.belongsToMany(db.parking, {through:'reservationParking'});

db.reservation.belongsTo(db.user);
db.reservation.belongsTo(db.restaurant);
//db.reservation.belongsTo(db.table);

db.orderReservation.belongsTo(db.foods);
db.orderReservation.belongsTo(db.reservation);

db.restaurant.hasOne(db.restaurantRegistrationPetition);
db.review.hasOne(db.reviewPetition);

db.restaurantMap.belongsTo(db.restaurant);

//db.reservation.belongsToMany(db.foods,{through:'foodReservation'});

/**{
 * foodId
 * reservationId
 * quantity
 * } */

module.exports = db;
