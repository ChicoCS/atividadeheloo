const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mariadb = require('mariadb');

const conect = mariadb.createPool({ host: 'localhost', user: 'root', password: '12345' });
conect.getConnection()
    .then(conn => {
        console.log("connected!");
        conn.release(); //release to pool
    })
    .catch(err => {
        console.log("not connected due to error: " + err);
    });
//export { conect };

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


//LISTAR
app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM dbproject.project";
    conect.query(sqlSelect)
        .then(result => {
            res.send(result);
        })
});


//INSERIR
app.post("/api/insert", (req, res) => {

    const nameOwner = req.body.nameOwner;
    const description = req.body.description;
    const viability = req.body.viability;
    const status = req.body.status;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const sqlInsert =
        "INSERT INTO dbproject.project(nameOwner, description, viability, status, startDate, endDate, ccDate) VALUES (?, ?, ?, ?, ?, ?, '2030-10-03');"
    conect.query(sqlInsert, [nameOwner, description, viability, status, startDate, endDate])
        .then(conn => {
            console.log("passou");
        })
        .catch(err => {
            //handle error
        });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});
