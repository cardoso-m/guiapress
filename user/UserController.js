const express = require('express')
const router = express.Router()
const User = require('./user')

router.get("/admin/users", (req, res) => {
    res.render("/")
})

router.get("/admin/user/create", (req, res) => {
    res.render("admin/users/create")
})

router.post("/users/create", (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var password = req.body.password

    res.json({ name, email, password })
})

module.exports = router