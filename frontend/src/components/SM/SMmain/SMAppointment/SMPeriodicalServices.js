import React from "react";



const SMPeriodicalServices = props => {
    return (
        <div>

            <h2 className="pHeading">Periodical Services</h2>
            <div className="ptable">
                <table className='table table-bordered'>
                    <thead>
                        <tr>

                            <th>Vehicle No</th>
                            <th>Customer Name</th>
                            <th>Date and Time</th>
                            <th>Contact No</th>
                            <th>Description</th>



                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            {
                                
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {

                            <tr>
                                
                            </tr>

                        }
                    </tbody>
                </table>
            </div>

        </div>

    )
}
export default SMPeriodicalServices;


/*const TableComponent = ({
  data
}) => {
  let headings = Object.keys(data[1]);
  return (
    <table className='table table-bordered'>
      <thead>
        <tr>
          {
            headings.map(heading => <th>{heading}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
            data.map(item => 
              <tr>
               {
                  headings.map(heading => <td>{item[heading]}</td>) 
               }
              </tr>
            )
        }
      </tbody>
    </table>
  );
}

const data = [{
  name: 'Marcel',
  surname: 'Michau',
  age: '24',
  gender: 'Male'
}, {
  name: 'Joe',
  surname: 'Bloggs',
  age: '27',
  gender: 'Male'
}, {
  name: 'Jane',
  surname: 'Doe',
  age: '22',
  gender: 'Female'
}];

const data2 = [{
  something: 'Marcel',
  somethingElse: 'Michau',
  yetAnotherThing: '24',
  andAnother: 'Male',
  moarStuff: 'bla bla'
}, {
  something: 'Marcel',
  somethingElse: 'Michau',
  yetAnotherThing: '24',
  andAnother: 'Male',
  moarStuff: 'bla bla'
}, {
  something: 'Marcel',
  somethingElse: 'Michau',
  yetAnotherThing: '24',
  andAnother: 'Male',
  moarStuff: 'bla bla'
}];

ReactDOM.render(<TableComponent data={data}/>, document.getElementById('app'));
*/