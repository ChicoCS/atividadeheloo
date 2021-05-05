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

//FILTRAR FALTA TERMINAR
app.get("/api/filterprojectList", (req, res) => {
    let viability = req.query.viability;
    let statusP = req.query.statusP;
    console.log(viability, "=viabilidade", statusP, "=status")
    //let startDate = req.query.startDate;

    const sqlSelect = "SELECT * FROM dbproject.project WHERE viability=? AND statusP=?";
    conect.query(sqlSelect, [viability, statusP])
        .then(response => {
            console.log("filtro passou");
        })
        .catch(error => {
            console.log("filtro não passou");
        });
});

//UPDATEPROJECT FALTA VERIFICAR
app.put('/api/updateproject', (req, res) => {
    const id = req.body.id;
    const description = req.body.description;
    const viability = req.body.viability;
    const statusP = req.body.statusP;
    const sqlUpdate = "UPDATE dbproject.project SET `description`=? `viability`=? `statusP`=? WHERE  `id`=?;"
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
    const sqlUpdate = "UPDATE dbproject.project SET `statusP`=? WHERE  `id`=?;"
    conect.query(sqlUpdate, [statusP, id])
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
});

//GETID FALTA VERIFICAR
app.get('/api/getidproject', (req, res) => {
    let id = req.query.id;
    const sqlSelect = "SELECT * FROM dbproject.project WHERE  id=?"
    conect.query(sqlSelect, [id])
        .then(response => {
            console.log(response, "passou");
        })
        .catch(error => {
            console.log(error, " não passou");
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
