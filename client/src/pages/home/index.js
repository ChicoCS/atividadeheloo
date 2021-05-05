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
import makeStyles from '@material-ui/core/styles';
import DataGrid from '@material-ui/data-grid';
import format from 'date-fns';
import pt from 'date-fns/locale/pt';

class Page extends Component {

    state = {
        projectList: [],
        viability: '1',
        status: '1',
    }

    async getProjectList() {
        const response = await api.get("/api/get");
        this.setState({
            projectList: response.data.map((resp) => (
                console.log(resp), {
                    //EXEMPLO
                    ...resp,
                }))
        });
    }

    async getProjectById(id) {
        const response = await api.get("/api/getid", {
            params: {
                id: this.setState
            }
        })
    }

    async updateStatusProjectButton(id, status) {
        const response = await api.put("/api/updatestatus", {
            id: id,
            status: status,
        })
        this.getProjectList();
    }


    componentDidMount() {
        this.getProjectList();
    }

    componentDidUpdate() {
        this.getProjectList();
    }

    render() {



        const { projectList } = this.state;
        const { viability } = this.state;
        const { status } = this.state;

        const registerButton = () => {
            window.location.href = "http://localhost:3000/registerproject";
        };

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



        return (
            <div>
                <h1>Página Inicial</h1>

                <Button variant="contained" onClick={registerButton}>
                    Cadastrar novo Projeto
                </Button>

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

                <Button variant="contained" onClick={registerButton}>
                    Filtrar
                </Button>


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
                                    <TableCell align="right">{project.status}</TableCell>
                                    <TableCell align="right">{project.startDate}</TableCell>
                                    <TableCell align="right">{project.endDate}</TableCell>
                                    <TableCell align="right">{project.ccDate}</TableCell>
                                    <TableCell align="center">
                                        <Button disabled={project.status >= 3}>
                                            <EditIcon />
                                        </Button >
                                        <Button disabled={project.status >= 3} onClick={() => this.updateStatusProjectButton(project.id, 4)}>
                                            <DoneAllIcon />
                                        </Button>
                                        <Button disabled={project.status >= 3} onClick={() => this.updateStatusProjectButton(project.id, 3)}>
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