import { useEffect, useState } from 'react';

import './App.css';
import Formulario from './components/Formulario';
import Tabela from './components/Tabela';
import Navbar from './components/Navbar';

function App() {

  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido))
    .catch(error => {
      exibirAlerta('Erro ao conectar com a API. Verifique se a API está rodando.', 'danger');
      console.error('Erro ao conectar com a API:', error)
    })
  }, []);

  // Obtendo dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value})
  }

  // Cadastrando um novo produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined) {
        exibirAlerta(retorno_convertido.mensagem, 'danger')
      } else {
        setProdutos([...produtos, retorno_convertido]);
        limparFormulario();
        exibirAlerta('Produto cadastrado com sucesso!', 'success');
      }
    })
    .catch(error => {
      exibirAlerta('Erro ao conectar com a API. Verifique se a API está rodando.', 'danger');
      console.error('Erro ao conectar com a API:', error)
    })
  }

  // Removendo um novo produto
  const remover = () => {
    fetch('http://localhost:8080/remover/'+objProduto.codigo, {
      method: 'delete',
      headers: {
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      // Faz uma copia do vetor produtos
      let vetorTemp = [...produtos];

      // Encontra o indice
      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo;
      });

      // Remove do vetorTemp
      vetorTemp.splice(indice, 1);

      // Atualiza vetor de produtos
      setProdutos(vetorTemp);

      limparFormulario();
      exibirAlerta(retorno_convertido.mensagem, 'success')
    })
  }

  // Alterando um produto
  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method: 'put',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined) {
        exibirAlerta(retorno_convertido.mensagem, 'danger')
      } else {
        let vetorTemp = [...produtos];
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });
        vetorTemp[indice] = objProduto;
        setProdutos(vetorTemp);

        limparFormulario();
        exibirAlerta('Produto alterado com sucesso!', 'success');
      }
    })
    .catch(error => {
      exibirAlerta('Erro ao conectar com a API. Verifique se a API está rodando.', 'danger');
      console.error('Erro ao conectar com a API:', error)
    })
  }

  // Limpando formulário
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  // Selecionando um produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  const exibirAlerta = (mensagem, variante) => {
    setAlerta({ mensagem, variante });

    setTimeout(() => {
      setAlerta(null);
    }, 4000);
  };

  return (
    <div>
      <Navbar/>

      {alerta && (
        <div className={`alert alert-${alerta.variante} alert-dismissible fade show`} role="alert" >
          {alerta.mensagem}
          <button type="button" className="btn btn-close btn-sm" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlerta(null)}></button>
        </div>
      )}

      <Formulario
        botao={btnCadastrar}
        eventoTeclado={aoDigitar}
        cadastrar={cadastrar}
        obj={objProduto}
        cancelar={limparFormulario}
        remover={() => {
          remover();
          exibirAlerta('Produto removido com sucesso!', 'danger');
        }}
        alterar={alterar}
      />
      <Tabela elementos={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
