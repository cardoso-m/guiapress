const express = require('express')
const router = express.Router()
const User = require('./user')
const bcrypt = require('bcryptjs')

router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", { users: users })
    })
})

router.get("/admin/user/create", (req, res) => {
    res.render("admin/users/create")
})

router.post("/users/create", (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var password = req.body.password

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user == undefined) {
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
        } else {
            res.redirect("/admin/user/create")
        }
    })
})

module.exports = router