import React, { Component } from "react";
import api from '../services/api'
import { TextField, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import './styles.css';

class Page extends Component {

    state = {
        nameOwner: '',
        description: '',
        viability: '1',
        status: '1',
        startDate: '',
        endDate: '',
        registerDate: '',
    }

    submitData = async (event) => {
        event.preventDefault();

        console.log('ashuash');

        const date = format(new Date(), "yyyy-MM-dd", { locale: pt })
        this.setState({ registerDate: (date) });
        try {
            await api.post("/api/insert", {
                nameOwner: this.state.nameOwner,
                description: this.state.description,
                viability: this.state.viability,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                status: this.state.status,
                registerDate: this.state.registerDate,
            })
        } catch (e) {
            console.log(e);
        } finally {
            window.location.href = "http://localhost:3000/";
        }
    };


    render() {

        const { nameOwner } = this.state;
        const { description } = this.state;
        const { viability } = this.state;
        const { status } = this.state;
        const { startDate } = this.state;
        const { endDate } = this.state;
        const { registerDate } = this.state;


        const itemsViability = [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
        ];

        const itemsStatus = [
            { value: '1', label: 'Planejado' },
            { value: '2', label: 'Em Desenvolvimento' },
            { value: '3', label: 'Cancelado' },
            { value: '4', label: 'Concluído' },
        ];

        const handleChangeViability = (event) => {
            this.setState({ viability: (event.target.value) });
        };

        const handleChangeStatus = (event) => {
            this.setState({ status: (event.target.value) });
        };




        return <div className="title">
            <h1>Cadastro de Projeto</h1>

            <div className="form">
                <TextField
                    id="outlined-basic"
                    label="Nome do Responsável"
                    variant="outlined"
                    type="text"
                    name="nameOwner"
                    onChange={(event) => {
                        this.setState({ nameOwner: (event.target.value) });
                    }} />

                <TextField
                    id="outlined-multiline-static"
                    label="Descrição do Projeto"
                    multiline
                    rows={4}
                    variant="outlined"
                    type="text"
                    name="description"
                    onChange={(event) => {
                        this.setState({ description: (event.target.value) });
                    }} />

                <TextField
                    id="standard-select-currency"
                    select
                    label="Viabilidade"
                    value={viability}
                    onChange={handleChangeViability}
                    defaultValue="1"
                    helperText="1=Menos viável / 5=Mais viável"
                >
                    {itemsViability.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="standard-select-currency"
                    select
                    label="Status"
                    value={status}
                    onChange={handleChangeStatus}
                    defaultValue="1"
                >
                    {itemsStatus.map((option) => (
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
                    }} onChange={(event) => {
                        this.setState({ startDate: (event.target.value) });
                    }} />

                <TextField
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