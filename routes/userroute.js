
const express = require("express")

const { UserModel } = require("../model/user")

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken")

const usersRoute = express.Router()

// userroute.use(express.json())
usersRoute.post("/register", async (req, res) => {
    const payload = req.body
    try {
        const user = new UserModel(payload)
        await user.save()
        res.send("success")
    }
    catch (err) {
        res.send(err)
    }
})

usersRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await UserModel.find({ email })
        if (data.length > 0 && data[0].password === password) {
            res.send("sucess")
        }
        else {
            res.send("Invalid Credentials")
        }
    }
    catch (err) {
        res.send(err)
    }
})

module.exports = {
    usersRoute
}