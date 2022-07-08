module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index.html");
  });

  // render update page with all devices in database
  app.get("/update", function (req, res) {
    res.render("update.html");
  });

  // render about page
  app.get("/about", function (req, res) {
    res.render("about.html");
  });

  app.get("/new_status", function (req, res) {
    // query database to get all the pets
    let sqlquery = "SELECT * FROM pets";
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("new_status.html", {
        pets: result,
      });
    });
  });

  // render delete page with all devices in database
  app.get("/delete", function (req, res) {
    res.render("delete.html");
  });

  // render add page with all devices in database
  app.get("/add", function (req, res) {
    res.render("add.html");
  });
};
