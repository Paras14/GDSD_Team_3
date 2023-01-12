const express = require("express");
const app = express();

const { Sequelize } = require('sequelize');

const cors = require('cors');

const db = require('./src/models');

const foodRoute = require('./src/routes/food.routes')(app);
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

db.sequelize.sync({force: true})
    .then( () => {
        console.log("Synced db.")
    })
    .catch( (err) => {
        console.log("Failed to sync db: " + err.message);
    });