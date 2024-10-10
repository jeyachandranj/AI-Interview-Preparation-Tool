const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/LoginSignup")
.then(()=>{
    console.log("Connection successful");
})
.catch(()=>{
    console.log("No connection");
})

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    }
});

const collection = new mongoose.model("LoginCollection", LogInSchema);

module.exports = collection;