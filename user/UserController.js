const express = require('express')
const router = express.Router()
const User = require('./user')
const bcrypt = require('bcryptjs')

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

    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)

    User.create({
        name: name,
        email: email,
        password: hash
    }).then(() => {
        res.redirect("/")
    }).catch(error => {
        res.redirect("/")
    })
})

module.exports = router