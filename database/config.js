const mongoose = require('mongoose');

const dbConnection = async() =>{
    try{
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.DB_CNN);
        console.log('Connected to database');
    }catch(error){
        console.log(error);
        throw new Error('Database error - Contact with the admin');
    }
}

module.exports = {
    dbConnection
}