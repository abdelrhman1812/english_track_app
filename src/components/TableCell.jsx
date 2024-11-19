const TableCell = ({ title, className = "" }) => {
  return (
    <div className={`${className} table-cell`}>
      <h6>{title}</h6>
    </div>
  );
};

export default TableCell;
