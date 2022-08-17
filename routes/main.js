const path = require("path");
const multer = require("multer");
const express = require("express");
module.exports = function (app) {
  app.get("/", function (req, res) {
    let sqlquery =
      "SELECT * FROM walk_1 a LEFT JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.walk_datetime >= NOW() ORDER BY walk_datetime ASC LIMIT 1; SELECT * FROM feed_1 a LEFT JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE feed_datetime >= NOW() ORDER BY feed_datetime ASC LIMIT 1;";
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      console.log(result[1]);
      res.render("index.html", {
        walks: result[0],
        feeds: result[1],
      });
    });
  });

  

// Andy Code==========================================================================
  // render pet page in database
  app.get("/pet", function (req, res) {
    let sqlquery = "SELECT * FROM pet_test1; SELECT * FROM walk_1; SELECT * FROM feed_1";
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
  });

  //render walk form by id
  app.get("/add_walk/:id", (req, res) => {
    const petId = req.params.id;
    let sql = `SELECT * from pet_test1; SELECT * FROM walk_1;`
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.render('add_walk.html', {
        title: 'this is add new walk schedule page',
        walks: result[1],
        pets: result[0],
        petId: petId
      });
    });
  });

  //render feed form by id
  app.get("/add_feed/:id", (req, res) => {
    const petId = req.params.id;
    let sql = `SELECT * from pet_test1; SELECT * FROM feed_1;`
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.render('add_feed.html', {
        title: 'this is add new feed schedule page',
        feeds: result[1],
        pets: result[0],
        petId: petId
      });
    });
  });

  //save walk schedule by id
  app.post("/save", function (req, res) {
    if (req.body.add_pet) {
      let sql =
        "INSERT INTO pet_test1 (name, type, mood, health) VALUES (?, ?, ?, ?)";

      for (const key in req.body) {
        let new_records = req.body[key];
        console.log(new_records);
        // execute sql query
        db.query(sql, new_records, (err, result) => {
          if (err) {
            return console.error(err.message);
          } else {
            res.redirect('/pet');
          }
        });
      };
      console.log(req.body);
      


    };
    if (req.body.add_walk) {
      let sql =
        "INSERT INTO walk_1 (walk_name, walk_distance, walk_datetime, pet_id) VALUES (?, ?, ?, ?)";
      for (const key in req.body) {
        let new_records = req.body[key];
        // res.write(
        //   " This walk has been added to database, name: " + req.body[key]
        // );
        // execute sql query
        db.query(sql, new_records, (err, result) => {
          if (err) {
            return console.error(err.message);
          } else {
            res.redirect('/pet');
          }
        });
      };
    };
    if (req.body.add_feed) {
      console.log(req.body);
      let sql =
        "INSERT INTO feed_1 (feed_name, feed_type, feed_amount, feed_datetime, pet_id) VALUES (?, ?, ?, ?, ?)";

      for (const key in req.body) {
        let new_records = req.body[key];
        // res.write(
        //   " This feeding schedule has been added to database, name: " +
        //   req.body[key]
        // );
        // execute sql query
        db.query(sql, new_records, (err, result) => {
          if (err) {
            return console.error(err.message);
          } else {
            res.redirect('/pet');
          }
        });
      }
    }

  });

  // delete walk by id
  app.get("/delete_walk/:id", (req, res) => {
    // res.send('this is delete walk');
    const walkId = req.params.id;
    let sql = `DELETE from walk_1 where walk_id = ${walkId}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect('/pet');
    });
  });

  // delete feed by id
  app.get("/delete_feed/:id", (req, res) => {
    const feedId = req.params.id;
    let sql = `DELETE from feed_1 where feed_id = ${feedId}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect('/pet');
    });
  });
  // Andy Code==========================================================================


  app.get("/todo", function (req, res) {
     // get mysql records for [0]today; [1]today +1 and +2; [2]today +2 and today +93 according to xxxx_timestamp; max up to + 365 days 
    let sqlquery =
      "SELECT * from walk_1 a LEFT JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.walk_datetime >= CURDATE() AND a.walk_datetime < CURDATE() + INTERVAL 1 DAY ORDER BY a.walk_datetime; SELECT * from walk_1 a LEFT JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.walk_datetime >= CURDATE() + INTERVAL 1 DAY AND a.walk_datetime < CURDATE() + INTERVAL 2 DAY ORDER BY a.walk_datetime; SELECT * from walk_1 a LEFT JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.walk_datetime >= CURDATE() + INTERVAL 2 DAY AND a.walk_datetime < CURDATE() + INTERVAL 365 DAY ORDER BY a.walk_datetime; SELECT * from feed_1 a LEFT JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.feed_datetime >= CURDATE() AND a.feed_datetime < CURDATE() + INTERVAL 1 DAY ORDER BY a.feed_datetime; SELECT * from feed_1 a LEFT JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.feed_datetime >= CURDATE() + INTERVAL 1 DAY AND a.feed_datetime < CURDATE() + INTERVAL 2 DAY ORDER BY a.feed_datetime; SELECT * from feed_1 a LEFT JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.feed_datetime >= CURDATE() + INTERVAL 2 DAY AND a.feed_datetime < CURDATE() + INTERVAL 365 DAY ORDER BY a.feed_datetime";
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      console.log(result[1]);
      res.render("todo.html", {
        feeds_upcoming: result[5],
        feeds_tomorrow: result[4],
        feeds_today: result[3],
        walks_upcoming: result[2],
        walks_tomorrow: result[1],
        walks_today: result[0],
      });
    });
  });

  // post for updating walk_complete boolean in todo.html
  app.post("/update_walk_complete", function (req, res) {
    // saving data in database
    let sqlquery = "UPDATE walk_1 SET walk_complete = (?) WHERE walk_id = (?);";
    // execute sql query
    let updaterecord = [req.body.walk_complete, req.body.walk_id];
    db.query(sqlquery, updaterecord, (err, result) => {
      if (err) {
        return console.error(err.message);
      } else res.redirect("/todo");
    });
  });

  // post for updating feed_complete boolean in todo.html
  app.post("/update_feed_complete", function (req, res) {
    // saving data in database
    let sqlquery = "UPDATE feed_1 SET feed_complete = (?) WHERE feed_id = (?);";
    // execute sql query
    let updaterecord = [req.body.feed_complete, req.body.feed_id];
    db.query(sqlquery, updaterecord, (err, result) => {
      if (err) {
        return console.error(err.message);
      } else res.redirect("/todo");
    });
  });
  

  // for new_status page -- show pet info
  app.get("/new_status", function (req, res) {
    // query database to get all the pets
    let sqlquery =
      "SELECT * FROM pet_test1; SELECT * FROM walk_1; SELECT * FROM feed_1; SELECT * FROM walk_1 a left JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.pet_id = 1; SELECT * FROM walk_1 a left JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.pet_id = 2; SELECT * FROM walk_1 a left JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.pet_id = 3; SELECT * FROM feed_1 a left JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.pet_id = 1; SELECT * FROM feed_1 a left JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.pet_id = 2; SELECT * FROM feed_1 a left JOIN pet_test1 b ON a.pet_id = b.pet_id WHERE a.pet_id = 3";
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("new_status.html", {
        feed_p_id3: result[8],
        feed_p_id2: result[7],
        feed_p_id1: result[6],
        walks_p_id3: result[5],
        walks_p_id2: result[4],
        walks_p_id1: result[3],
        feeds: result[2],
        walks: result[1],
        pets: result[0],
      });
    });
  });

  // post for removewalk button in new_status page
  app.post("/removewalk", function (req, res) {
    // saving data in database
    let sqlquery = "DELETE from walk_1 where walk_id = (?)";
    // execute sql query
    let updaterecord = [req.body.id];
    db.query(sqlquery, updaterecord, (err, result) => {
      if (err) {
        return console.error(err.message);
      } else res.redirect("/new_status");
    });
  });

  // render delete page with all devices in database
  // app.get("/delete", function (req, res) {
  //   res.render("delete.html");
  // });

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
          " This feeding schedule has been added to database, name: " +
            req.body[key]
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
      cb(null, "./uploads/pets");
    },
    filename: function (req, file, cb) {
      // console.log(path.extname(file.originalname))
      cb(null, "pet1-pic.png");
    },
  });
  const pet1upload = multer({
    storage: pet1storage,
  });

  app.use("/uploads/pets", express.static("uploads"));
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
      cb(null, "./uploads/pets");
    },
    filename: function (req, file, cb) {
      // console.log(path.extname(file.originalname))
      cb(null, "pet2-pic.png");
    },
  });
  const pet2upload = multer({
    storage: pet2storage,
  });

  app.use("/uploads/pets", express.static("uploads"));
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
      cb(null, "./uploads/pets");
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

  app.use("/uploads/pets", express.static("uploads"));
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

   // render delete page with all devices in database
    app.get("/delete", function (req, res) {
        // query database to get all the entries 
        let sqlquery = "SELECT * FROM pet_test1; SELECT * FROM walk_1 ORDER BY walk_datetime; SELECT * FROM feed_1 ORDER BY feed_datetime";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            }
            res.render("delete.html", {
              feed_p_id3: result[8],
              feed_p_id2: result[7],
              feed_p_id1: result[6],
              walks_p_id3: result[5],
              walks_p_id2: result[4],
              walks_p_id1: result[3],
              feeds: result[2],
              walks: result[1],
              pets: result[0],
            });
        });
    });

