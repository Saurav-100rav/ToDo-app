const mongoose = require("mongoose");
require('dotenv').config(); // Load variables from .env file

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const connectdb = async()=>{
    const URL = `mongodb+srv://${dbUser}:${dbPassword}@cluster-freecodecamp.yticvao.mongodb.net/${dbName}?retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL,{ useNewUrlParser:true, useUnifiedTopology:true, }) 
        console.log("Databse connected successfully");
    } catch (error) {
        console.log("Error while connecting db...",error);
    }
    
}

module.exports = connectdb;
