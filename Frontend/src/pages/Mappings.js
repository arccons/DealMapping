import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MappingHistory from '../Components/MappingHistory';
import AddMapping from '../Components/AddMapping';
import { Button, Table } from 'react-bootstrap';

export default function Mappings({ DBdeal, DBfund }) {

  const [mappings, setMappings] = useState([]);
  const [gotMappings, setGotMappings] = useState(false);

  const [currentMapping, setCurrentMapping] = useState();
  const [showHistory, setShowHistory] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [pageMsg, setPageMsg] = useState("");

  const navigate = useNavigate();
  const mappingsURL = "http://localhost:8000/fundMapping/" + DBdeal.ACDB_Deal_ID + "/" + DBfund.Fund_Name;

  useEffect(() => {
    console.log("Mappings.js: useEffect entered.");
    if (!gotMappings) {
      console.log("Mappings.js: useEffect getting Funds list.");
      console.log(DBdeal);
      console.log(DBfund);
      const config = {
        headers: {
          'content-type': 'application/json'
        },
      }
      axios.get(mappingsURL, config)
        .then(response => {
          const DBmappings = JSON.parse(response.data.MAPPING_LIST);
          setMappings(DBmappings);
          setGotMappings(true);
          console.log(DBmappings);
          setPageMsg("Got mappings list from DB for deal: " + DBdeal.Deal_Name + " AND Fund: " + DBfund.Fund_Name);
        })
        .catch(error => {
          setPageMsg("Error getting mappings list: " + error);
          setGotMappings(false);
        });
    }
  })

  function handleHistoryClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    const mp = mappings[selectedIndex];
    setCurrentMapping(mp);
    console.log(currentMapping);
    setShowHistory(true);
  }

  return (
    <div className="App">
      <center>
        <p>Mappings: <b>{DBdeal.Deal_Name}</b> || <b>{DBfund.Fund_Name}</b> </p>
        <Table striped hover bordered align="middle" responsive>
          <thead>
            <tr align="center">
              <th>Deal Name</th>
              <th>Deal Name EntityCode</th>
              <th>ACDB_Deal_ID</th>
              <th>Fund Name</th>
              <th>Active/Realized</th>
              <th>Show History</th>
            </tr>
          </thead>
          <tbody>
            {mappings.map((f, index) => (
              <tr key={index} align="center">
                <td>{f.Deal_Name}</td>
                <td>{f.Deal_Name_EntityCode}</td>
                <td>{f.ACDB_Deal_ID}</td>
                <td>{f.Fund_Name}</td>
                <td>{f.Active_Realized}</td>
                <td><Button variant='info' value={index} onClick={handleHistoryClick}>History</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        {!showAddForm &&
          <Button variant='link' size='md' onClick={() => setShowAddForm(true)}>
            Add Mapping
          </Button>}
        <br></br>
        {!showAddForm && <Button onClick={() => navigate("/funds")}>Done</Button>}
        {showAddForm && <AddMapping DBdeal={DBdeal} DBfund={DBfund} setShowAddForm={setShowAddForm} setPageMsg={setPageMsg} />}
        <br></br>
        {pageMsg}
      </center>
      {showHistory && <MappingHistory mapping={currentMapping} setModalOpen={setShowHistory} setPageMsg={setPageMsg} />}
    </div>
  );
}
