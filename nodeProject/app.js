const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/name/:id', (req, res) =>{
    res.send(req.params.id);
});

//URL like: url?sortBy=dat
app.get('/api/posts', (req, res) =>{
    res.send(req.query);
});

//POSTS
app.post('/api/name', (req,res) => {
    res.send(req.body.name);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

//to start the server: nodemon app.js