const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport")

const users = require("./routes/api/users")

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
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

//Deployment
// ... other imports 
const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on ${port}!`))

