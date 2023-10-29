const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/db")

//Handling Uncaught Exception :- Like console.log(xyz) --> xyz is not defined hence will throw the uncaught exception error
process.on("uncaughtException", err => {
    console.log(`Error ${err.essage}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

//Connecting DataBase
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT || 4000}`);
})

//unhandled Promise rejection error :- like when the URL of database is disturbed
//to resolve it we would crash the server
process.on("unhandledRejection", err => {
    console.log(`Error ${err.message}`);
    console.log("Shutting down the server due to unhandles promise rejection");
    server.close(() => {
        process.exit(1);
    });
});