const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

const app = express();

//Bodyparser middleware
app.use(express.json());

// DB config
const db = config.get("mongoURI");

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));

// Use routes
app.use("/api/items", require("./routes/api/Items"));
app.use("/api/users", require("./routes/api/Users"));
app.use("/api/auth", require("./routes/api/Auth"));

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
