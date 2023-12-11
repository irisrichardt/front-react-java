function Tabela({ elementos, titulo, colunas }) {
  return (
    <>
    {titulo && <h2 className="text-secondary mb-3">{titulo}</h2>}
    <div className="container border rounded shadow-sm collapse1">
      <table className='table table-hover text-secondary'>
        <thead>
          <tr>
            <th scope="col">Índice</th>
            {colunas.map((coluna, index) => (
              <th key={index} scope="col" className={`th-ws ${coluna.classes || ''}`}>{coluna.nome}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {elementos.map((obj, indice) => (
            <tr key={indice}>
               <th scope="col" className="align-middle text-center">{indice + 1}</th>
              {colunas.map((coluna, colIndex) => (
                <td key={colIndex} className={`align-middle ${coluna.classes || ''}`}>{obj[coluna.propriedade]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Tabela;
