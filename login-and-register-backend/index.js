const express = require('express');
const app = express();
const cors = require('cors')          //allow a connection frontend and backend
const mongoose = require('mongoose')

app.use(cors());          // connect frontend and backend
app.use(express.json())  //middleware apply

mongoose.connect('mongodb://localhost:27017/myLoginRegisterDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("connected to db")
});

//schema for user
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
const User = new mongoose.model("User", userSchema)


// Routes
app.post('/login', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {

        if (user) {                                    //check password
            if (password === user.password) {
                res.send({ message: "Login Sussessfully", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not Registered" })
        }
    })
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User is already registerd" })
        } else {
            const user = new User({
                name,
                email,
                password
            })
            //after register we create a user
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "sussessfully Registerd , Please login now" })
                }
            })
        }
    })
})

const PORT = process.env.Port || 2000;
app.listen(PORT, () => {
    console.log(`listen on port  ${PORT}`)
})