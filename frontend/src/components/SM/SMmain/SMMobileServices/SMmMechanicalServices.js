import React from "react";
import '../SMMobileServices/SMmMechanicalServices'



const SMmMechanicalServices = props => {

  
    return (
      <main id="main" className="main">
        <div>

            <h2 className="pHeading">Mobile Mechanical Service Requests</h2>
            <div className="ptable">
                <table className='table table-bordered'>
                    <thead>
                        <tr>

                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Vehicle No</th>
                            <th>Request Date</th>
                            <th>Request Time</th>
                            <th>Location</th>
                            <th>Issue</th>
                            <th>Contact No</th>



                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            {
                                
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        
                        
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        </main>

    )
}
export default SMmMechanicalServices;


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