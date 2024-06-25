import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ARC_handleSelectChange_NULL, ARC_handleDateChange_NULL } from '../ARC/ChangeFields';
import { Button, Container, Row, Col } from 'react-bootstrap';

export default function DealEdit({ deal, setGotDeals, setShowEditForm, setPageMsg }) {

  const [closingDateFinal, setClosingDateFinal] = useState(deal.Closing_Date);
  const [subSectorFinal, setSubSectorFinal] = useState(deal.Subsector);
  const [strategyFinal, setStrategyFinal] = useState(deal.Strategy);
  const [isLiquidFinal, setIsLiquidFinal] = useState(deal.Liquid_Illiquid);

  const [itemChanged, setItemChanged] = useState(false);

  const navigate = useNavigate();

  const subSectorValueList = ['CLO', 'Residential', 'Infrastructure'];
  const strategyValueList = [];

  function handleSubmit(event) {
    event.preventDefault();
    if (itemChanged) {
      const url = 'http://localhost:8000/updateDeal';
      const formData = new FormData();
      formData.append('ACDB_Deal_ID', deal.ACDB_Deal_ID);
      formData.append('Deal_Name_EntityCode', deal.Deal_Name_EntityCode);
      formData.append('Deal_Name', deal.Deal_Name);
      formData.append('Closing_Date', closingDateFinal);
      formData.append('Subsector', subSectorFinal);
      formData.append('Strategy', strategyFinal);
      formData.append('Liquid_Illiquid', isLiquidFinal);
      const config = {
        headers: {
          'content-type': 'application/vnd.api+json'
        },
      };
      axios.post(url, formData, config)
        .then((response) => {
          setGotDeals(false);
          setShowEditForm(false);
          setPageMsg("Deal details updated.");
        })
        .catch((error) => {
          setPageMsg("Error updating deal details. " + error);
        });
    }
  }

  function handleSelectChange(nullField, changedField, setter) {
    setItemChanged(true);
    ARC_handleSelectChange_NULL(nullField, changedField, setter);
  }

  function handleDateChange(nullField, changedField, setter) {
    setItemChanged(true);
    ARC_handleDateChange_NULL(nullField, changedField, setter);
  }

  function handleCancel() {
    setItemChanged(false);
    setShowEditForm(false);
    setPageMsg("Got deal list from DB.");
    navigate("/");
  }

  return (
    <div className="App">
      <center>
        <form id="MainForm" onSubmit={handleSubmit}>
          <p>Editing Deal: <b>{deal.Deal_Name}</b></p>
          <Container className='editSection'>
            <Row>
              <Col>
                <Row><b>Closing Date</b></Row>
                <Row>{deal.Closing_Date === '' ? 'None' : deal.Closing_Date}</Row>
                <Row><input type='date' id='closingDate' onChange={() => handleDateChange('closingDateNull', 'closingDate', setClosingDateFinal)} /></Row>
                <br></br>
                <Row><input type='checkbox' value='off' id='closingDateNull' onChange={() => handleDateChange('closingDateNull', 'closingDate', setClosingDateFinal)} /></Row>
              </Col>
              <Col>
                <Row><b>Sub-Sector</b></Row>
                <Row>{deal.Subsector === '' ? 'None' : deal.Subsector}</Row>
                <Row>
                  <select id='subSector' onChange={() => handleSelectChange('subSectorNull', 'subSector', setSubSectorFinal)}>
                    <option value={"-1"}>Choose One</option>
                    {subSectorValueList.map((s, index) => {
                      return (<option key={index} value={s}>{s}</option>);
                    })}
                  </select>
                </Row>
                <br></br>
                <Row><input type='checkbox' id='subSectorNull' value='off' onChange={() => handleSelectChange('subSectorNull', 'subSector', setSubSectorFinal)} /></Row>
              </Col>
              <Col>
                <Row><b>Strategy</b></Row>
                <Row>{deal.Strategy === '' ? 'None' : deal.Strategy}</Row>
                <Row>
                  <select id='strategy' onChange={() => handleSelectChange('strategyNull', 'strategy', setStrategyFinal)}>
                    <option value={"-1"}>Choose One</option>
                    {strategyValueList.map((s, index) => {
                      return (<option key={index} value={s}>{s}</option>);
                    })}
                  </select>
                </Row>
                <br></br>
                <Row><input type='checkbox' id='strategyNull' value='off' onChange={() => handleSelectChange('strategyNull', 'strategy', setStrategyFinal)} /></Row>
              </Col>
              <Col>
                <Row><b>Is Liquid</b></Row>
                <Row>{deal.Liquid_Illiquid}</Row>
                <Row>
                  <select id='isLiquid' onChange={() => handleSelectChange('isLiquidNull', 'isLiquid', setIsLiquidFinal)}>
                    <option value={"-1"}>Choose One</option>
                    <option key={1} value={"Liquid"}>{"Liquid"}</option>
                    <option key={2} value={"Illiquid"}>{"Illiquid"}</option>
                  </select>
                </Row>
                <br></br>
                <Row><input type='checkbox' id='isLiquidNull' value='off' onChange={() => handleSelectChange('isLiquidNull', 'isLiquid', setIsLiquidFinal)} /></Row>
              </Col>
            </Row>
          </Container>
          <Button onClick={() => handleCancel()}>Cancel</Button>{itemChanged && <Button type='submit'>Save Changes</Button>}
        </form>
      </center >
    </div >
  );
}
