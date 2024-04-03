import React from "react";
import { Button } from "react-bootstrap";

function Table({ columns, data }) {
  return (
    <table className="table table-rounded">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
            
            <td>
              <Button variant="dark" className="d-flex mx-auto">
                More
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;