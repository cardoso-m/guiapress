const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

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
    res.render("index")
})

app.listen(8000, () => {
    console.log("SERVER ON!")
})