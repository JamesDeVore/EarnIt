const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express()

//body parser middleware
app.use(
  bodyParser.urlencoded({
    extended:false
  })
)

app.use(bodyParser.json())

//configure database

const db = require("./config/keys").mongoURI;

//now connect to the database
mongoose.connect(
  db, {
    useNewUrlParser:true
    } 
  )
  .then(() => console.log("MongodDB connected"))
  .catch(err => console.log(err))
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on ${port}!`))

