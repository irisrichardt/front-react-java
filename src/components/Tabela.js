function Tabela({elementos, selecionar}) {
  return (
    <div className="container border rounded shadow-sm">
    <table className='table table-hover text-center text-secondary'>
      <thead>
        <tr>
          <th scope="col">Indice</th>
          <th scope="col">Código</th>
          <th scope="col">Nome</th>
          <th scope="col">Marca</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        {
          elementos.map((obj, indice) => (
            <tr key={indice}>
              <th scope="col">{indice+1}</th>
              <td>{obj.codigo}</td>
              <td>{obj.nome}</td>
              <td>{obj.marca}</td>
              <td><button onClick={() => {selecionar(indice)}} className='btn btn-success'>Selecionar</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
    </div>
  )
}

export default Tabela;
