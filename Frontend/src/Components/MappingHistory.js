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

export default function MappingHistory({ mapping, setModalOpen, setPageMsg }) {

   const [history, setHistory] = useState([]);
   const [gotHistory, setGotHistory] = useState(false);

   const historyURL = "http://localhost:8000/fundHistory/" + mapping.ACDB_Deal_ID + "/" + mapping.Fund_Name;

   useEffect(() => {
      console.log("MappingHistory.js: useEffect entered.");
      if (!gotHistory) {
         console.log("MappingHistory.js: useEffect Getting mappings history.");
         const config = {
            headers: {
               'content-type': 'application/json'
            },
         }
         axios.get(historyURL, config)
            .then(response => {
               const DBhistory = JSON.parse(response.data.HISTORY_LIST);
               setGotHistory(true);
               setHistory(DBhistory);
               setModalOpen(true);
            })
            .catch(error => {
               setGotHistory(false);
               setHistory([]);
               setModalOpen(false);
               const errMsg = "MappingHistory.js: Error getting mapping history from DB: " + error.message;
               console.log(errMsg);
               setPageMsg(errMsg);
            });
      }
   });

   return (
      <MDBModal open>
         <MDBModalDialog size='fullscreen'>
            <MDBModalContent>
               <MDBModalHeader>
                  <MDBModalTitle>History for Fund: {mapping.Fund_Name} || Deal: {mapping.ACDB_Deal_ID}</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={() => setModalOpen(false)}></MDBBtn>
               </MDBModalHeader>
               <MDBModalBody>
                  <MDBTable>
                     <MDBTableHead>
                        <tr>
                           <th>As of Date</th>
                           <th>Realized Date</th>
                           <th>Realized PnL</th>
                           <th>Realized IRR</th>
                           <th>Realized MOIC</th>
                           <th>Commitment Local</th>
                           <th>Commitment USD</th>
                           <th>Legal Commitment Local</th>
                           <th>Legal Commitment USD</th>
                           <th>ITD PM Adjustment USD</th>
                           <th>IC Discretionary Unfunded USD</th>
                        </tr>
                     </MDBTableHead>
                     <MDBTableBody>
                        {history.map((f, index) => (
                           <tr key={index}>
                              <td>{f.As_Of_Date}</td>
                              <td>{f.Realized_Date === 'None' ? '' : f.Realized_Date}</td>
                              <td>{f.Realized_PnL === 'None' ? '' : f.Realized_PnL}</td>
                              <td>{f.Realized_IRR === 'None' ? '' : f.Realized_IRR}</td>
                              <td>{f.Realized_MOIC === 'None' ? '' : f.Realized_MOIC}</td>
                              <td>{f.Commitment_Local === 'None' ? '' : f.Commitment_Local}</td>
                              <td>{f.Commitment_USD === 'None' ? '' : f.Commitment_USD}</td>
                              <td>{f.Legal_Commitment_Local === 'None' ? '' : f.Legal_Commitment_Local}</td>
                              <td>{f.Legal_Commitment_USD === 'None' ? '' : f.Legal_Commitment_USD}</td>
                              <td>{f.ITD_PM_Adjustment_USD === 'None' ? '' : f.ITD_PM_Adjustment_USD}</td>
                              <td>{f.IC_Discretionary_Unfunded_USD === 'None' ? '' : f.IC_Discretionary_Unfunded_USD}</td>
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
