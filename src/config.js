const mongoose = require("mongoose");


const connect = mongoose.connect("mongodb://127.0.0.1:27017/yathis")

connect.then(()=> {
    console.log("connection succesful...")
}).catch(err => console.error("connection error:", err));

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collectionModel = new mongoose.model('users', LoginSchema);
module.exports = collectionModel
