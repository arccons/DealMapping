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

function History({ fund, setModalOpen, setPageMsg }) {

   const [history, setHistory] = useState([]);
   const [gotHistory, setGotHistory] = useState(false);

   //const [modalOpen, setModalOpen] = useState(false);
   //const toggleOpen = () => setModalOpen(!basicModal);

   const historyURL = "http://localhost:8000/fundHistory/" + fund.deal_id + "/" + fund.fund_id + "/" + fund.as_of_date;

   useEffect(() => {
      console.log("History.js: useEffect entered.");
      if (!gotHistory) {
         console.log("useEffect: Getting history list.");
         const config = {
            headers: {
               'content-type': 'application/json'
            },
         }
         axios.get(historyURL, config)
            .then(response => {
               const DBhist = JSON.parse(response.data.HISTORY_LIST);
               setHistory(DBhist);
               setGotHistory(true);
            })
            .catch(error => {
               setGotHistory(false);
               setHistory([]);
               setModalOpen(false);
               const errMsg = "Error getting fund history from DB: " + error.message;
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
                  <MDBModalTitle>History for: {fund.fund_name}</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={() => setModalOpen(false)}></MDBBtn>
               </MDBModalHeader>
               <MDBModalBody>
                  <MDBTable>
                     <MDBTableHead><tr><th>Fund</th><th>As of Date</th></tr></MDBTableHead>
                     <MDBTableBody>
                        {history.map((h, index) => (<tr key={index}><td>{h.fund_name}</td><td>{h.as_of_date}</td></tr>))}
                     </MDBTableBody>
                  </MDBTable>
               </MDBModalBody>
               <MDBModalFooter><MDBBtn color='secondary' onClick={() => setModalOpen(false)}>Close</MDBBtn></MDBModalFooter>
            </MDBModalContent>
         </MDBModalDialog>
      </MDBModal>
   );
}

export default History;
