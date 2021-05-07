const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mariadb = require('mariadb');

const conect = mariadb.createPool({ host: 'localhost', user: 'root', password: '12345' });
conect.getConnection()
    .then(conn => {
        console.log("connected!");
        conn.release();
    })
    .catch(err => {
    });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/getprojectlist", (req, res) => {
    const sqlSelect = "SELECT * FROM dbproject.project";
    conect.query(sqlSelect)
        .then(result => {
            res.send(result);
        })
});

app.get("/api/filterprojectList", (req, res) => {
    let viability = req.query.viability;
    let statusP = req.query.statusP;
    let startDate = req.query.startDate;

    if (viability > 0 && statusP > 0 && startDate != undefined) {
        const sqlSelect = "SELECT * FROM dbproject.project WHERE viability=? AND statusP=? AND startDate=?";
        conect.query(sqlSelect, [viability, statusP, startDate])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
            });
    } else if (statusP == 0 && startDate == undefined) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE viability=?";
        conect.query(sqlSelect, [viability])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
            });
    } else if (viability == 0 && startDate == undefined) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE statusP=?";
        conect.query(sqlSelect, [statusP])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
            });
    } else if (viability == 0 && statusP == 0) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE startDate=?";
        conect.query(sqlSelect, [startDate])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
            });
    } else if (startDate == undefined) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE viability=? AND statusP=?";
        conect.query(sqlSelect, [viability, statusP])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
            });
    } else if (statusP == 0) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE viability=? AND startDate=?";
        conect.query(sqlSelect, [viability, startDate])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
            });
    } else if (viability == 0) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE statusP=? AND startDate=?";
        conect.query(sqlSelect, [statusP, startDate])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
            });
    }
});

app.put('/api/updatedescription', (req, res) => {
    const id = req.body.id;
    const description = req.body.description;
    console.log('des', description);
    const sqlUpdate = "UPDATE dbproject.project SET `description`=? WHERE `id`=?;"
    conect.query(sqlUpdate, [description, id])
        .then(response => {
            res.send(response);
            console.log(response);
        })
        .catch(error => {
            console.log();
        });
})

app.put('/api/updatestatusproject', (req, res) => {
    const id = req.body.id;
    const statusP = req.body.statusP;
    const ccDate = req.body.ccDate;
    console.log('ccDate=', ccDate, "id=", id, 'statusP=', statusP)

    if (statusP >= 3) {
        const sqlUpdate = "UPDATE dbproject.project SET `statusP`=?, `ccDate`=? WHERE  `id`=?;"
        conect.query(sqlUpdate, [statusP, ccDate, id])
            .then(response => {
                res.send(response);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        const sqlUpdate = "UPDATE dbproject.project SET `statusP`=? WHERE  `id`=?;"
        conect.query(sqlUpdate, [statusP, id])
            .then(response => {
                res.send(response);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
});


//UPDATEPROJECT FAZER UPDATEVIABILITY!
app.put('/api/updateproject', (req, res) => {
    const id = req.body.id;
    const description = req.body.description;
    const viability = req.body.viability;
    const statusP = req.body.statusP;
    console.log('des=', description, 'via=', viability, 'status=', statusP)

    if (description != undefined && viability != undefined && statusP != undefined) {
        const sqlUpdate = "UPDATE dbproject.project SET `description`=?, `viability`=?, `statusP`=? WHERE `id`=?;"
        conect.query(sqlUpdate, [description, viability, statusP, id])
            .then(response => {
                res.send(response);
                console.log(response);
            })
            .catch(error => {
                console.log();
            });
    } else if (statusP == undefined) {
        sqlUpdate = "UPDATE dbproject.project SET `description`, `viability`=? WHERE `id`=?;"
        conect.query(sqlUpdate, [description, viability, id])
            .then(response => {
                res.send(response);
                console.log(response);
            })
            .catch(error => {
                console.log();
            });
    } else if (viability == undefined) {
        sqlUpdate = "UPDATE dbproject.project SET `description`, `statusP`=? WHERE `id`=?;"
        conect.query(sqlUpdate, [description, statusP, id])
            .then(response => {
                res.send(response);
                console.log(response);
            })
            .catch(error => {
                console.log();
            });
    } else if (description == undefined) {
        sqlUpdate = "UPDATE dbproject.project SET `viability`, `statusP`=? WHERE `id`=?;"
        conect.query(sqlUpdate, [viability, statusP, id])
            .then(response => {
                res.send(response);
                console.log(response);
            })
            .catch(error => {
                console.log();
            });
    } else if (viability == undefined && statusP == undefined) {
        sqlUpdate = "UPDATE dbproject.project SET `description`=? WHERE `id`=?;"
        conect.query(sqlUpdate, [description, id])
            .then(response => {
                res.send(response);
                console.log(response);
            })
            .catch(error => {
                console.log();
            });
    } else if (description == undefined && statusP == undefined) {
        sqlUpdate = "UPDATE dbproject.project SET `viability`=? WHERE `id`=?;"
        conect.query(sqlUpdate, [viability, id])
            .then(response => {
                res.send(response);
                console.log(response);
            })
            .catch(error => {
                console.log();
            });
    } else if (description == undefined && viability == undefined) {
        sqlUpdate = "UPDATE dbproject.project SET `statusP`=? WHERE `id`=?;"
        conect.query(sqlUpdate, [statusP, id])
            .then(response => {
                res.send(response);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
});


app.get('/api/getidproject', (req, res) => {
    let id = req.query.id;
    const sqlSelect = "SELECT * FROM dbproject.project WHERE id=?"
    conect.query(sqlSelect, [id])
        .then(result => {
            res.send(result);
        })
        .catch(error => {
        });
});

app.post("/api/insertproject", (req, res, next) => {
    const nameOwner = req.body.nameOwner;
    const description = req.body.description;
    const valueP = req.body.valueP;
    const viability = req.body.viability;
    const statusP = req.body.statusP;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const registerDate = req.body.registerDate;
    const sqlInsert =
        "INSERT INTO dbproject.project(nameOwner, description, valueP, viability, statusP, startDate, endDate, registerDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
    conect.query(sqlInsert, [nameOwner, description, valueP, viability, statusP, startDate, endDate, registerDate])
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            next(err);
        });
});

app.listen(3001, () => {
});
