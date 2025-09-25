require('dotenv').config();
const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        const url = process.env.MONGODB_URL;
        await mongoose.connect(url);
        console.log("database is connected");
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectdb;