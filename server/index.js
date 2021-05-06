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
                console.log("filtro passou");
            })
            .catch(error => {
                console.log("filtro não passou");
            });
    } else if (statusP == 0 && startDate == undefined) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE viability=?";
        conect.query(sqlSelect, [viability])
            .then(result => {
                res.send(result);
                console.log("filtro passou");
            })
            .catch(error => {
                console.log("filtro não passou");
            });
    } else if (viability == 0 && startDate == undefined) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE statusP=?";
        conect.query(sqlSelect, [statusP])
            .then(result => {
                res.send(result);
                console.log("filtro passou");
            })
            .catch(error => {
                console.log("filtro não passou");
            });
    } else if (viability == 0 && statusP == 0) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE startDate=?";
        conect.query(sqlSelect, [startDate])
            .then(result => {
                res.send(result);
                console.log("filtro passou");
            })
            .catch(error => {
                console.log("filtro não passou");
            });
    } else if (startDate == undefined) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE viability=? AND statusP=?";
        conect.query(sqlSelect, [viability, statusP])
            .then(result => {
                res.send(result);
                console.log("filtro passou");
            })
            .catch(error => {
                console.log("filtro não passou");
            });
    } else if (statusP == 0) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE viability=? AND startDate=?";
        conect.query(sqlSelect, [viability, startDate])
            .then(result => {
                res.send(result);
                console.log("filtro passou");
            })
            .catch(error => {
                console.log("filtro não passou");
            });
    } else if (viability == 0) {
        sqlSelect = "SELECT * FROM dbproject.project WHERE statusP=? AND startDate=?";
        conect.query(sqlSelect, [statusP, startDate])
            .then(result => {
                res.send(result);
                console.log("filtro passou");
            })
            .catch(error => {
                console.log("filtro não passou");
            });
    }
});

//UPDATEPROJECT FALTA VERIFICAR
app.put('/api/updateproject', (req, res) => {
    const id = req.query.id;
    const description = req.body.description;
    const viability = req.body.viability;
    const statusP = req.body.statusP;
    const sqlUpdate = "UPDATE dbproject.project SET `description`=?, `viability`=?, `statusP`=? WHERE  `id`=?;"
    conect.query(sqlUpdate, [description, viability, statusP, id])
        .then(response => {
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
            console.log(response, "Pegou");
        })
        .catch(error => {
            console.log(error, " não PEGOu");
        });
});

//INSERIR
app.post("/api/insertproject", (req, res) => {
    const nameOwner = req.body.nameOwner;
    const description = req.body.description;
    const viability = req.body.viability;
    const statusP = req.body.statusP;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const registerDate = req.body.registerDate;
    const sqlInsert =
        "INSERT INTO dbproject.project(nameOwner, description, viability, statusP, startDate, endDate, registerDate) VALUES (?, ?, ?, ?, ?, ?, ?);"
    conect.query(sqlInsert, [nameOwner, description, viability, statusP, startDate, endDate, registerDate])
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});
