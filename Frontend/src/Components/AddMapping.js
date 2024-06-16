import React, { useState } from 'react';
import axios from 'axios';
import { ARC_handleTextChange, ARC_handleDateChange } from '../ARC/ChangeFields';
import { Button, Row, Col, Container } from 'react-bootstrap';
import './EditStyles.css';

export default function AddMapping({ DBdeal, DBfund, setShowAddForm, setPageMsg }) {

  const [Realized_PnL_final, setRealized_PnL_final] = useState(null);
  const [Realized_IRR_final, setRealized_IRR_final] = useState(null);
  const [Realized_MOIC_final, setRealized_MOIC_final] = useState(null);
  const [Realized_Date_final, setRealized_Date_final] = useState('');
  const [Commitment_Local_final, setCommitment_Local_final] = useState(null);
  const [Legal_Commitment_Local_final, setLegal_Commitment_Local_final] = useState(null);
  const [PIT_final, setPIT_final] = useState('');
  const [Range_From_final, setRange_From_final] = useState('');
  const [Range_To_final, setRange_To_final] = useState('');

  const [itemChanged, setItemChanged] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (itemChanged) {
      const url = 'http://localhost:8000/addMapping';
      const formData = new FormData();
      formData.append('ACDB_Deal_ID', DBdeal.ACDB_Deal_ID);
      formData.append('Fund_Name', DBfund.Fund_Name);
      formData.append('Realized_PnL', Realized_PnL_final);
      formData.append('Realized_IRR', Realized_IRR_final);
      formData.append('Realized_MOIC', Realized_MOIC_final);
      formData.append('Realized_Date', Realized_Date_final);
      formData.append('Commitment_Local', Commitment_Local_final);
      formData.append('Legal_Commitment_Local', Legal_Commitment_Local_final);
      //formData.append('Modified_By', process.env.REACT_APP_USER_DEFAULT);
      formData.append('PIT', PIT_final);
      formData.append('range_from', Range_From_final);
      formData.append('range_to', Range_To_final);
      const config = {
        headers: {
          'content-type': 'application/vnd.api+json'
        },
      };
      axios.post(url, formData, config)
        .then((response) => {
          setItemChanged(false);
          setShowAddForm(false);
          setPageMsg("Mapping added.");
        })
        .catch((error) => {
          setPageMsg("Error adding mapping. " + error);
        });
    }
  }

  function handleTextChange(changedField, setter) {
    setItemChanged(true);
    ARC_handleTextChange(changedField, setter);
  }

  function handleDateChange(changedField, setter) {
    setItemChanged(true);
    ARC_handleDateChange(changedField, setter);
  }

  function handleCancel() {
    setItemChanged(false);
    setShowAddForm(false);
    setPageMsg("Got mapping list from DB.");
  }

  return (
    <div className="App">
      <form id="MainForm" onSubmit={handleSubmit}>
        <center>
          <Container className='editSection'>
            <Row><b>As Of Date</b></Row>
            <Row className='editRow'>
              <Col>
                <label htmlFor='PIT'>PIT: </label>
                <input type='Date' id='PIT' onChange={() => handleDateChange("PIT", setPIT_final)} />
              </Col>
              <Col>
                <label htmlFor='range_from'>From: </label>
                <input type='Date' id='range_from' onChange={() => handleDateChange("range_from", setRange_From_final)} />
                <label htmlFor='range_to'>To: </label>
                <input type='Date' id='range_to' onChange={() => handleDateChange("range_to", setRange_To_final)} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>Realized Date</Row>
                <Row><input type='Date' id='Realized_Date' onChange={() => handleDateChange("Realized_Date", setRealized_Date_final)} /></Row>
              </Col>
              <Col>
                <Row>Realized PnL</Row>
                <Row><input type="text" id='Realized_PnL' onChange={() => handleTextChange("Realized_PnL", setRealized_PnL_final)} /></Row>
              </Col>
              <Col>
                <Row>Realized IRR</Row>
                <Row><input type="text" id='Realized_IRR' onChange={() => handleTextChange("Realized_IRR", setRealized_IRR_final)} /></Row>
              </Col>
              <Col>
                <Row>Realized MOIC</Row>
                <Row><input type="text" id='Realized_MOIC' onChange={() => handleTextChange("Realized_MOIC", setRealized_MOIC_final)} /></Row>
              </Col>
              <Col>
                <Row>Commitment Local</Row>
                <Row><input type="text" id='Commitment_Local' onChange={() => handleTextChange("Commitment_Local", setCommitment_Local_final)} /></Row>
              </Col>
              <Col>
                <Row>Legal Commitment Local</Row>
                <Row><input type="text" id='Legal_Commitment_Local' onChange={() => handleTextChange("Legal_Commitment_Local", setLegal_Commitment_Local_final)} /></Row>
              </Col>
            </Row>
          </Container>
          <br></br>
          <Button onClick={() => handleCancel()}>Cancel</Button>{itemChanged && <Button type='submit'>Save Changes</Button>}
        </center>
      </form>
    </div>
  );
}
