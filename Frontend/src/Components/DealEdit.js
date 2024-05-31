import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { ARC_handleSelectChange_NULL, ARC_handleDateChange_NULL } from '../ARC/ChangeFields';

export default function DealEdit({ deal, setGotDeals, setShowEditForm, setPageMsg }) {

  const [closingDateFinal, setClosingDateFinal] = useState(deal.Closing_Date);
  const [modifiedDateFinal, setModifiedDateFinal] = useState(deal.Modify_Date);
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
      formData.append('Modify_Date', modifiedDateFinal);
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
      < form id="MainForm" onSubmit={handleSubmit}>
        <center>
          <p>Editing Deal: <b>{deal.Deal_Name}</b></p>
          <MDBTable striped hover bordered align="middle" small responsive borderColor="dark">
            <MDBTableHead>
              <tr>
                <th>Deal Field</th>
                <th>Current Value</th>
                <th>Updated Value</th>
                <th>Set NULL Value</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>Closing_Date</td>
                <td>{deal.Closing_Date}</td>
                <td><input type='date' id='closingDate' onChange={() => handleDateChange('closingDateNull', 'closingDate', setClosingDateFinal)} /></td>
                <td><input type='checkbox' value='off' id='closingDateNull' onChange={() => handleDateChange('closingDateNull', 'closingDate', setClosingDateFinal)} /></td>
              </tr>
              <tr>
                <td>Modified Date</td>
                <td>{deal.Modify_Date === 'None' ? '' : deal.Modify_Date}</td>
                <td><input type='date' id='modifiedDate' onChange={() => handleDateChange('modifiedDateNull', 'modifiedDate', setModifiedDateFinal)} /></td>
                <td><input type='checkbox' id='modifiedDateNull' value='off' onChange={() => handleDateChange('modifiedDateNull', 'modifiedDate', setModifiedDateFinal)} /></td>
              </tr>
              <tr>
                <td>Sub-Sector</td>
                <td>{deal.Subsector}</td>
                <td>
                  <select id='subSector' onChange={() => handleSelectChange('subSectorNull', 'subSector', setSubSectorFinal)}>
                    <option value={"-1"}>Choose one option</option>
                    {subSectorValueList.map((s, index) => {
                      return (<option key={index} value={s}>{s}</option>);
                    })}
                  </select>
                </td>
                <td><input type='checkbox' id='subSectorNull' value='off' onChange={() => handleSelectChange('subSectorNull', 'subSector', setSubSectorFinal)} /></td>
              </tr>
              <tr>
                <td>Strategy</td>
                <td>{deal.Strategy}</td>
                <td>
                  <select id='strategy' onChange={() => handleSelectChange('strategyNull', 'strategy', setStrategyFinal)}>
                    <option value={"-1"}>Choose one option</option>
                    {strategyValueList.map((s, index) => {
                      return (<option key={index} value={s}>{s}</option>);
                    })}
                  </select>
                </td>
                <td><input type='checkbox' id='strategyNull' value='off' onChange={() => handleSelectChange('strategyNull', 'strategy', setStrategyFinal)} /></td>
              </tr>
              <tr>
                <td>Is Liquid</td>
                <td>{deal.Liquid_Illiquid}</td>
                <td>
                  <select id='isLiquid' onChange={() => handleSelectChange('isLiquidNull', 'isLiquid', setIsLiquidFinal)}>
                    <option value={"-1"}>Choose one option</option>
                    <option key={1} value={"Liquid"}>{"Liquid"}</option>
                    <option key={2} value={"Illiquid"}>{"Illiquid"}</option>
                  </select>
                </td>
                <td><input type='checkbox' id='isLiquidNull' value='off' onChange={() => handleSelectChange('isLiquidNull', 'isLiquid', setIsLiquidFinal)} /></td>
              </tr>
            </MDBTableBody>
          </MDBTable>
          <button onClick={() => handleCancel()}>Cancel</button>{itemChanged && <button>Save Changes</button>}
        </center>
      </form>
    </div>
  );
}
