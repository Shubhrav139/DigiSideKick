const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const dbconnect = require("./dbconnect");
const userRoutes = require("./routers/userRoutes");

const PORT = 9000;
const URL = "http://localhost:3000";
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: URL,
    methods: "GET,POST,DELETE,PATCH"
  })
);

// Database connection
dbconnect()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log("Connected to localhost:" + PORT);
});

