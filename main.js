const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./project_3_v01");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Role, User, Comment, Article } = require("./schema");
const app = express();
//  const uuidv4 = require("uuidv4");
const secret = process.env.SECRET;
const port = process.env.PORT;
app.use(express.json());
// req.token = token (verified)

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

const authorization = (permission) => {

  return (req, res, next) => {
    Role
    .find(req.token.role)
    .then((result) => {
      if (result.permissions.indexOf(permission) !== -1) {
        next();
      }
    })
    .catch((error) => {
      res.status(403),
      res.json({
        "message": "Forbidden",
        "status": 403
      })
    })
  };
};

const authorize = authorization("Create comments");

const authentication = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  
  jwt.verify(token, secret, (err, result) => {
    if (err) {
      res.json({
        message: "The token is invalid or expired",
        status: 403,
      });
    }

    if (result) {
      req.token = token;
      next();
    }
  });
};

app.get("/articles", (req, res) => {
  // res.status(200);
  // res.json(articles);

  Article.find({})
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.get("/articles/search_1", (req, res) => {
  // const author = req.query.author;
  // const article = articles.filter((element) => element.author === author);
  // res.status(200);
  // res.json(article);

  const author = req.query.author;
  Article.find({ author: author })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.get("/articles/:id", (req, res) => {
  // const id = req.params.id;
  // const article = articles.find((element) => element.id === Number(id));
  // res.status(200);
  // res.json(article);

  const id = req.params.id;
  Article.find({ _id: id })
    .populate("author", "firstName")
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/users", async (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  
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
    });
});

app.post("/articles", async (req, res) => {
  // req.body.id = await uuidv4.uuid();
  // articles.push(req.body);
  // res.status(201);
  // res.json(req.body);

  const { title, description, author } = req.body;
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
    });
});

app.post("/articles/:id/comments", authentication, authorize, async (req, res) => {
  const { comment, commenter } = req.body;
  const articleComment = new Comment({
    comment,
    commenter,
  });

  await articleComment
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
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

  const edit = req.body;
  const id = req.params.id;
  Article.findOneAndUpdate({ _id: id }, edit)
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
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

  const id = req.params.id;

  Article.findOneAndDelete({ _id: id })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
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

  const author = req.query.author;

  Article.deleteMany({ author: author })
    .then(() => {
      res.json("Success");
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/login", (req, res) => {
  // const {email, password} = req.body;
  // User
  // .find({email: email, password: password})
  // .then ((result) => {
  //   if (result.length === 0) {
  //     res.status(401);
  //     res.json("Invalid login credentials");
  //   }

  //   res.status(200);
  //   res.json("Valid login credentials");
  // })
  // .catch(() => {
  //   res.json(error);
  // })

  const { email, password } = req.body;
  User.find({ email: email.toLowerCase() })
    .then(async (result) => {
      if (result.length !== 0) {
        const id = result[0]._id;
        const country = result[0].country;
        const hashedPassword = result[0].password;
        

        if (await bcrypt.compare(password, hashedPassword)) {
          
          const role = new Role ({
            role: "admin",
            permissions: ["Create comments", "Manage users"],
          });

          const payload = {
            userId: id,
            country: country,
            role: role,
          };
          const options = { expiresIn: "1h" };
          const token = jwt.sign(payload, secret, options);
          res.status(200);
          res.json(token);
        } else {
          res.status(403);
          res.json("The password you've entered in incorrect");
        }
      } else {
        res.status(404);
        res.json("The email is invalid");
      }
    })

    .catch((error) => {
      res.json(error);
    });
});

app.listen(port, () => {
  console.log(`The server is listening at port ${port}`);
});
