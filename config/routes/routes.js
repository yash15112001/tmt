const express = require("express")
express.json();
const route = express.Router();
const multer = require("multer")
const upload = multer();

const allApis = require("../../api/controllers/controller.js");

route.post("/api/uploadexcel",upload.single('file'),allApis.upload_formalise_and_populate_new_data)
// route.get("/api/formalise",allApis.populate_new_data)

module.exports = route