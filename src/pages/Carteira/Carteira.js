import { useEffect, useState } from 'react';

import Navbar from '../../components/Navbar'
import Formulario from '../../components/Formulario';

const Carteira = () => {

  const pila = {
    idUsuarioDestino: '',
    noncePila: ''
  }

  const aoDigitar = (e) => {
    setObjPila({...objPila, [e.target.name]:e.target.value})
  }

  const [btnTransferir, setBtnTransferir] = useState(true);
  const [objPila, setObjPila] = useState(pila);
  const [listaDeUsuarios, setListaDeUsuarios] = useState([]);
  const [listaDePilas, setListaDePilas] = useState([]);
  const [alerta, setAlerta] = useState(null);

   useEffect(() => {
    fetch("http://localhost:8080/pilacoin/usuarios")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setListaDeUsuarios(retorno_convertido))
    .catch(error => {
      console.log('Erro ao conectar com a API. Verifique se a API está rodando.');
      console.error('Erro ao conectar com a API:', error)
    })
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/pilacoin/meuspilas")
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      const pilasComStatusValido = retorno_convertido.filter(pila => pila.status === 'VALIDO');
      setListaDePilas(pilasComStatusValido);
    })
    .catch(error => {
      console.log('Erro ao conectar com a API. Verifique se a API está rodando.');
      console.error('Erro ao conectar com a API:', error)
    })
  }, []);

  const transferir = () => {
    fetch('http://localhost:8080/pilacoin/transferir', {
      method: 'post',
      body: JSON.stringify(objPila),
      headers: {
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined) {
        console.log(retorno_convertido.mensagem);
        exibirAlerta('Pila transferido com sucesso!', 'success');
      } else {
        setListaDePilas([...listaDePilas, retorno_convertido]);
        limparFormulario();
        console.log('Transferência realizada com sucesso!', retorno_convertido);
      }
    })
    .catch(error => {
      console.error('Erro ao conectar com a API:', error);
    });
  }

  const limparFormulario = () => {
    setObjPila(pila);
    setBtnTransferir(true);
  }

  const exibirAlerta = (mensagem, variante) => {
    setAlerta({ mensagem, variante });
    setTimeout(() => {
      setAlerta(null);
    }, 4000);
  };


  const cancelar = () => {
    // Lógica para lidar com o cancelamento
    console.log('Cancelando');
  };

  return (
    <>
      <Navbar />
      {alerta && (
        <div className={`alert alert-${alerta.variante} alert-dismissible fade show`} role="alert" >
          {alerta.mensagem}
          <button type="button" className="btn btn-close btn-sm" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlerta(null)}></button>
        </div>
      )}
      <div className="container mt-4 mb-4">
        <div className="bg-light p-3 rounded">
          <div className="saldo-info">
            <h3>Saldo de pilas válidos:</h3>
            <p>{listaDePilas.length}</p>
            </div>
          </div>
      </div>
      <hr className="hr mb-4" />
      <div className="container mt-4 mb-4">
        <div className="bg-light p-3 rounded">
          <Formulario
            botao={btnTransferir}
            eventoTeclado={aoDigitar}
            transferir={transferir}
            obj={objPila}
            cancelar={cancelar}
            listaDeUsuarios={listaDeUsuarios}
            listaDePilas={listaDePilas}
          />
        </div>
      </div>
      <hr className="hr mb-4" />
    </>
  )
}

export default Carteira