// handle form data from deleteForm submission
    app.post("/deletePet", function (req, res) {
        // query database to get all the devices
        let sqlquery = "SET foreign_key_checks = 0; DELETE FROM `pet_test1` WHERE pet_id = (?); SET foreign_key_checks = 1;"
        // execute sql query
        for (const key in req.body) {
                let new_records = req.body[key];
                res.write(" This entry has been deleted from the database, name: " + req.body[key]);
                // execute sql query
                db.query(sqlquery, new_records, (err, result) => {
                    if (err) {
                        return console.error(err.message);
                    } else {
                        res.send()
                    }
                });
            }
        });
    app.post("/deleteWalk", function (req, res) {
        // query database to get all the devices
        let sqlquery = "DELETE FROM `walk_1` WHERE walk_id = (?);"
        // execute sql query
        for (const key in req.body) {
                let new_records = req.body[key];
                res.write(" This device has been deleted from the database, name: " + req.body[key]);
                // execute sql query
                db.query(sqlquery, new_records, (err, result) => {
                    if (err) {
                        return console.error(err.message);
                    } else {
                        res.send()
                    }
                });
            }
        });
    app.post("/deleteFeeding", function (req, res) {
        // query database to get all the devices
        let sqlquery = "DELETE FROM `feed_1` WHERE feed_id = (?);"
        // execute sql query
        for (const key in req.body) {
                let new_records = req.body[key];
                res.write(" This device has been deleted from the database, name: " + req.body[key]);
                // execute sql query
                db.query(sqlquery, new_records, (err, result) => {
                    if (err) {
                        return console.error(err.message);
                    } else {
                        res.send()
                    }
                });
            }
        });
};


