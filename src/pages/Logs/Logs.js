import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Tabela from '../../components/Tabela';

const Logs = () => {

  const colunasMeusPilas = [
    { nome: 'Nome do criador', propriedade: 'nomeCriador', classes: 'text-center' },
    { nome: 'Status', propriedade: 'status', classes: 'text-center' },
    { nome: 'Data criação', propriedade: 'dataCriacao', classes: 'text-center' },
    { nome: 'Nonce', propriedade: 'nonce' },
    { nome: 'Chave do criador', propriedade: 'chaveCriador' },
    { nome: 'Transferido', propriedade: 'transferido' },
  ];

  const colunasLogs = [
    { nome: 'Id', propriedade: 'id', classes: 'text-center' },
    { nome: 'Tipo', propriedade: 'tipo', classes: 'text-center' },
    { nome: 'Status', propriedade: 'status', classes: 'text-center' },
    { nome: 'Data criação', propriedade: 'dataCriacao', classes: 'text-center' },
    { nome: 'Conteúdo', propriedade: 'conteudo' },
  ];

  const [pilas, setPilas] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/pilacoin/meuspilas")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setPilas(retorno_convertido))
    .catch(error => {
      console.log('Erro ao conectar com a API. Verifique se a API está rodando.');
      console.error('Erro ao conectar com a API:', error)
    })
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/pilacoin/logs")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setLogs(retorno_convertido))
    .catch(error => {
      console.log('Erro ao conectar com a API. Verifique se a API está rodando.');
      console.error('Erro ao conectar com a API:', error)
    })
  }, []);

   return (
    <>
      <Navbar />
      <div className="container mt-4 mb-4">
        <div className="bg-light p-3 rounded">
          <Tabela elementos={pilas} colunas={colunasMeusPilas} titulo={'Logs dos pilas'} />
        </div>
      </div>
      <hr className="hr mb-4" />
      <div className="container mt-4">
        <div className="bg-light p-3 rounded">
          <Tabela elementos={logs} colunas={colunasLogs} titulo={'Logs do sistema'} />
        </div>
      </div>
      <hr className="hr" />
    </>
  )
}

export default Logs
