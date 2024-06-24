function TableHead({ headers }) {
  return (
    <div className="grid-head">
      {headers.map((key) => (
        <div className="grid-header-cell" key={key}>{key}</div>
      ))}
    </div>
  );
}
export default TableHead;
