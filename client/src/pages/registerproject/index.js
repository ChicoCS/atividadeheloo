import React, { useState } from "react";
import Axios from 'axios';
import "./styles.css";


const Page = () => {

    const [nameOwner, setNameOwner] = useState("");
    const [description, setDescription] = useState("");
    const [viability, setViability] = useState("");
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    //const [projectList, setProjectList] = useState([]);

    /* useEffect(() => {
         Axios.get("http://localhost:3001/api/get").then((response) => {
             setProjectList(response.data);
         })
     }, []);*/

    const submitData = () => {
        Axios.post("http://localhost:3001/api/insert", {
            nameOwner: nameOwner,
            description: description,
            viability: viability,
            startDate: startDate,
            endDate: endDate,
            status: status,
        }).then(() => {
            alert("Cadastrado com Sucesso");
        })

    };


    return <div className="title">
        <h1>Cadastro de Projetos</h1>

        <div className="form">
            <label htmlFor="nameOwner">Nome do Responsável: </label>
            <input
                type="text"
                id="nameOwner"
                name="nameOwner"
                onChange={(e) => {
                    setNameOwner(e.target.value);
                }} />

            <label htmlFor="nameOwner">Descrição do Projeto: </label>
            <input
                type="text"
                id="description"
                name="description"
                onChange={(e) => {
                    setDescription(e.target.value);
                }} />

            <label htmlFor="viability">Viabilidade entre 1 e 5 (1= menos viável / 5=mais viável)</label>
            <input
                type="number"
                id="viability"
                name="viability"
                min="1" max="5"
                onChange={(e) => {
                    setViability(e.target.value);
                }} />


            <input type="radio" id="planned" name="status" value="1"
                onChange={(e) => {
                    setStatus(e.target.value);
                }} />
            <label htmlFor="planned">Planejado</label>
            <input type="radio" id="development" name="status" value="2"
                onChange={(e) => {
                    setStatus(e.target.value);
                }} />
            <label htmlFor="development">Em Desenvolvimento</label>
            <input type="radio" id="canceled" name="status" value="3"
                onChange={(e) => {
                    setStatus(e.target.value);
                }} />
            <label htmlFor="canceled">Cancelado</label>
            <input type="radio" id="finished" name="status" value="4"
                onChange={(e) => {
                    setStatus(e.target.value);
                }} />
            <label htmlFor="finished">Concluido</label>

            <label htmlFor="startDate">Data de início do Projeto</label>
            <input
                type="date"
                id="startDate"
                name="startDate"
                onChange={(e) => {
                    setStartDate(e.target.value);
                }} />

            <label htmlFor="endDate">Previsão de data final do Projeto</label>
            <input type="date"
                id="endDate"
                name="endDate"
                min="startDate"
                onChange={(e) => {
                    setEndDate(e.target.value);
                }} />

            <button onClick={submitData}>Cadastrar</button>

        </div >
    </div >
}

export default Page;