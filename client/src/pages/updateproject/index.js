import React, { useState, Component } from "react";
import api from '../services/api'
import { TextField, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import './styles.css';

class Page extends Component {

    state = {
        project: [],
        id: '57',
        ccDate: '',
        viability: '',
        status: '',
    }

    //FALTA TERMINAR
    async getProjectById() {
        const response = await api.get("/api/getidproject", {
            params: {
                id: this.state.id,
            }
        });
        console.log(response.data, 'response')
        this.setState({
            project: response.data,
        })
    }

    async submitData(id, viability, statusP) {
        api.put("/api/updateproject", {
            id: this.state.id,
            description: this.state.description,
            viability: viability,
            statusP: statusP,
        }).then(() => {
            alert("Cadastrado com Sucesso");
        })
    };

    componentDidMount() {
        this.getProjectById()
    }


    render() {

        const { project } = this.state;

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
            <h1>Atualizar Cadastro</h1>

            {project.map((project) => (
                <div className="form">
                    <TextField disabled
                        id="outlined-basic"
                        label="Nome do Responsável"
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="text"
                        name="nameOwner"
                        value={project.nameOwner}
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Descrição do Projeto"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        type="text"
                        name="description"
                        defaultValue={project.description}
                        onChange={(event) => {
                            this.setState({ description: (event.target.value) });
                        }} />

                    <TextField
                        id="standard-select-currency"
                        select
                        label="Viabilidade"
                        size="small"
                        value={project.viability}
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
                        size="small"
                        value={project.statusP}
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
                        id="outlined-basic"
                        label="Data de Início"
                        variant="outlined"
                        size="small"
                        type="text"
                        name="startDate"
                        value={format(parseISO(project.startDate), 'dd/MM/yyyy', { locale: pt })}
                    />

                    <TextField disabled
                        id="outlined-basic"
                        label="Previsão Data Final"
                        variant="outlined"
                        size="small"
                        type="text"
                        name="endDate"
                        value={format(parseISO(project.endDate), 'dd/MM/yyyy', { locale: pt })}
                    />

                    <TextField disabled
                        id="outlined-basic"
                        label="Data de Registro"
                        variant="outlined"
                        size="small"
                        type="text"
                        name="registerDate"
                        value={format(parseISO(project.registerDate), 'dd/MM/yyyy', { locale: pt })}
                    />

                    <TextField disabled
                        id="outlined-basic"
                        label="Data de Conclusão/Cancelamento"
                        variant="outlined"
                        size="small"
                        type="text"
                        name="ccDate"
                        value={format(parseISO(project.ccDate), 'dd/MM/yyyy', { locale: pt })}
                    />

                    <Button variant="contained" color="primary" onClick={() => this.submitData(57, project.viability, project.statusP)}>
                        Atualizar
                    </Button>

                </div>
            ))}
        </div >
    }
}

export default Page;