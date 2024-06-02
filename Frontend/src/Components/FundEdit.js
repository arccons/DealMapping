import React, { useState } from 'react';
import axios from 'axios';
import { ARC_handleSelectChange_NULL, ARC_handleTextChange_NULL } from '../ARC/ChangeFields';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './EditStyles.css';

export default function FundEdit({ fund, setGotFunds, setShowEditForm, setPageMsg }) {

  const [activeFinal, setActiveFinal] = useState(fund.Active_Realized);
  const [currencyFinal, setCurrencyFinal] = useState(fund.Deal_Investment_Currency);
  const [FXrateFinal, setFXrateFinal] = useState(fund.Investment_Blended_FX_Rate);

  const [itemChanged, setItemChanged] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (itemChanged) {
      const url = 'http://localhost:8000/updateFund';
      const formData = new FormData();
      formData.append('ACDB_Deal_ID', fund.ACDB_Deal_ID);
      formData.append('Fund_Name', fund.Fund_Name);
      //formData.append('As_Of_Date', fund.As_Of_Date);
      formData.append('Active_Realized', activeFinal === 'None' ? '' : activeFinal);
      formData.append('Deal_Investment_Currency', currencyFinal === 'None' ? '' : currencyFinal);
      formData.append('Investment_Blended_FX_Rate', FXrateFinal === 'None' ? '' : FXrateFinal);
      const config = {
        headers: {
          'content-type': 'application/vnd.api+json'
        },
      };
      axios.post(url, formData, config)
        .then((response) => {
          setGotFunds(false);
          setShowEditForm(false);
          setPageMsg("Fund details updated. " + response.message);
        })
        .catch((error) => {
          setPageMsg("Error updating fund details. " + error);
        });
    }
  }

  function handleTextChange(nullField, changedField, setter) {
    setItemChanged(true);
    ARC_handleTextChange_NULL(nullField, changedField, setter);
  }

  function handleSelectChange(nullField, changedField, setter) {
    setItemChanged(true);
    ARC_handleSelectChange_NULL(nullField, changedField, setter);
  }

  function handleCancel() {
    setShowEditForm(false);
    setItemChanged(false);
    setPageMsg("Got funds list from DB for deal.");
  }

  return (
    <div className="App">
      <form id="MainForm" onSubmit={handleSubmit}>
        <center>
          <p>Editing fund: <b>{fund.Fund_Name}</b></p>
          <Container className='editSection'>
            <Row>
              <Col>
                <Row><b>Active/Realized</b></Row>
                <Row><center>{fund.Active_Realized}</center></Row>
                <Row>
                  <select id='active' onChange={() => handleSelectChange("activeNull", "active", setActiveFinal)}>
                    <option value={"-1"}>Choose one option</option>
                    <option key={1} value={"Active"}>{"Active"}</option>
                    <option key={2} value={"Realized"}>{"Realized"}</option>
                  </select>
                </Row>
                <br></br>
                <Row><input type='checkbox' id='activeNull' onChange={() => handleSelectChange("activeNull", "active", setActiveFinal)} /></Row>
              </Col>
              <Col>
                <Row><b>Deal Investment Currency</b></Row>
                <Row><center>{fund.Deal_Investment_Currency}</center></Row>
                <Row><input type="text" maxLength={3} id='currency' onChange={() => handleTextChange("currencyNull", "currency", setCurrencyFinal)} /></Row>
                <br></br>
                <Row><input type='checkbox' id='currencyNull' onChange={() => handleTextChange("currencyNull", "currency", setCurrencyFinal)} /></Row>
              </Col>
              <Col>
                <Row><b>Investment Blended FX Rate</b></Row>
                <Row><center>{fund.Investment_Blended_FX_Rate}</center></Row>
                <Row><input type="text" maxLength={12} id='FXrate' onChange={() => handleTextChange("FXrateNull", "FXrate", setFXrateFinal)}></input></Row>
                <br></br>
                <Row><input type='checkbox' id='FXrateNull' onChange={() => handleTextChange("FXrateNull", "FXrate", setFXrateFinal)} /></Row>
              </Col>
            </Row>
          </Container>
          <br></br>
          <Button onClick={() => handleCancel()}>Cancel</Button>{itemChanged && <Button type='submit'>Save Changes</Button>}
        </center>
      </form>
    </div >
  );
}
