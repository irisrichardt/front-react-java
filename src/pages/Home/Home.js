import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

const Home = () => {
  const [miningStatus, setMiningStatus] = useState('Não iniciada');
  const [miningActive, setMiningActive] = useState(false);

  const handleToggleMining = async () => {
    try {
      const endpoint = miningActive ? 'parar' : 'iniciar';
      const response = await fetch(`http://localhost:8080/pilacoin/minerarpilacoin/${endpoint}`);
      console.log("Response: ", response)
      if (response.ok) {
        setMiningStatus(miningActive ? 'Parada' : 'Em andamento');
        setMiningActive(!miningActive); // Inverte o estado da mineração
        console.log(`Mineração ${miningActive ? 'parada' : 'iniciada'} com sucesso!`);
      } else {
        console.error('Erro na resposta da API:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao chamar a API:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="jumbotron">
          <h1 className="display-4">Bem-vindo ao projeto PilaCoin!</h1>
          <p className="lead">Projeto desenvolvido por Augusto e Íris.</p>
          <p className="lead">No botão abaixo você pode controlar a mineração dos pilas</p>

          <button
            className={`btn ${miningActive ? 'btn-danger' : 'btn-primary'}`}
            onClick={handleToggleMining}
          >
            {miningActive ? 'Parar mineração' : 'Iniciar mineração'}
          </button>

          <p className="lead"><strong>Status da mineração:</strong> {miningStatus}</p>
        </div>
      </div>
    </>
  );
};

export default Home;

