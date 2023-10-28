const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "backend/config/config.env"});

const Mongo_URL = process.env.MONGO_URL;

const connectDatabase = () => {
    mongoose
        .connect(Mongo_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((data) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        })
        // .catch((err) => {
        //     console.error(err);
        // });
        //Removed this coz added Unhandles Promis Rejection
};

module.exports = connectDatabase;
