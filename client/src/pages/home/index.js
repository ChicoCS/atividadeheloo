import React, { useState, useEffect, Component } from "react";
import './styles.css';
import api from '../services/api'
import { DataGrid } from '@material-ui/data-grid';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Button } from '@material-ui/core';

class Page extends Component {

    state = {
        projectList: [],
    }


    async componentDidMount() {
        const response = await api.get("/api/get");
        this.setState({ projectList: response.data });
    }

    render() {
        const { projectList } = this.state;
        const columns = [
            { field: 'nameOwner', headerName: 'Nome do Responsável', width: 200 },
            { field: 'description', headerName: 'Descrição', width: 320 },
            { field: 'viability', headerName: 'Viabilidade', width: 150 },
            { field: 'status', headerName: 'Situação', width: 110 },
            { field: 'startDate', headerName: 'Data de Início', width: 145 },
            { field: 'endDate', headerName: 'Previsão de Término', width: 190 },
        ]

        const registerButton = () => {
            window.location.href = "http://localhost:3000/registerproject";
        };


        return (
            <div>
                <h1>Página Inicial</h1>
                <Button variant="contained" onClick={registerButton}>
                    Adicionar Novo Projeto
                </Button>


                <ul>
                    <div style={{ height: 500, width: '100%' }}>
                        <DataGrid rows={projectList} columns={columns} pageSize={10} />
                    </div>

                </ul>

            </div>
        );
    }



    updateRegisterButton = () => {

    }

    cancelProjectButton = () => {

    }

    completeProjectButton = () => {

    }
}

export default Page;