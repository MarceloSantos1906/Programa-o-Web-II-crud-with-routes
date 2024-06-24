function TableBody({ values = [], onEdit, onDelete }) {
  if (!Array.isArray(values) || values.length === 0) {
    return <div>No items to display</div>;
  }

  return (
    <div className="grid-body">
      {values.map((item) => (
        <div className="grid-item" key={item.id}>
          <img src={item.image_url} alt={item.name} className="item-image" />
          <div className="item-info">
            <h3>{item.name}</h3>
            <p>Genre: {item.genre.name}</p>
            <p>Authors: {item.authors.map(author => author.name).join(', ')}</p>
          </div>
          <div className="item-actions">
            <button onClick={() => onEdit(item.id)}>Edit</button>
            <button onClick={() => onDelete(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default TableBody;
