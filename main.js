const express = require("express");
const app = express();
app.use(express.json());
const PORT = 5000;

const articles = [
    {
    id: 1,
    title: 'How I learn coding?',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    {
    id: 2,
    title: 'Coding Best Practices',
    description:
    'Lorem, ipsum dolor sit, Quam, mollitia.',
    author: 'Besslan',
    },
    {
    id: 3,
    title: 'Debugging',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    ];

app.get("/articles", (req, res) => {
    res.status(200);
    res.json(articles);
});

app.get("/articles/:id", (req, res) => {
    res.status(200);  
    res.json(articles[req.id - 1]);
})

app.listen(PORT, () => {
    console.log(`The server is listening at port ${PORT}`);
});