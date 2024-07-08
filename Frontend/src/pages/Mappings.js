import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import History from '../Components/History';
import AddMapping from '../Components/AddMapping';
import { Button, Col, Row, Container } from 'react-bootstrap';

export default function Mappings({ DBdeal, DBfund }) {

  const [showHistory, setShowHistory] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [pageMsg, setPageMsg] = useState("");

  const navigate = useNavigate();
  const showAddLink = DBfund.Realized_Active === 'Realized' ? false : true;

  function handleHistoryClick(event) {
    event.preventDefault();
    setShowHistory(true);
  }

  return (
    <div className="App">
      <center>
        {<Container className='displaySection'>
          <Row>
            <Col>Deal Name: <b>{DBdeal.Deal_Name}</b></Col>
            <Col>EntityCode: <b>{DBdeal.Deal_Name_EntityCode}</b></Col>
            <Col>ACDB_Deal_ID: <b>{DBdeal.ACDB_Deal_ID}</b></Col>
            <Col>Fund: <b>{DBfund.Fund_Name}</b></Col>
            <Col>Realized/Active: <b>{DBfund.Realized_Active}</b></Col>
            <Col><Button variant='info' size='sm' onClick={handleHistoryClick}>History</Button></Col>
          </Row>
        </Container>}
        {!showAddForm && showAddLink && <Button variant='link' size='md' onClick={() => setShowAddForm(true)}>Add Mapping</Button>}
        <br></br>
        {!showAddForm && <Button onClick={() => navigate("/funds")}>Done</Button>}
        {showAddForm && <AddMapping DBdeal={DBdeal} DBfund={DBfund} setShowAddForm={setShowAddForm} setPageMsg={setPageMsg} />}
        <br></br>
        {pageMsg}
      </center >
      {showHistory && <History DBdeal={DBdeal} DBfund={DBfund} setModalOpen={setShowHistory} setPageMsg={setPageMsg} />}
    </div >
  );
}
