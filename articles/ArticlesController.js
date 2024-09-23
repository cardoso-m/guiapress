const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("../articles/Article")
const slugify = require("slugify")

router.get("/admin/articles", (req, res) => {

    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render("admin/articles/index", { articles: articles })
    })


})

router.get("/admin/articles/new", (req, res) => {
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

router.post("/admin/articles/delete", (req, res) => {
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

router.get("/admin/articles/edit/:id", (req, res) => {
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

router.post("/articles/update", (req, res) => {
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

module.exports = router