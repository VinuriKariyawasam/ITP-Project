import React,{useState, useEffect} from 'react';
import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
//import { useParams } from 'react-router-dom';

function AllReplies(){

const [replies,setReplies] = useState([]);

//const UserReplies = () =>{
   // const {isLoading, error,sendRequest,clearError} = useHttpClient();

    //const userId = useParams().userId;


useEffect(()=>{
    function getReplies(){
        axios.get("http://localhost:5000/consultancy/").then((res)=>{
        setReplies(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
    getReplies();
    /*const fetchReplies = async () =>{
        const responseData = await sendRequest("http://localhost:5000/consultancy/get/${userId}");
        setReplies(responseData.replies);
    };
    fetchReplies();*/
},[])

    return(
      <div>
      <h3>Technician Reply</h3>
      <Accordion defaultActiveKey="0">
        {replies.map((reply, index) => (
           
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>{`@${reply.userName}`}</Accordion.Header>
            <Accordion.Body>
              {reply.content}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <FloatingLabel controlId="floatingTextarea2" label="Reply">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          onChange = {(e)=>{
            setReplies(e.target.value);
          }}
        />
      </FloatingLabel>
      <br />
    </div>
    );

}

export default AllReplies;