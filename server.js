const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();
const config = require("./config");

db = config.database;
mongoose.connect(
    db.url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use("/blog/articles", articleRouter);
app.use(methodOverride("_method"));

app.get("/blog", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: "desc" });
    res.render("articles/index", { articles: articles });
});

app.get("/", (req, res) => {
    res.render("apps");
});

app.use("/", express.static(__dirname + "/public"));

app.listen(5000);
