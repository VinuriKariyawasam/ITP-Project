import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

function CAM_consultancy(){
    return(
        <>
        <Accordion defaultActiveKey="0">
         <Accordion.Item eventKey="0">
           <Accordion.Header>@UserName1010</Accordion.Header>
           <Accordion.Body>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
             minim veniam, quis nostrud exercitation ullamco laboris nisi ut
             aliquip ex ea commodo consequat. Duis aute irure dolor in
             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
             culpa qui officia deserunt mollit anim id est laborum.
           </Accordion.Body>
         </Accordion.Item>
         </Accordion>
         </>
    );

}

export default CAM_consultancy;