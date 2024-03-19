import React from 'react';

import PageTitle from './PageTitle';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function Incomes() {
  return (
    <main id="main" className="main">
      <PageTitle title="Finance / Incomes" />
      
      <div>
        <Button variant="primary">Add Income</Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>serviceInvoiceId</th>
              <th>amount</th>
              <th>type</th>
              <th>date</th>
              <th>time</th>
              <th>status</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Oil Change</td>
              <td>SI001</td>
              <td>Rs.100</td>
              <td>Expense</td>
              <td>2024-03-12</td>
              <td>10:00 AM</td>
              <td>Pending</td>
              <td> </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Brake Replacement</td>
              <td>SI002</td>
              <td>Rs.200</td>
              <td>Expense</td>
              <td>2024-03-13</td>
              <td>11:30 AM</td>
              <td>Approved</td>
              <td> </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Engine Repair</td>
              <td>SI003</td>
              <td>Rs500</td>
              <td>Income</td>
              <td>2024-03-14</td>
              <td>09:45 AM</td>
              <td>Received</td>
              <td> </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </main>
  );
}

export default Incomes;
