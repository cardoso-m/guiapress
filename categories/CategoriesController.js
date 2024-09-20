const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new")
})

router.post("/categories/save", (req, res) => {
    title = req.body.title

    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/")
        })
    } else {
        res.redirect("/admin/categories/new")
    }
})

module.exports = router