import { useState, useEffect } from 'react';
import axios from 'axios';
import {
   Button,
   Modal,
   Table
} from 'react-bootstrap';

export default function Securities({ deal, setModalOpen, setPageMsg }) {

   const [securities, setSecurities] = useState([]);
   const [gotSecurities, setGotSecurities] = useState(false);

   const securitiesURL = "http://localhost:8000/dealSecurities/" + deal.ACDB_Deal_ID;

   useEffect(() => {
      console.log("Securities.js: useEffect entered.");
      if (!gotSecurities) {
         console.log("Securities.js: useEffect getting securities list.");
         const config = {
            headers: {
               'content-type': 'application/json'
            },
         }
         axios.get(securitiesURL, config)
            .then(response => {
               const DBsecs = JSON.parse(response.data.SECURITIES_LIST);
               setSecurities(DBsecs);
               setGotSecurities(true);
               setModalOpen(true);
            })
            .catch(error => {
               setGotSecurities(false);
               setSecurities([]);
               setModalOpen(false);
               const errMsg = "Securities.js: Error getting securities from DB: " + error.message;
               console.log(errMsg);
               setPageMsg(errMsg);
            });
      }
   });

   return (
      <Modal show>
         <Modal.Dialog>
            <Modal.Header>
               <Modal.Title>Securities for: {deal.Deal_Name}</Modal.Title>
               <Button className='btn-close' color='none' onClick={() => setModalOpen(false)}></Button>
            </Modal.Header>
            <Modal.Body>
               <Table>
                  <thead>
                     <tr>
                        <th>Security</th>
                        <th>Investment Type</th>
                        <th>Currency</th>
                     </tr>
                  </thead>
                  <tbody>
                     {securities.map((s, index) => (
                        <tr key={index}>
                           <td>{s.Security_Name}</td>
                           <td>{s.Investment_Type}</td>
                           <td>{s.Currency}</td>
                        </tr>))}
                  </tbody>
               </Table>
            </Modal.Body>
            <Modal.Footer>
               <Button color='secondary' onClick={() => setModalOpen(false)}>Close</Button>
            </Modal.Footer>
         </Modal.Dialog>
      </Modal>
   );
}
