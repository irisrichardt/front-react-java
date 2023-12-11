import React from 'react';

function Formulario({ botao, eventoTeclado, transferir, obj, cancelar, listaDeUsuarios, listaDePilas }) {
  return (
    <div className="container mt-4 mb-4">
    <form className="mt-4 mb-4 text-secondary">
      <div className="form-group mb-3 bg-light rounded">
        <label htmlFor="idUsuarioDestino">Selecionar usuário:</label>
        <select
          type="text"
          value={obj.idUsuarioDestino}
          onChange={eventoTeclado}
          name="idUsuarioDestino"
          className="form-control"
        >
          <option value="">Selecione um usuário</option>
          {listaDeUsuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="noncePila">Selecionar pila:</label>
        <select
          type="text"
          value={obj.noncePila}
          onChange={eventoTeclado}
          name="noncePila"
          className="form-control"
        >
          <option value="">Selecione um pila</option>
          {listaDePilas.map((pila) => (
            <option key={pila.dataCriacao} value={pila.nonce}>
              {pila.nonce}
            </option>
          ))}
        </select>
      </div>

      {botao ? (
        <input type="submit" value="Transferir" onClick={transferir} className="btn btn-primary" />
      ) : (
        <div>
          <input type="submit" value="Cancelar" className="btn btn-warning mr-2" />
          <input
            type="button"
            onClick={cancelar}
            value="Cancelar"
            className="btn btn-secondary"
          />
        </div>
      )}
    </form>
    </div>
  );
}

export default Formulario;
