module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index.html")
    });
    // render update page with all devices in database
    app.get("/update", function (req, res) {
        let sqlquery = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            }
            res.render("update.html", { devices: result });
        });
    });

    // handle form data from updateForm submission
    app.post("/update", function (req, res) {
        // adjust query to match fields submitted
        if (req.body.front_crt || req.body.back_crt || req.body.br1_crt || req.body.br2_crt) {
            sqlquery = "UPDATE DEVICES SET IS_OPEN = 0 WHERE name like ?";
        }
        if (req.body.front_lock || req.body.back_lock || req.body.br1_lock || req.body.br2_lock) {
            sqlquery = "UPDATE DEVICES SET IS_LOCKED = 0 WHERE name like ?";
        }
        if (req.body.front_lts || req.body.back_lts || req.body.br1_lts || req.body.br2_lts) {
            sqlquery = "UPDATE DEVICES SET IS_ON = 0 WHERE name like ?";
        }
        if (req.body.front_tmp || req.body.br1_tmp || req.body.br2_tmp) {
            sqlquery = "UPDATE DEVICES SET IS_ON = 0 WHERE name like ?";
        }
        if (req.body.front_music || req.body.br1_music || req.body.br2_music) {
            sqlquery = "UPDATE DEVICES SET IS_ON = 0 WHERE name like ?";
        }

        // execute sql query
        for (const key in req.body) {
                let new_records = req.body[key];
                res.write(" This device has been turned off, name: " + req.body[key]);
                db.query(sqlquery, new_records, (err, result) => {
                    if (err) {
                        return console.error(err.message);
                    } else {
                        res.send()
                    }
                });
            }
    });

    // render about page
    app.get("/about", function (req, res) {
        res.render("about.html", {
            title: "About"
        });
    });

    // render status page with all devices in database
    app.get("/status", function (req, res) {
        // query database to get all the devices
        let sqlquery = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            }
            res.render("status.html", { devices: result });
        });
    });

    // render delete page with all devices in database
    app.get("/delete", function (req, res) {
        // query database to get all the devices
        let sqlquery = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            }
            res.render("delete.html", { devices: result });
        });
    });

    // handle form data from deleteForm submission
    app.post("/delete", function (req, res) {
        // query database to get all the devices
        let sqlquery = "DELETE FROM `devices` WHERE name like ?;"
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

    // render add page with all devices in database
    app.get("/add", function (req, res) {
        let sqlcheck = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlcheck, (err, result) => {
            if (err) {
                res.redirect("/");
            }
            res.render("add.html", { devices: result });
        });
    });

    // handle form data from various forms on add device page
    app.post("/add", function (req, res) {
        // handle form data from curtainsForm submission
        if (req.body.front_crt || req.body.back_crt || req.body.br1_crt || req.body.br2_crt) {
            let sqlquery = "INSERT INTO devices (name, is_open) VALUES (?, ?)";

            for (const key in req.body) {
                let new_records = req.body[key];
                res.write(" This device is added to database, name: " + req.body[key]);
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
        // handle form data from securityForm submission
        if (req.body.front_lock || req.body.back_lock || req.body.br1_lock || req.body.br2_lock) {
            let sqlquery = "INSERT INTO devices (name, is_locked) VALUES (?, ?)";

            for (const key in req.body) {
                let new_records = req.body[key];
                res.write(" This device is added to database, name: " + req.body[key]);
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
        // handle form data from lightsForm submission
        if (req.body.front_lts || req.body.back_lts || req.body.br1_lts || req.body.br2_lts) {
            let sqlquery = "INSERT INTO devices (name, is_on) VALUES (?, ?)";

            for (const key in req.body) {
                let new_records = req.body[key];
                res.write(" This device is added to database, name: " + req.body[key]);
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
        // handle form data from tempForm submission
        if (req.body.front_tmp || req.body.br1_tmp || req.body.br2_tmp) {
            let sqlquery = "INSERT INTO devices (name, degrees, is_on) VALUES (?, ?, 1)";
            for (const key in req.body) {
                let new_records = req.body[key];
                res.write(" This device is added to database, name: " + req.body[key]);
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
        // handle form data from musicForm submission
        if (req.body.front_music || req.body.br1_music || req.body.br2_music) {
            let sqlquery = "INSERT INTO devices (name, station, is_on) VALUES (?, ?, 1)";
            for (const key in req.body) {
                let new_records = req.body[key];
                res.write(" This device is added to database, name: " + req.body[key]);
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
    })
}
