const express = require("express");
const app = express();


const bodyParser = require("body-parser");
// parse requests of content-type - application/json
app.use (bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use (bodyParser.urlencoded({extended:true}));

// CORS
app.use(function (req, res, cb) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    cb();
});

// app.use(function (req, res, cb) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');        
//     res.header('Access-Control-Allow-Methods', '*');        
//     cb();
// });

const cors = require('cors');
const { Sequelize } = require('sequelize');
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

const db = require('./src/models');

const foodRoute = require('./src/routes/food.routes')(app);
const restaurantRoute = require('./src/routes/restaurant.routes')(app);
const foodCategoryRoute = require('./src/routes/foodCategory.routes')(app);
const restaurtantRout = require('./src/routes/restaurantCategory.routes')(app);
const userRoute = require('./src/routes/user.routes')(app);
const rolRoute = require('./src/routes/rol.routes')(app);
const chatRoute = require('./src/routes/chat.routes')(app);
const reservationRoute = require('./src/routes/reservation.routes')(app);
const reviewRoute = require('./src/routes/review.routes')(app);
const restaurantRegistrationPetitionRoute = require('./src/routes/restaurantRegistrationPetition.routes')(app);
const reviewPetitionRoute = require('./src/routes/reviewPetition.routes')(app);
const orderReservationRoute = require('./src/routes/orderReservation.routes')(app);
const parkingRoute = require('./src/routes/parking.routes')(app);
const tableRoute = require('./src/routes/table.routes')(app);
const restaurantMapRoute = require('./src/routes/restaurantMap.routes')(app);

app.use (cors({origin: "http://localhost:8080/"}));





//simple route
app.get ("/", (req, res, callback) => {
    res.json({message: "Welcome to RISTO"});
    callback();
});
exports.io = io;
//app.use('/foods', foodRoute);

require('./src/socket/socket.js')(io);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
console.log (`Server is running on port ${PORT}.` );
});

// const sequelize = new Sequelize('risto', 'root', 'aman', {
//     host: 'localhost',
//     dialect: 'mysql'
//   });


// {force: true}
db.sequelize.sync()
    .then( () => {
        console.log("Synced db.")
    })
    .catch( (err) => {
        console.log("Failed to sync db: " + err.message);
    });



    
        