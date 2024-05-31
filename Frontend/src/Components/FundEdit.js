import React, { useState } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { ARC_handleSelectChange_NULL, ARC_handleTextChange_NULL } from '../ARC/ChangeFields';

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

  /* function handleActiveChange(event) {
    //event.preventDefault();
    setItemChanged(true);
    const nullVal = document.getElementById("activeNull").checked;
    console.log("activeNull nullVal = " + nullVal);
    let enteredVal = document.getElementById("active").value;
    console.log("active enteredVal = " + enteredVal);
    if (nullVal === true) {
      setActiveFinal(null);
    }
    else if (nullVal === false) {
      if (enteredVal !== '-1') {
        setActiveFinal(enteredVal);
      }
    }
  } */

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
          <h6>Editing fund: <b>{fund.Fund_Name}</b></h6>
          <MDBTable striped hover bordered align="middle" small responsive borderColor="dark">
            <MDBTableHead>
              <tr>
                <th>Fund Field</th>
                <th>Current Value</th>
                <th>Updated Value</th>
                <th>NULL Value</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>Active/Realized</td>
                <td>{fund.Active_Realized}</td>
                <td>
                  <select id='active' onChange={() => handleSelectChange("activeNull", "active", setActiveFinal)}>
                    <option value={"-1"}>Choose one option</option>
                    <option key={1} value={"Active"}>{"Active"}</option>
                    <option key={2} value={"Realized"}>{"Realized"}</option>
                  </select>
                </td>
                <td><input type='checkbox' id='activeNull' onChange={() => handleSelectChange("activeNull", "active", setActiveFinal)} /></td>
              </tr>
              <tr>
                <td>Deal Investment Currency</td>
                <td>{fund.Deal_Investment_Currency}</td>
                <td><input type="text" id='currency' onChange={() => handleTextChange("currencyNull", "currency", setCurrencyFinal)} /></td>
                <td><input type='checkbox' id='currencyNull' onChange={() => handleTextChange("currencyNull", "currency", setCurrencyFinal)} /></td>
              </tr>
              <tr>
                <td>Investment Blended FX Rate</td>
                <td>{fund.Investment_Blended_FX_Rate}</td>
                <td><input type="text" id='FXrate' onChange={() => handleTextChange("FXrateNull", "FXrate", setFXrateFinal)}></input></td>
                <td><input type='checkbox' id='FXrateNull' onChange={() => handleTextChange("FXrateNull", "FXrate", setFXrateFinal)} /></td>
              </tr>
            </MDBTableBody>
          </MDBTable>
          <button onClick={() => handleCancel()}>Cancel</button>{itemChanged && <button>Save Changes</button>}
        </center>
      </form>
    </div>
  );
}
