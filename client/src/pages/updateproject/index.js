import React, { Component } from "react";
import api from '../services/api'
import { TextField, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import './styles.css';

class Page extends Component {

    state = {
        id: '1',
        nameOwner: '',
        description: '',
        viability: '1',
        status: '1',
        startDate: '',
        endDate: '',
        registerDate: '',
    }

    async getProjectById(id) {
        const response = await api.get("/api/getid", {
            params: {
                id: this.setState
            }
        })
    }

    componentDidMount() {
    }


    render() {


        const { projectList } = this.state;
        //console.table(projectList);
        const { id } = this.state;
        const { nameOwner } = this.state;
        const { description } = this.state;
        const { viability } = this.state;
        const { status } = this.state;
        const { startDate } = this.state;
        const { endDate } = this.state;
        const { registerDate } = this.state;

        console.log(nameOwner, 'meuOVO');

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

        const submitData = () => {
            const date = format(new Date(), "yyyy-MM-dd", { locale: pt })
            this.setState({ registerDate: (date) });
            api.post("/api/insert", {
                nameOwner: nameOwner,
                description: description,
                viability: viability,
                startDate: startDate,
                endDate: endDate,
                status: status,
                registerDate: registerDate,
            }).then(() => {
                alert("Cadastrado com Sucesso");
            })
        };


        return <div className="title">
            <h1>Atualizar Cadastro</h1>

            <div className="form">
                <TextField disabled
                    id="outlined-basic"
                    label="Nome do Responsável"
                    variant="outlined"
                    type="text"
                    name="nameOwner"
                    value={nameOwner}
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
                    defaultValue={this.state.id}
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

                <TextField disabled
                    id="startDate"
                    label="Data de Início"
                    type="date"
                    defaultValue="0000-00-00"
                    InputLabelProps={{
                        shrink: true,
                    }} onChange={(event) => {
                        this.setState({ startDate: (event.target.value) });
                    }} />

                <TextField disabled
                    id="endDate"
                    label="Previsão Data Final"
                    type="date"
                    defaultValue="0000-00-00"
                    InputLabelProps={{
                        shrink: true,
                    }} onChange={(event) => {
                        this.setState({ endDate: (event.target.value) });
                    }} />

                <TextField disabled
                    id="registerDate"
                    label="Data de Registro"
                    type="date"
                    defaultValue="0000-00-00"
                    InputLabelProps={{
                        shrink: true,
                    }} onChange={(event) => {
                        this.setState({ endDate: (event.target.value) });
                    }} />

                <TextField disabled
                    id="ccDate"
                    label="data conclusão / cancelamento"
                    type="date"
                    defaultValue="0000-00-00"
                    InputLabelProps={{
                        shrink: true,
                    }} onChange={(event) => {
                        this.setState({ endDate: (event.target.value) });
                    }} />

                <Button variant="contained" color="primary" onClick={submitData}>
                    Atualizar
            </Button>

            </div>
        </div >
    }
}

export default Page;