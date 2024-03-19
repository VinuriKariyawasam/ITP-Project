import React from 'react';
import PageTitle from './PageTitle';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Expenses = () => {
    return (
        <main id="main" className="main">
          <PageTitle title="Finance / Expenses" />
          
          <div>
            <Button variant="primary">Add Expense</Button>
    
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>title</th>
                  <th>amount</th>
                  <th>type</th>
                  <th>date</th>
                  <th>description</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Fuel</td>
                  <td>Rs.100</td>
                  <td>Expense</td>
                  <td>2024-03-12</td>
                  <td>Fuel for vehicles</td>
                  <td> </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Equipment Purchase</td>
                  <td>Rs.200</td>
                  <td>Expense</td>
                  <td>2024-03-13</td>
                  <td>Purchase of maintenance equipment</td>
                  <td> </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Stationery</td>
                  <td>Rs.50</td>
                  <td>Expense</td>
                  <td>2024-03-14</td>
                  <td>Office supplies and stationery</td>
                  <td> </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </main>
      );
}

export default Expenses;
