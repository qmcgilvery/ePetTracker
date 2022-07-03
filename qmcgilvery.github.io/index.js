const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const port = 8089;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)
app.use(express.static('views'))

app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "322300",
  database: "myDevices"
});
// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.db = db;
require("./routes/main")(app);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
