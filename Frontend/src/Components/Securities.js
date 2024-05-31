import { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {
   MDBBtn,
   MDBModal,
   MDBModalDialog,
   MDBModalContent,
   MDBModalHeader,
   MDBModalTitle,
   MDBModalBody,
   MDBModalFooter,
} from 'mdb-react-ui-kit';

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
      <MDBModal open>
         <MDBModalDialog>
            <MDBModalContent>
               <MDBModalHeader>
                  <MDBModalTitle>Securities for: {deal.Deal_Name}</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={() => setModalOpen(false)}></MDBBtn>
               </MDBModalHeader>
               <MDBModalBody>
                  <MDBTable>
                     <MDBTableHead>
                        <tr>
                           <th>Security</th>
                           <th>Investment Type</th>
                           <th>Currency</th>
                        </tr>
                     </MDBTableHead>
                     <MDBTableBody>
                        {securities.map((s, index) => (
                           <tr key={index}>
                              <td>{s.Security_Name}</td>
                              <td>{s.Investment_Type}</td>
                              <td>{s.Currency}</td>
                           </tr>))}
                     </MDBTableBody>
                  </MDBTable>
               </MDBModalBody>
               <MDBModalFooter>
                  <MDBBtn color='secondary' onClick={() => setModalOpen(false)}>Close</MDBBtn>
               </MDBModalFooter>
            </MDBModalContent>
         </MDBModalDialog>
      </MDBModal>
   );
}
