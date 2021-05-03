import React, { useState } from "react";
import Axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';


const itensViability = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
];

const itensStatus = [
    { value: '1', label: 'Planejado' },
    { value: '2', label: 'Em Desenvolvimento' },
    { value: '3', label: 'Cancelado' },
    { value: '4', label: 'Concluído' },
];



const Page = () => {

    const [viability, setViability] = React.useState('1');
    const handleChangeViability = (event) => {
        setViability(event.target.value);
    };
    const [status, setStatus] = useState("1");
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };
    const [nameOwner, setNameOwner] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [registerDate, setRegisterDate] = useState("");

    const submitData = () => {
        //const date = new Date();
        //setRegisterDate
        Axios.post("http://localhost:3001/api/insert", {
            nameOwner: nameOwner,
            description: description,
            viability: viability,
            startDate: startDate,
            endDate: endDate,
            status: status,
            //     registerDate: registerDate,
        }).then(() => {
            alert("Cadastrado com Sucesso");
        })

    };

    return <div className="title">
        <h1>Cadastro de Projetos</h1>

        <div className="form">
            <TextField required
                id="outlined-basic"
                label="Nome do Responsável"
                variant="outlined"
                type="text"
                name="nameOwner"
                onChange={(e) => {
                    setNameOwner(e.target.value);
                }} />

            <TextField required
                id="outlined-multiline-static"
                label="Descrição do Projeto"
                multiline
                rows={4}
                variant="outlined"
                type="text"
                name="description"
                onChange={(e) => {
                    setDescription(e.target.value);
                }} />

            <TextField required
                id="standard-select-currency"
                select
                label="Viabilidade"
                value={viability}
                onChange={handleChangeViability}
                defaultValue="1"
                helperText="1=Menos viável / 5=Mais viável"
            >
                {itensViability.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField required
                id="standard-select-currency"
                select
                label="Status"
                value={status}
                onChange={handleChangeStatus}
                defaultValue="1"
            >
                {itensStatus.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                id="startDate"
                label="Data de Início"
                type="date"
                defaultValue="0000-00-00"
                InputLabelProps={{
                    shrink: true,
                }} onChange={(e) => {
                    setStartDate(e.target.value);
                }} />

            <TextField
                id="endDate"
                label="Previsão Data Final"
                type="date"
                defaultValue="0000-00-00"
                InputLabelProps={{
                    shrink: true,
                }} onChange={(e) => {
                    setEndDate(e.target.value);
                }} />

            <Button variant="contained" color="primary" onClick={submitData}>
                Cadastrar
            </Button>

        </div>
    </div >
}

export default Page;