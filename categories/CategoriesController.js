const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')
const { where } = require('sequelize')
const adminAuth = require("../middleware/adminAuth")

router.get("/admin/categories", adminAuth, (req, res) => {

    Category.findAll().then(categories => {
        res.render("admin/categories/index", { category: categories })
    })

})

router.post("/categories/save", adminAuth, (req, res) => {
    title = req.body.title

    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories")
        })
    } else {
        res.redirect("/admin/categories/new")
    }
})

router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render("admin/categories/new")
})

router.post("/admin/categories/delete", (req, res) => {
    var id = req.body.id

    if (id != undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: { id: id }
            }).then(() => {
                res.redirect("/admin/categories")
            })
        } else {
            res.redirect("/admin/categories")
        }
    } else {
        res.redirect("/admin/categories")
    }
})

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id

    Category.findByPk(id).then(category => {
        if (isNaN(id)) {
            res.redirect("/admin/categories")
        }
        if (category != undefined) {
            res.render("admin/categories/edit", { category: category })
        } else {
            res.redirect("/admin/categories")
        }
    })
})

router.post("/admin/categories/update", adminAuth, (req, res) => {
    var id = req.body.id
    var title = req.body.title

    Category.update({ title: title, slug: slugify(title) }, {
        where: { id }
    }).then(() => {
        res.redirect("/admin/categories")
    })
})

module.exports = router