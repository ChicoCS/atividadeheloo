import React, { Component } from "react";
import api from '../services/api'
import { TextField, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { format } from 'date-fns';
import './styles.css';

class Page extends Component {

    state = {
        nameOwner: '',
        description: '',
        viability: '1',
        statusP: '1',
        startDate: '',
        endDate: '',
        registerDate: format((new Date()), "yyyy/MM/dd"),
    }

    submitData = async () => {
        await api.post("/api/insertproject", {
            nameOwner: this.state.nameOwner,
            description: this.state.description,
            viability: this.state.viability,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            statusP: this.state.statusP,
            registerDate: this.state.registerDate,
        }).then(response => {
            console.log(response, "passou");
        })
            .catch(error => {
                console.log(error);
            });
    };


    render() {

        //const { nameOwner } = this.state;
        //const { description } = this.state;
        const { viability } = this.state;
        const { statusP } = this.state;
        //const { startDate } = this.state;
        //const { endDate } = this.state;
        //const { registerDate } = this.state;


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
            this.setState({ statusP: (event.target.value) });
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
                    value={statusP}
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