import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MappingHistory from '../Components/MappingHistory';
import AddMapping from '../Components/AddMapping';
import { Button, Col, Row, Container } from 'react-bootstrap';

export default function Mappings({ DBdeal, DBfund }) {

  const [mapping, setMapping] = useState();
  const [gotMapping, setGotMapping] = useState(false);

  const [showHistory, setShowHistory] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [pageMsg, setPageMsg] = useState("");

  const navigate = useNavigate();
  const mappingURL = "http://localhost:8000/fundMapping/" + DBdeal.ACDB_Deal_ID + "/" + DBfund.Fund_Name;

  useEffect(() => {
    console.log("Mappings.js: useEffect entered.");
    if (!gotMapping) {
      console.log("Mappings.js: useEffect getting mapping.");
      const config = {
        headers: {
          'content-type': 'application/json'
        },
      }
      axios.get(mappingURL, config)
        .then(response => {
          const DBmappings = JSON.parse(response.data.MAPPING);
          setMapping(DBmappings[0]);
          setGotMapping(true);
          console.log(DBmappings[0]);
          setPageMsg("Got mapping from DB for deal: " + DBdeal.Deal_Name + " AND Fund: " + DBfund.Fund_Name);
        })
        .catch(error => {
          setPageMsg("Error getting mappings list: " + error);
          setGotMapping(false);
        });
    }
  }, [DBdeal, DBfund, mappingURL, gotMapping, pageMsg]);

  function handleHistoryClick(event) {
    event.preventDefault();
    setShowHistory(true);
  }

  return (
    <div className="App">
      <center>
        {gotMapping &&
          <Container className='displaySection'>
            <Row>
              <Col>Deal Name: <b>{mapping.Deal_Name}</b></Col>
              <Col>EntityCode: <b>{mapping.Deal_Name_EntityCode}</b></Col>
              <Col>ACDB_Deal_ID: <b>{mapping.ACDB_Deal_ID}</b></Col>
              <Col>Fund: <b>{mapping.Fund_Name}</b></Col>
              <Col>Active/Realized: <b>{mapping.Active_Realized}</b></Col>
              <Col><Button variant='info' size='sm' onClick={handleHistoryClick}>History</Button></Col>
            </Row>
          </Container>}
        {!showAddForm && <Button variant='link' size='md' onClick={() => setShowAddForm(true)}>Add Mapping</Button>}
        <br></br>
        {!showAddForm && <Button onClick={() => navigate("/funds")}>Done</Button>}
        {showAddForm && <AddMapping DBdeal={DBdeal} DBfund={DBfund} setShowAddForm={setShowAddForm} setPageMsg={setPageMsg} />}
        <br></br>
        {pageMsg}
      </center >
      {showHistory && <MappingHistory mapping={mapping} setModalOpen={setShowHistory} setPageMsg={setPageMsg} />}
    </div >
  );
}
