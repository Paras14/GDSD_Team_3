module.exports = {
    HOST: "db-instance-team3.czsntcnwbbwf.us-east-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "gdsdteam3",
    DB: "testrestaurantsbd",
    dialect: "mysql", 
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
    };