function TableHead({ headers }) {
  return (
    <thead>
      <tr>
        {headers.map((keys) => {
          return <th key={keys}>{keys}</th>;
        })}
      </tr>
    </thead>
  );
}

export default TableHead;
