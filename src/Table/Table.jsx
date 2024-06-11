import TableHead from './TableHead';
import TableBody from './TableBody';

function Table({ itens, onEdit, onDelete }) {
  const headers = itens && itens.length > 0 ? Object.keys(itens[0]) : [];
  console.log(headers);
  return (
    <div className="container">
      <table className="table">
        <TableHead headers={headers} />
        <TableBody
          values={itens}
          headers={headers}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </table>
    </div>
  );
}
export default Table;
