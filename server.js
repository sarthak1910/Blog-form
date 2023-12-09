const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const username = process.env.MONGOODB_USERNAME;
const password = process.env.MONGOODB_PASSWORD;
// mongoose.connect("mongodb://127.0.0.1:27017/blogDB", { useNewUrlParser: true, useUnifiedTopology: true })
// .then(()=> {
//     console.log('Connected')
// })
// .catch((e) => {
//     console.log(e)
// })

mongoose.connect(`mongodb+srv://${process.env.MONGOODB_USERNAME}:${process.env.MONGOODB_PASSWORD}@cluster0.aeqgugb.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> {
    console.log('Connected')
})
.catch((e) => {
    console.log(e)
})

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
});

const Post = mongoose.model("Post", postSchema);

app.get("/", async(req, res) => {
    const data = await Post.find();
    res.render("index", {data : data});
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/create", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;

    const newPost = new Post({
        title: title,
        content: content,
        author: author
    });

    try {
        newPost.save();
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
});

app.get("/posts", (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.json(posts);
        }
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
