const path = require("path");
const multer = require("multer");
const express = require("express");
module.exports = function (app) {
  app.get("/", function (req, res) {
    // let sqlquery = "SELECT * FROM pet_test1; SELECT * FROM walk_1; ";
    let sqlquery = "SELECT * FROM walk_1 WHERE walk_datetime >= NOW() ORDER BY walk_datetime ASC LIMIT 1; SELECT * FROM feed_1 WHERE feed_datetime >= NOW() ORDER BY feed_datetime ASC LIMIT 1;";
    // let sqlquery_2 = "SELECT * FROM walk_1";
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      console.log(result[1])
      res.render("index.html", {
        walks: result[0],
        feeds: result[1],
      });
    });
  });

  // duplicated add.post
  app.post("/", function (req, res) {
    // handle form data from curtainsForm submission
    if (req.body.add_pet) {
      console.log(req.body);
      let sqlquery =
        "INSERT INTO pet_test1 (name, type, mood, health) VALUES (?, ?, ?, ?)";

      for (const key in req.body) {
        let new_records = req.body[key];
        res.write(
          " This pet has been added to database, name: " + req.body[key]
        );
        // execute sql query
        db.query(sqlquery, new_records, (err, result) => {
          if (err) {
            return console.error(err.message);
          } else {
            res.send();
          }
        });
      }
    }
  });

  // render pet page in database
  app.get("/pet", function (req, res) {
    // res.render("index.html");
    let sqlquery = "SELECT * FROM pet_test1; SELECT * FROM walk_1; SELECT * FROM feed_1";
    //        let sqlquery = "SELECT * FROM pet_test1; SELECT walk_datetime FROM walk_1; SELECT * FROM feed_1";




    //date_format(datecol, '%H:%i:%s') as 'time' FROM table;




    // let sqlquery_2 = "SELECT * FROM walk_1";
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect("/");
        }
        res.render("pet.html", {
            feeds: result[2],
            walks: result[1],
            pets: result[0],
        });
    });
    //        res.render("pet.html");
});

  //
  app.get("/about", function (req, res) {
    res.render("about.html");
  });

  // for new_status page -- show pets
  app.get("/new_status", function (req, res) {
    // query database to get all the pets
    let sqlquery =
      "SELECT * FROM pet_test1; SELECT * FROM walk_1; SELECT * FROM feed_1; SELECT * FROM walk_1 a left JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.pet_id = 1; SELECT * FROM walk_1 a left JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.pet_id = 2;SELECT * FROM walk_1 a left JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.pet_id = 3";
    // let sqlquery_2 = "SELECT * FROM walk_1";
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("new_status.html", {
        walks_p_id3: result[5],
        walks_p_id2: result[4],
        walks_p_id1: result[3],
        feeds: result[2],
        walks: result[1],
        pets: result[0],
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

  // leave this for testing functionality (Collin)
  app.post("/add", function (req, res) {
    // handle form data from curtainsForm submission
    if (req.body.add_pet) {
      console.log(req.body);
      let sqlquery =
        "INSERT INTO pet_test1 (name, type, mood, health) VALUES (?, ?, ?, ?)";

      for (const key in req.body) {
        let new_records = req.body[key];
        res.write(
          " This pet has been added to database, name: " + req.body[key]
        );
        // execute sql query
        db.query(sqlquery, new_records, (err, result) => {
          if (err) {
            return console.error(err.message);
          } else {
            res.send();
          }
        });
      }
    }

    // add walk form
    if (req.body.add_walk) {
      console.log(req.body);
      let sqlquery2 =
        "INSERT INTO walk_1 (walk_name, walk_distance, walk_datetime, pet_id) VALUES (?, ?, ?, ?)";

      for (const key in req.body) {
        let new_records = req.body[key];
        res.write(
          " This walk has been added to database, name: " + req.body[key]
        );
        // execute sql query
        db.query(sqlquery2, new_records, (err, result) => {
          if (err) {
            return console.error(err.message);
          } else {
            res.send();
          }
        });
      }
    }

    // add feed schedule form
    if (req.body.add_feed) {
      console.log(req.body);
      let sqlquery2 =
        "INSERT INTO feed_1 (feed_name, feed_type, feed_amount, feed_datetime, pet_id) VALUES (?, ?, ?, ?, ?)";

      for (const key in req.body) {
        let new_records = req.body[key];
        res.write(
          " This feeding schedule has been added to database, name: " + req.body[key]
        );
        // execute sql query
        db.query(sqlquery2, new_records, (err, result) => {
          if (err) {
            return console.error(err.message);
          } else {
            res.send();
          }
        });
      }
    }
  });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      // console.log(path.extname(file.originalname))
      cb(null, "profile-pic.png");
    },
  });
  const upload = multer({
    storage: storage,
  });

  app.use("/uploads", express.static("uploads"));
  app.post(
    "/profile-upload-single",
    upload.single("image"),
    function (req, res, next) {
      // req.file is the `profile-file` file
      // req.body will hold the text fields, if there were any
      console.log(JSON.stringify(req.file));
      var response = '<a href="/">Home</a><br>';
      response += "Files uploaded successfully.<br>";
      response += `<img src="${req.file.path}" /><br>`;
      return res.send(response);
    }
  );

  //Pet1
  const pet1storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/pets/pet1");
    },
    filename: function (req, file, cb) {
      // console.log(path.extname(file.originalname))
      cb(null, "pet1-pic.png");
    },
  });
  const pet1upload = multer({
    storage: pet1storage,
  });

  app.use("/uploads/pets/pet1", express.static("uploads"));
  app.post(
    "/pet1-upload-single",
    pet1upload.single("image"),
    function (req, res, next) {
      // req.file is the `profile-file` file
      // req.body will hold the text fields, if there were any
      console.log(JSON.stringify(req.file));
      var response = '<a href="/">Home</a><br>';
      response += "Files uploaded successfully.<br>";
      response += `<img src="${req.file.path}" /><br>`;
      return res.send(response);
    }
  );

  //Pet2
  const pet2storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/pets/pet2");
    },
    filename: function (req, file, cb) {
      // console.log(path.extname(file.originalname))
      cb(null, "pet2-pic.png");
    },
  });
  const pet2upload = multer({
    storage: pet2storage,
  });

  app.use("/uploads/pets/pet2", express.static("uploads"));
  app.post(
    "/pet2-upload-single",
    pet2upload.single("image"),
    function (req, res, next) {
      // req.file is the `profile-file` file
      // req.body will hold the text fields, if there were any
      console.log(JSON.stringify(req.file));
      var response = '<a href="/">Home</a><br>';
      response += "Files uploaded successfully.<br>";
      response += `<img src="${req.file.path}" /><br>`;
      return res.send(response);
    }
  );

  //Pet3
  const pet3storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/pets/pet3");
    },
    filename: function (req, file, cb) {
      // console.log(path.extname(file.originalname))
      // cb(null, "pet3-pic"+path.extname(file.originalname))
      cb(null, "pet3-pic.png");
    },
  });
  const pet3upload = multer({
    storage: pet3storage,
  });

  app.use("/uploads/pets/pet3", express.static("uploads"));
  app.post(
    "/pet3-upload-single",
    pet3upload.single("image"),
    function (req, res, next) {
      // req.file is the `profile-file` file
      // req.body will hold the text fields, if there were any
      console.log(JSON.stringify(req.file));
      var response = '<a href="/">Home</a><br>';
      response += "Files uploaded successfully.<br>";
      response += `<img src="${req.file.path}" /><br>`;
      return res.send(response);
    }
  );
};
