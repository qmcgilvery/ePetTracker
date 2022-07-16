const path = require("path");
const multer = require("multer");
const express = require("express");
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

  // for new_status page
  app.get("/new_status", function (req, res) {
    // query database to get all the pets
    let sqlquery = "SELECT * FROM pet_test1";
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


  app.post("/add", function (req, res) {
      // handle form data from curtainsForm submission
      if (req.body.add_pet) {
          console.log(req.body)
          let sqlquery = "INSERT INTO pet_test1 (name, type, mood, health) VALUES (?, ?, ?, ?)";

          for (const key in req.body) {
              let new_records = req.body[key];
              res.write(" This pet has been added to database, name: " + req.body[key]);
              // execute sql query
              db.query(sqlquery, new_records, (err, result) => {
                  if (err) {
                      return console.error(err.message);
                  } else {
                      res.send()
                  }
              });
          }
      }
  });

  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads')
      },
      filename: function (req, file, cb) {
          // console.log(path.extname(file.originalname))
        cb(null, "profile-pic"+path.extname(file.originalname))
      }
    });
  const upload = multer({ storage: storage })

  app.use('/uploads', express.static('uploads'));
  app.post('/profile-upload-single', upload.single('image'), function (req, res, next) {
      // req.file is the `profile-file` file
      // req.body will hold the text fields, if there were any
      console.log(JSON.stringify(req.file))
      var response = '<a href="/">Home</a><br>'
      response += "Files uploaded successfully.<br>"
      response += `<img src="${req.file.path}" /><br>`
      return res.send(response)
    })
};