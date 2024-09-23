const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

const Article = require('./articles/Article')
const Category = require('./categories/Category')

//View engine
app.set("view engine", "ejs")
//Static
app.use(express.static('public'))
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Database
connection.authenticate().then(() => {
    console.log("Conn success!")
}).catch((msgError) => {
    console.log(msgError)
})


app.use("/", articlesController)
app.use("/", categoriesController)

app.get("/", (req, res) => {

    Article.findAll({
        order: [
            ["id", "DESC"]
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", { articles: articles, categories: categories })
        })
    })
})

app.get("/:slug", (req, res) => {
    var slug = req.params.slug

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", { article: article, categories: categories })
            })
        } else {
            res.redirect("/")
        }
    }).catch(error => {
        res.redirect("/")
    })
})

app.get("/categories/:slug", (req, res) => {
    var slug = req.params.slug

    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
    }).then(category => {

        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", { articles: category.articles, categories: categories })
            })
        } else {
            res.redirect("/")
        }

    }).catch(error => {
        res.redirect("/")
    })

})

app.listen(8000, () => {
    console.log("SERVER ON!")
})