const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const mysql = require("mysql");
const port = 8088;
// force all http:// requests to remove www. to become http://edogtracker.com
function wwwRedirect(req, res, next) {
  if (req.headers.host.slice(0, 4) === "www.") {
    var newHost = req.headers.host.slice(4);
    return res.redirect(301, req.protocol + "://" + newHost + req.originalUrl);
  }
  next();
}
app.set("trust proxy", true);
app.use(wwwRedirect);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/js"));


const db = mysql.createConnection({
  host: "137.184.191.242",
  user: "sammy2",
  password: "Asahi186!",
  database: "epettracker",
  multipleStatements: true,
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
