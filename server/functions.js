import { conect } from "./index"

function insertData(nameOwner, description, viability, status, startData, endData, registerData) {
    conect.query("INSERT INTO dbproject.project (nameOwner, description, viability, status, startData, endData, registerData) VALUES (?, ?, ?, ?, ?, ?, ?);")

        .then(res => {
            console.log('cadastro realizado');
        })
        .catch(err => {
            //handle error
        });

}

function updateData(id, description, viability, status) {
    conect.query("UPDATE dbproject.test SET description=", description, " viability=", viability, "status=", status, " WHERE ID=", id)
        .then(res => {
            console.log('editado');
        })
        .catch(err => {

        })
}

function updateStatus(id, status) {
    conect.query("UPDATE dbproject.test SET status=", status, " WHERE ID=", id)
        .then(res => {
            console.log('status editado');
        })
        .catch(err => {

        })
}