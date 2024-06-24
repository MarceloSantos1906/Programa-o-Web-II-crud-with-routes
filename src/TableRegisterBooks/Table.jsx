import TableBody from './TableBody';

function Table({ items = [], onEdit, onDelete }) {
  return (
    <div className="container">
      <div className="grid-container">
        <TableBody
          values={items}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
export default Table;
