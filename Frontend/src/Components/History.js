import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Table } from 'react-bootstrap';

export default function History({ mapping, setModalOpen, setPageMsg }) {

   const [history, setHistory] = useState([]);
   const [gotHistory, setGotHistory] = useState(false);

   const historyURL = "http://localhost:8000/mappingHistory/" + mapping.ACDB_Deal_ID + "/" + mapping.Fund_Name;

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
               const DBhistory = JSON.parse(response.data.HISTORY);
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
      <Modal show backdrop="static" keyboard={false} fullscreen>
         <Modal.Dialog scrollable size='xl' onHide={() => setModalOpen(false)}>
            <Modal.Header closeButton onHide={() => setModalOpen(false)}>
               <Modal.Title>
                  <p>Deal: {mapping.Deal_Name} - Fund: {mapping.Fund_Name}</p>
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Table>
                  <thead>
                     <tr>
                        <th>As of Date</th>
                        <th>Realized Date</th>
                        <th>Realized PnL</th>
                        <th>Realized IRR</th>
                        <th>Realized MOIC</th>
                        <th>Blended FX Rate</th>
                        <th>Commitment Local</th>
                        <th>Legal Commitment Local</th>
                     </tr>
                  </thead>
                  <tbody>
                     {history.map((f, index) => (
                        <tr key={index}>
                           <td>{f.As_Of_Date}</td>
                           <td>{f.Realized_Date === 'None' ? '' : f.Realized_Date}</td>
                           <td>{f.Realized_PnL === 'None' ? '' : f.Realized_PnL}</td>
                           <td>{f.Realized_IRR === 'None' ? '' : f.Realized_IRR}</td>
                           <td>{f.Realized_MOIC === 'None' ? '' : f.Realized_MOIC}</td>
                           <td>{f.Blended_FX_Rate === 'None' ? '' : f.Blended_FX_Rate}</td>
                           <td>{f.Commitment_Local === 'None' ? '' : f.Commitment_Local}</td>
                           <td>{f.Legal_Commitment_Local === 'None' ? '' : f.Legal_Commitment_Local}</td>
                        </tr>))}
                  </tbody>
               </Table>
            </Modal.Body>
            <Modal.Footer><Button onClick={() => setModalOpen(false)}>Close</Button></Modal.Footer>
         </Modal.Dialog>
      </Modal>
   );
}
