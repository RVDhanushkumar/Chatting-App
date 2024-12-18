const express = require("express");
const mongoose = require("mongoose");

const database = mongoose.connect("mongodb://localhost:27017/Chat-user")
.then(()=>{
    console.log("DB connected!!");
})
.catch((err)=>{
    console.log("ERROR:", err);
})

module.exports = database;

