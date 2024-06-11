function TableBody({ values, headers, onEdit, onDelete }) {
  return (
    <tbody>
      {values.map((item, index) => {
        return (
          !!item && (
            <tr key={index}>
              {headers.map((h) => {
                return <td key={h}>{item[h]}</td>;
              })}
              <td>
                <button onClick={() => onEdit(item['id'])}>Editar</button>
                <button onClick={() => onDelete(item['id'])}>Excluir</button>
              </td>
            </tr>
          )
        );
      })}
    </tbody>
  );
}

export default TableBody;
