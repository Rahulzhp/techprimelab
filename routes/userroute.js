
const express = require("express")

const { UserModel } = require("../model/user")

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken")

const usersRoute = express.Router()

// userroute.use(express.json())
usersRoute.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        bcrypt.hash(password, 8, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash })
            await user.save()
            res.send("Registered")
        });
    } catch (err) {
        res.send("er", err)
        console.log(err)
    }
})

usersRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email }); // Use findOne instead of find

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user._id }, "masai");
                    res.send({ success: "Login successfully", token });
                } else {
                    res.send("Invalid password"); // Send an error message for incorrect password
                }
            });
        } else {
            res.send("Invalid email"); // Send an error message for invalid email
        }
    } catch (err) {
        res.send("Something went wrong");
    }
});

module.exports = {
    usersRoute
};