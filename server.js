const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const blog = require("./routes/blogRoutes");
const blogUser = require("./routes/UserRoutes");
const blogUserAuth = require("./routes/auth");
const cors = require('cors');


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use(bodyParser.json({limit: '100mb'}));
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB

app.use("/api/blog", blog);
app.use("/api/blogUser", blogUser);
app.use("/api/blogUserAuth", blogUserAuth);

mongoose
  .connect(
    db,
    { useNewUrlParser: true, useCreateIndex:true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));