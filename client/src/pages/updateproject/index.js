import React, { Component } from "react";
import api from '../services/api'
import { Redirect } from 'react-router-dom'
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import './styles.css';
import { withRouter } from 'react-router'

class Page extends Component {

    state = {
        project: [],
        ccDate: format((new Date()), "yyyy/MM/dd"),
        redirect: null,
        id: this.props.match.params.id,
    }

    async getProjectById() {
        const response = await api.get("/api/getidproject", {
            params: {
                id: this.state.id,
            }
        });
        this.setState({
            project: response.data,
        })
    }

    async updateData() {
        if (this.state.statusP != undefined) {
            await api.put("/api/updatestatusproject", {
                id: this.state.id,
                statusP: this.state.statusP,
                ccDate: this.state.ccDate,
            })
        }
        if (this.state.description != undefined) {
            await api.put("/api/updatedescription", {
                id: this.state.id,
                description: this.state.description,
            })
        }
    }

    submitData = async () => {
        this.updateData()

        /*await api.put("/api/updateproject", {
            id: this.state.id,
            description: this.state.description,
            viability: this.state.viability,
            statusP: this.state.statusP,
        })
        alert("Alteração Realizada com Sucesso");
        this.setState({ redirect: "/" });*/

        /*await api.put("/api/updateproject", {
            id: this.state.id,
            description: this.state.description,
            viability: this.state.viability,
            statusP: this.state.statusP,
        })
        alert("Alteração Realizada com Sucesso");
        this.setState({ redirect: "/" });*/
    };

    componentDidMount() {
        this.getProjectById()
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { project } = this.state;
        const { description } = this.state;
        const { viability } = this.state;
        const { statusP } = this.state;

        const handleChangeViability = (event) => {
            this.setState({ viability: (event.target.value) });
        };

        const handleChangeStatus = (event) => {
            this.setState({ statusP: (event.target.value) });
        };


        return (

            <div>
                <h1>Atualizar Cadastro</h1>

                {project.map((project) => (
                    <div className="form">

                        <FormControl fullWidth>
                            <InputLabel htmlFor="nameOwner">Nome do Responsável</InputLabel>
                            <Input
                                id="nameOwner"
                                type="text"
                                value={project.nameOwner}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="description">Descrição do Projeto</InputLabel>
                            <Input
                                id="description"
                                name="description"
                                type="text"
                                multiline
                                rows={4}
                                defaultValue={project.description}
                                value={description}
                                onChange={(event) => {
                                    this.setState({ description: (event.target.value) });
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="valueP">Valor de Execução</InputLabel>
                            <Input
                                id="valueP"
                                type="text"
                                value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(project.valueP)} />
                        </FormControl>
                        <FormControl >
                            <InputLabel id="viability label">Viabilidade</InputLabel>
                            <Select
                                labelId="viability-label"
                                id="viability"
                                name="viability"
                                defaultValue={project.viability}
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
                        <FormControl >
                            <InputLabel id="statusP label">Situação</InputLabel>
                            <Select
                                labelId="statusP-label"
                                id="statusP"
                                name="statusP"
                                defaultValue={project.statusP}
                                value={statusP}
                                onChange={handleChangeStatus}
                            >
                                <MenuItem value={1}>Planejado</MenuItem>
                                <MenuItem value={2}>Em Desenvolvimento</MenuItem>
                                <MenuItem value={3}>Cancelado</MenuItem>
                                <MenuItem value={4}>Concluído</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl >
                            <InputLabel htmlFor="startDate">Data de Início</InputLabel>
                            <Input
                                id="startDate"
                                type="text"
                                value={format(parseISO(project.startDate), 'dd/MM/yyyy', { locale: pt })}
                            />
                        </FormControl>
                        <FormControl >
                            <InputLabel htmlFor="endDate">Data Fim Prevista</InputLabel>
                            <Input
                                id="endDate"
                                type="text"
                                value={format(parseISO(project.endDate), 'dd/MM/yyyy', { locale: pt })}
                            />
                        </FormControl>
                        <FormControl >
                            <InputLabel htmlFor="registerDate">Data de Registro</InputLabel>
                            <Input
                                id="registerDate"
                                type="text"
                                value={format(parseISO(project.registerDate), 'dd/MM/yyyy', { locale: pt })}
                            />
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={() => this.submitData()}>
                            Atualizar
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ redirect: "/" })}>
                            Voltar
                        </Button>
                    </div>
                ))}
            </div >
        )
    }
}

export default withRouter(Page);