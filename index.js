//aducem pachetele instalate si le utilziam + conexiunea din db.js
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const messagesRouter = require('./messagesRouter')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/messages", messagesRouter);

//mentionam pe ce port sa ruleze 8080 pt heroku
const port = process.env.PORT || 8080;

//acces la portul creat mesaj sa verificam ca e ok
app.listen(port, () => {
    console.log(`CC app listening on port ${port}!`)
  });






