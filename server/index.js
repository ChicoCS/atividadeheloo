const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mariadb = require('mariadb');
const { reset } = require('nodemon');
const { response } = require('express');

const conect = mariadb.createPool({ host: 'localhost', user: 'root', password: '12345' });
conect.getConnection()
    .then(conn => {
        console.log("connected!");
        conn.release(); //release to pool
    })
    .catch(err => {
        console.log("not connected due to error: " + err);
    });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//LISTAR
app.get("/api/getprojectlist", (req, res) => {
    const sqlSelect = "SELECT * FROM dbproject.project";
    conect.query(sqlSelect)
        .then(result => {
            res.send(result);
        })
});

//FILTRAR
app.get("/api/filterprojectList", (req, res) => {
    let viability = req.query.viability;
    let statusP = req.query.statusP;
    let startDate = req.query.startDate;
    console.log(viability, "=viabilidade", statusP, "=status", "data=", startDate)

    if (viability > 0 && statusP > 0 && startDate != undefined) {
        const sqlSelect = "SELECT * FROM dbproject.project WHERE viability=? AND statusP=? AND startDate=?";
        conect.query(sqlSelect, [viability, statusP, startDate])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                console.log(error);
            });
    } else if (statusP == 0 && startDate == undefined) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE viability=?";
        conect.query(sqlSelect, [viability])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                console.log(error);
            });
    } else if (viability == 0 && startDate == undefined) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE statusP=?";
        conect.query(sqlSelect, [statusP])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                console.log(error);
            });
    } else if (viability == 0 && statusP == 0) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE startDate=?";
        conect.query(sqlSelect, [startDate])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                console.log(error);
            });
    } else if (startDate == undefined) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE viability=? AND statusP=?";
        conect.query(sqlSelect, [viability, statusP])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                console.log(error);
            });
    } else if (statusP == 0) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE viability=? AND startDate=?";
        conect.query(sqlSelect, [viability, startDate])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                console.log(error);
            });
    } else if (viability == 0) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE statusP=? AND startDate=?";
        conect.query(sqlSelect, [statusP, startDate])
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                console.log(error);
            });
    }
});

//UPDATEPROJECT
app.put('/api/updateproject', (req, res, next) => {
    const id = req.body.id;
    const description = req.body.description;
    const viability = req.body.viability;
    const statusP = req.body.statusP;
    const ccDate = req.body.ccDate;

    if (statusP >= 3) {
        const sqlUpdate = "UPDATE dbproject.project SET `description`=?, `viability`=?, `statusP`=?, `ccDate`=? WHERE `id`=?;"
        conect.query(sqlUpdate, [description, viability, statusP, ccDate, id])
            .then(response => {
                res.send(response);
                console.log(response, "editou");
            })
            .catch(error => {
                console.log(error, "azedou");
            });
    } else sqlUpdate = "UPDATE dbproject.project SET `description`=?, `viability`=?, `statusP`=? WHERE `id`=?;"
    conect.query(sqlUpdate, [description, viability, statusP, id])
        .then(response => {
            res.send(response);
            console.log(response, "editou");
        })
        .catch(error => {
            console.log(error, "azedou");
        });
});

//UPDATESTATUS
app.put('/api/updatestatusproject', (req, res) => {
    const id = req.body.id;
    const statusP = req.body.statusP;
    const ccDate = req.body.ccDate;
    console.log('ccDate=', ccDate, "id=", id, 'statusP=', statusP)
    const sqlUpdate = "UPDATE dbproject.project SET `statusP`=?, `ccDate`=? WHERE  `id`=?;"
    conect.query(sqlUpdate, [statusP, ccDate, id])
        .then(response => {
            res.send(response);
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
});

//GETID
app.get('/api/getidproject', (req, res) => {
    let id = req.query.id;
    const sqlSelect = "SELECT * FROM dbproject.project WHERE id=?"
    conect.query(sqlSelect, [id])
        .then(result => {
            res.send(result);
            console.log(result, "Pegou");
        })
        .catch(error => {
            console.log(error, "não PEGOu");
        });
});

//INSERIR
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
            console.log("ok", res);
        })
        .catch(err => {
            next(err);
            console.error("error", err);
        });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});
