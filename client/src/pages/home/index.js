import React, { useState, useEffect, Component } from "react";
import './styles.css';
import api from '../services/api'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO'
import pt from 'date-fns/locale/pt';

class Page extends Component {

    state = {
        projectList: [],
        viability: '0',
        statusP: '0',
        ccDate: format((new Date()), "yyyy/MM/dd"),
    }

    //OK
    async getProjectList(action) {
        if (action == 0) {
            const response = await api.get("/api/getprojectlist");
            this.setState({
                projectList: response.data
            });
        } else if (action == 1 || action == null) {
            action = 2;
            const response = await api.get("/api/filterProjectList", {
                params: {
                    viability: this.state.viability,
                    statusP: this.state.statusP,
                    startDate: this.state.startDate
                }
            });
            this.setState({
                projectList: response.data
            });
        }
    }

    //OK
    async updateStatusProjectButton(id, statusP) {
        const response = await api.put("/api/updatestatusproject", {
            id: id,
            statusP: statusP,
            ccDate: this.state.ccDate,
        })
    }

    //FALTA TERMINAR
    async redirectToUpdatePage(id) {

    }

    componentDidMount() {
        this.getProjectList(0);
    }

    componentDidUpdate() {
        this.getProjectList(2);
    }

    render() {

        const { projectList } = this.state;
        const { viability } = this.state;
        const { statusP } = this.state;
        const { startDate } = this.state;
        const { ccDate } = this.state;

        const registerButton = () => {
            window.location.href = "http://localhost:3000/registerproject";
        };

        const itemsViability = [
            { value: '0', label: 'Todos' },
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
        ];
        const itemsStatus = [
            { value: '0', label: 'Todos' },
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

        return (
            <div>

                <ul className="form">
                    <h1>Página Inicial</h1>

                    <Button variant="contained" onClick={registerButton}>
                        Cadastrar novo Projeto
                     </Button>
                    <ul>
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
                    </ul>
                    <ul>
                        <Button variant="contained" onClick={() => this.getProjectList(1)}>
                            Filtrar
                </Button>
                        <Button variant="contained" onClick={() => this.getProjectList(0)}>
                            Limpar Filtro
                </Button>
                    </ul>
                </ul>

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right"> Nome do Responsável</TableCell>
                                <TableCell align="right">Descrição</TableCell>
                                <TableCell align="right">Viabilidade</TableCell>
                                <TableCell align="right">Situação</TableCell>
                                <TableCell align="right">Data de Início</TableCell>
                                <TableCell align="right">Previsão de Término</TableCell>
                                <TableCell align="right">Data de Registro</TableCell>
                                <TableCell align="right">Data de Conclusão/Cancelamento</TableCell>
                                <TableCell align="center">Ações</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projectList.map((project) => (
                                <TableRow style={{ backgroundColor: project.viability == 5 ? '#ddd' : '' }} key={project.id}>
                                    <TableCell align="right">{project.nameOwner}</TableCell>
                                    <TableCell align="right">{project.description}</TableCell>
                                    <TableCell align="right">{project.viability}</TableCell>
                                    <TableCell align="left">
                                        {project.statusP == 1 ? 'Planejado' : '' ||
                                            project.statusP == 2 ? 'Em Desenvolvimento' : '' ||
                                                project.statusP == 3 ? 'Cancelado' : '' ||
                                                    project.statusP == 4 ? 'Concluído' : ''
                                        }
                                    </TableCell>
                                    <TableCell align="right">
                                        {format(parseISO(project.startDate), 'dd/MM/yyyy', { locale: pt })}
                                    </TableCell>
                                    <TableCell align="right">
                                        {format(parseISO(project.endDate), 'dd/MM/yyyy', { locale: pt })}
                                    </TableCell>
                                    <TableCell align="right">
                                        {project.registerDate != null ? format(parseISO(project.registerDate), 'dd/MM/yyyy', { locale: pt }) : ''}
                                    </TableCell>
                                    <TableCell align="right">
                                        {project.ccDate != null ? format(parseISO(project.ccDate), 'dd/MM/yyyy', { locale: pt }) : ''}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button disabled={project.statusP >= 3} onClick={() => this.redirectToUpdatePage(project.id)}>
                                            <EditIcon />
                                        </Button >
                                        <Button disabled={project.statusP >= 3} onClick={() => this.updateStatusProjectButton(project.id, 4)}>
                                            <DoneAllIcon />
                                        </Button>
                                        <Button disabled={project.statusP >= 3} onClick={() => this.updateStatusProjectButton(project.id, 3)}>
                                            <CancelIcon />
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

}

export default Page;