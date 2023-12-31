// this is intial commit api.js File
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')
//const fileUpload = require('express-fileupload')

dotenv.config({path:`config.env`})

const dbServices = require('./services/db.services')

const PORT = process.env.PORT||1732

const app = express()
const DB = dbServices(true).start();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(fileUpload)
app.use("/",require("../config/routes/routes"));

console.log(DB);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}...`);
    return DB;
})
