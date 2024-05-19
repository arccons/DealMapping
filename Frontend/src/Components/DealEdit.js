import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function DealEdit({ deal, setGotDeals, setShowEditForm, setPageMsg }) {

  //const effectiveDate = deal.effectiveDate;
  const [effectiveDateEntered, setEffectiveDateEntered] = useState(deal.effectiveDate);
  //const closingDate = deal.closingDate;
  const [closingDateEntered, setClosingDateEntered] = useState(deal.closingDate);
  //const subSector = deal.subSector;
  const [subSectorEntered, setSubSectorEntered] = useState(deal.subSector);
  //const isLiquid = deal.isLiquid;
  const [isLiquidEntered, setIsLiquidEntered] = useState(deal.isLiquid);

  const [itemChanged, setItemChanged] = useState(false);

  const navigate = useNavigate();

  function handleEffectiveDateChange(event) {
    event.preventDefault();
    setItemChanged(true);
    const nullVal = document.getElementById("effectiveDateNull").value;
    console.log("effectiveDate nullVal = " + nullVal);
    let enteredVal = document.getElementById("effectiveDate").value;
    console.log("effectiveDate enteredVal = " + enteredVal);
    if (nullVal === 'on') {
      setEffectiveDateEntered(null);
    }
    else if (nullVal === 'off') {
      if (enteredVal !== null) {
        setClosingDateEntered(enteredVal);
      }
    }
  }

  function handleClosingDateChange(event) {
    event.preventDefault();
    setItemChanged(true);
    const nullVal = document.getElementById("closingDateNull").value;
    console.log("closingDate nullVal = " + nullVal);
    let enteredVal = document.getElementById("closingDate").value;
    console.log("closingDate enteredVal = " + enteredVal);
    if (nullVal === 'on') {
      setClosingDateEntered(null);
    }
    else if (nullVal === 'off') {
      if (enteredVal !== null) {
        setClosingDateEntered(enteredVal);
      }
    }
  }

  function handleSubSectorChange(event) {
    event.preventDefault();
    setItemChanged(true);
    const nullVal = document.getElementById("subSectorNull").value;
    console.log("subSector nullVal = " + nullVal);
    let enteredVal = document.getElementById("subSector").value;
    console.log("subSector enteredVal = " + enteredVal);
    if (nullVal === 'on') {
      setSubSectorEntered(null);
    }
    else if (nullVal === 'off') {
      if (enteredVal === "-1") {
        enteredVal = null;
      }
      if (enteredVal !== null) {
        setSubSectorEntered(enteredVal);
      }
    }
  }

  function handleIsLiquidChange(event) {
    event.preventDefault();
    setItemChanged(true);
    const nullVal = document.getElementById("isLiquidNull").value;
    console.log("isLiquid nullVal = " + nullVal);
    let enteredVal = document.getElementById("isLiquid").value;
    console.log("isLiquid enteredVal = " + enteredVal);
    if (nullVal === 'on') {
      setIsLiquidEntered(null);
    }
    else {
      if (nullVal === 'off') {
        if (enteredVal === "-1") {
          enteredVal = null;
        }
        if (enteredVal !== null) {
          setIsLiquidEntered(enteredVal);
        }
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (itemChanged) {
      const url = 'http://localhost:8000/updateDeal';
      const formData = new FormData();
      formData.append('dealID', deal.id);
      formData.append('effectiveDate', effectiveDateEntered);
      formData.append('closingDate', closingDateEntered);
      formData.append('subSector', subSectorEntered);
      formData.append('isLiquid', isLiquidEntered);
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

  function handleCancel() {
    setItemChanged(false);
    setShowEditForm(false);
    setPageMsg("Got deal list from DB.");
    navigate("/");
  }

  const subSectorValueList = ['CLO', 'Residential', 'Infrastructure'];

  return (
    <div className="App">
      < form id="MainForm" onSubmit={handleSubmit}>
        <center>
          <h5>Edit Deal: <b>{deal.dealName}</b></h5>
          <MDBTable id='EditDeal'>
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
                <td>Effective Date</td>
                <td>{deal.effectiveDate}</td>
                <td><input type='date' id='effectiveDate' onChange={handleEffectiveDateChange}></input></td>
                <td><input type='checkbox' disabled /></td>
              </tr>
              <tr>
                <td>Closing Date</td>
                <td>{deal.closingDate === 'None' ? '' : deal.closingDate}</td>
                <td><input type='date' id='closingDate' onChange={handleClosingDateChange}></input></td>
                <td><input type='checkbox' id='closingDateNull' value='off' onChange={handleClosingDateChange} /></td>
              </tr>
              <tr>
                <td>subSector</td>
                <td>{deal.subSector}</td>
                <td>
                  <select id='subSector' onChange={handleSubSectorChange}>
                    <option value={"-1"}>Choose one option</option>
                    {subSectorValueList.map((s, index) => { return (<option key={index} value={s}>{s}</option>); })}
                  </select>
                </td>
                <td><input type='checkbox' id='subSectorNull' value='off' onChange={handleSubSectorChange} /></td>
              </tr>
              <tr>
                <td>Is Liquid</td>
                <td>{deal.isLiquid}</td>
                <td>
                  <select id='isLiquid' onChange={handleIsLiquidChange}>
                    <option value={"-1"}>Choose one option</option>
                    <option key={1} value={"Yes"}>{"Yes"}</option>
                    <option key={2} value={"No"}>{"No"}</option>
                  </select>
                </td>
                <td><input type='checkbox' id='isLiquidNull' value='off' onChange={handleIsLiquidChange} /></td>
              </tr>
            </MDBTableBody>
          </MDBTable>
          <br></br>
          <button onClick={() => handleCancel()}>Cancel</button>{itemChanged && <button>Save Changes</button>}
        </center>
      </form>
    </div>
  );
}

export default DealEdit;
