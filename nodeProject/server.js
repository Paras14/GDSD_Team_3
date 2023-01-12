const express = require("express");
const app = express();



// CORS
app.use(function (req, res, cb) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    cb();
});

app.use(function (req, res, cb) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');        
    res.header('Access-Control-Allow-Methods', '*');        
    cb();
});

const cors = require('cors');
const { Sequelize } = require('sequelize');

const db = require('./src/models');

const foodRoute = require('./src/routes/food.routes')(app);
const restaurantRoute = require('./src/routes/restaurant.routes')(app);
const foodCategoryRoute = require('./src/routes/foodCategory.routes')(app);
const restaurtantRout = require('./src/routes/restaurantCategory.routes')(app);
const bodyParser = require("body-parser");

app.use (cors({origin: "http://localhost:8080/"}));

// parse requests of content-type - application/json
app.use (bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use (bodyParser.urlencoded({extended:true}));



//simple route
app.get ("/", (req, res, callback) => {
    res.json({message: "Welcome to RISTO"});
    callback();
});

//app.use('/foods', foodRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log ('Server is running on port $(PORT).' );
});

// const sequelize = new Sequelize('risto', 'root', 'aman', {
//     host: 'localhost',
//     dialect: 'mysql'
//   });


//{force: true}
db.sequelize.sync()
    .then( () => {
        console.log("Synced db.")
    })
    .catch( (err) => {
        console.log("Failed to sync db: " + err.message);
    });



    
        