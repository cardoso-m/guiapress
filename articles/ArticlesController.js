const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("../articles/Article")
const adminAuth = require("../middleware/adminAuth")
const slugify = require("slugify")

router.get("/admin/articles", adminAuth, (req, res) => {

    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render("admin/articles/index", { articles: articles })
    })


})

router.get("/admin/articles/new", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories })
    })
})

router.post("/articles/save", (req, res) => {
    var title = req.body.title
    var category = req.body.category
    var body = req.body.body

    Article.create({
        title: title,
        slug: slugify(title),
        categoryId: category,
        body: body
    }).then(() => {
        res.redirect("/admin/articles")
    })
})

router.post("/admin/articles/delete", adminAuth, (req, res) => {
    var id = req.body.id

    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: { id: id }
            }).then(() => {
                res.redirect("/admin/articles")
            })
        } else {
            res.redirect("/admin/articles")
        }
    } else {
        res.redirect("/admin/articles")
    }
})

router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id

    Article.findByPk(id).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", { article: article, categories: categories })
            })
        } else {
            res.redirect("/")
        }
    }).catch(error => {
        res.redirect("/")
    })
})

router.post("/articles/update", adminAuth, (req, res) => {
    var id = req.body.id
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category

    Article.update({ id: id, title: title, slug: slugify(title), body: body, categoryId: category }, {
        where: { id: id }
    }).then(() => {
        res.redirect("/admin/articles")
    })
})

router.get("/articles/page/:num", adminAuth, (req, res) => {
    var page = req.params.num
    var offset = 0

    if (isNaN(page) || page == 1) {
        offset = 0
    } else {
        offset = (parseInt(page) - 1) * 4
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ["id", "DESC"]
        ]
    }).then(article => {
        var next
        var result

        if (offset + 4 >= article.count) {
            next = false
        } else {
            next = true
        }

        result = {
            page: parseInt(page),
            next: next,
            article: article
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", { result: result, categories: categories })
        })
    })


})

module.exports = router