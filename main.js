const express = require("express");
const db = require("./project_3_v01");
const { Model } = require("mongoose");
const { User, Article } = require("./schema");
const app = express();
const uuidv4 = require("uuidv4");
app.use(express.json());
const PORT = 5000;

// const articles = [
//   {
//     id: 1,
//     title: "How I learn coding?",
//     description: "Lorem, Quam, mollitia.",
//     author: "Jouza",
//   },
//   {
//     id: 2,
//     title: "Coding Best Practices",
//     description: "Lorem, ipsum dolor sit, Quam, mollitia.",
//     author: "Besslan",
//   },
//   {
//     id: 3,
//     title: "Debugging",
//     description: "Lorem, Quam, mollitia.",
//     author: "Jouza",
//   },
// ];

app.get("/articles", (req, res) => {
  // res.status(200);
  // res.json(articles);

  Article
    .find({})
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    })
});

app.get("/articles/search_1", (req, res) => {
  // const author = req.query.author;
  // const article = articles.filter((element) => element.author === author);
  // res.status(200);
  // res.json(article);
});

app.get("/articles/:id", (req, res) => {
  // const id = req.params.id;
  // const article = articles.find((element) => element.id === Number(id));
  // res.status(200);
  // res.json(article);
});

app.post("/users", async (req, res) => {
  const {firstName, lastName, age, country, email, password} = req.body;
  const author = new User({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
  });

  await author
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    })
});

app.post("/articles", async (req, res) => {
  // req.body.id = await uuidv4.uuid();
  // articles.push(req.body);
  // res.status(201);
  // res.json(req.body);
  
  const {title, description, author} = req.body;
  const article = new Article({
    title,
    description,
    author,
  });

  await article
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    })
});

app.put("/articles/:id", (req, res) => {
  // const edit = req.body;
  // const id = req.params.id;
  // const article = articles.find((element) => element.id === Number(id));
  // const index = articles.indexOf(article);
  // let newArticle;
  // if (edit.title && edit.description && edit.author) {
  //   articles.splice(index,1,edit);
  //   newArticle = edit;
  // }
  // res.status(200);
  // res.json(newArticle);
});

app.delete("/articles/:id", (req, res) => {
  // const id = req.params.id;
  // articles.forEach((element, index) => {
  //   if (element.id === Number(id)) {
  //     articles.splice(index,1);
  //   }
  // });
  // res.status(200);
  // res.json({
  //   "success": true,
  //   "message": `Success delete article with id => ${id}`
  // });
});

app.delete("/articles", (req, res) => {
  // const author = req.query.author;
  // const toBeDeleted = articles.filter((element) => element.author === author);
  // for (index = 0; index < toBeDeleted.length; index++) {
  //   let articleIndex = articles.indexOf(toBeDeleted[index]);
  //   articles.splice(articleIndex,1);
  // };
  // res.status(200);
  // res.json({
  // "success": true,
  // "message": `Success delete article from author => ${author}`
  // });
});

app.listen(PORT, () => {
  console.log(`The server is listening at port ${PORT}`);
});
