import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import api from '../services/api'
import { TextField, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { format } from 'date-fns';
import './styles.css';


class Page extends Component {

    state = {
        nameOwner: '',
        description: '',
        valueP: '',
        viability: '1',
        statusP: '1',
        startDate: '',
        endDate: '',
        registerDate: format((new Date()), "yyyy/MM/dd"),
        redirect: null,
    }

    submitData = async () => {
        await api.post("/api/insertproject", {
            nameOwner: this.state.nameOwner,
            description: this.state.description,
            valueP: this.state.valueP,
            viability: this.state.viability,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            statusP: this.state.statusP,
            registerDate: this.state.registerDate,
        }).then(res => {
            alert("Projeto Cadastrado com Sucesso");
            this.setState({ redirect: "/" });
        }).catch(err => {
            alert("Preencha todos os Campos");
        });
    };


    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { viability } = this.state;
        const { statusP } = this.state;

        const handleChangeViability = (event) => {
            this.setState({ viability: (event.target.value) });
        };

        const handleChangeStatus = (event) => {
            this.setState({ statusP: (event.target.value) });
        };

        return <div className="title">
            <h1>Cadastro de Projeto</h1>

            <div className="form">

                <FormControl fullWidth required>
                    <InputLabel htmlFor="nameOwner">Nome do Responsável</InputLabel>
                    <Input
                        id="nameOwner"
                        type="text"
                        onChange={(event) => {
                            this.setState({ nameOwner: (event.target.value) });
                        }}
                    />
                </FormControl>

                <FormControl fullWidth required >
                    <InputLabel htmlFor="description">Descrição do Projeto</InputLabel>
                    <Input
                        id="description"
                        type="text"
                        multiline
                        rows={4}
                        type="text"
                        name="description"
                        onChange={(event) => {
                            this.setState({ description: (event.target.value) });
                        }}
                    />
                </FormControl>

                <FormControl fullWidth required>
                    <InputLabel htmlFor="valueP">Valor de Execução</InputLabel>
                    <Input
                        id="valueP"
                        type="number"
                        onChange={(event) => {
                            this.setState({ valueP: (event.target.value) });
                        }}
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                    />
                </FormControl>

                <FormControl required>
                    <InputLabel id="viability label">Viabilidade</InputLabel>
                    <Select
                        labelId="viability-label"
                        id="viability label"
                        value={viability}
                        onChange={handleChangeViability}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>

                <FormControl required>
                    <InputLabel id="statusP">Situação</InputLabel>
                    <Select
                        labelId="statusP label"
                        id="statusP"
                        value={statusP}
                        onChange={handleChangeStatus}
                    >
                        <MenuItem value={1}>Planejado</MenuItem>
                        <MenuItem value={2}>Em Desenvolvimento</MenuItem>
                        <MenuItem value={3}>Cancelado</MenuItem>
                        <MenuItem value={4}>Concluído</MenuItem>
                    </Select>
                </FormControl>

                <TextField required
                    id="startDate"
                    label="Data de Início"
                    type="date"
                    defaultValue="0000-00-00"
                    InputLabelProps={{
                        shrink: true,
                    }} onChange={(event) => {
                        this.setState({ startDate: (event.target.value) });
                    }} />

                <TextField required
                    id="endDate"
                    label="Previsão Data Final"
                    type="date"
                    defaultValue="0000-00-00"
                    InputLabelProps={{
                        shrink: true,
                    }} onChange={(event) => {
                        this.setState({ endDate: (event.target.value) });
                    }} />

                <Button variant="contained" color="primary" disableElevation onClick={this.submitData}>

                    Cadastrar
                </Button>

            </div>
        </div >
    }
}

export default Page;