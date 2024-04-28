import React, { useState } from 'react';
import axios from 'axios';

function DealEdit({ deal, setGotDBdata, setPageMsg }) {

  const [effectiveDate, setEffectiveDate] = useState(deal.effectiveDate);
  const [closingDate, setClosingDate] = useState(deal.closingDate);
  const [subSector, setSubsector] = useState(deal.subSector);
  const [isLiquid, setIsLiquid] = useState(deal.isLiquid);

  const [itemChanged, setItemChanged] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [dealUploaded, setDealUploaded] = useState(false);

  function handleEffectiveDateChange(event) {
    event.preventDefault();
    setItemChanged(true);
    setEffectiveDate(document.getElementById("effectiveDate").value);
  }

  function handleClosingDateChange(event) {
    event.preventDefault();
    setItemChanged(true);
    setClosingDate(document.getElementById("closingDate").value);
  }

  function handleSubSectorChange(event) {
    event.preventDefault();
    setItemChanged(true);
    setSubsector(document.getElementById("subSector").value);
  }

  function handleIsLiquidChange(event) {
    event.preventDefault();
    setItemChanged(true);
    setIsLiquid(document.getElementById("isLiquid").value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (itemChanged) {
      setFormSubmitted(true);
      const url = 'http://localhost:8000/updateDeal/';
      const formData = new FormData();
      formData.append('dealID', deal.id);
      formData.append('effectiveDate', effectiveDate === 'None' ? '' : effectiveDate);
      formData.append('closingDate', closingDate === 'None' ? '' : closingDate);
      formData.append('subSector', subSector);
      formData.append('isLiquid', isLiquid);
      const config = {
        headers: {
          'content-type': 'application/vnd.api+json'
        },
      };
      axios.post(url, formData, config)
        .then((response) => {
          setDealUploaded(true);
          setPageMsg(response.data.message);
          setGotDBdata(false);
          console.log(response.data.message);
        })
        .catch((error) => {
          setDealUploaded(false);
          setPageMsg(error.message);
          console.error("error.message: ", error);
        });
    }
  }

  return (
    <div className="App">
      <form id="MainForm" onSubmit={handleSubmit}>
        <center>
          <table id='record'>
            <caption><b>Edit Deal:</b> {deal.dealName}</caption>
            <thead>
              <tr>
                <th>Deal Field</th>
                <th>Current Value</th>
                <th>Updated Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Effective Date</td>
                <td>{deal.effectiveDate}</td>
                <td><input type="Date" id='effectiveDate' onChange={handleEffectiveDateChange}></input></td>
              </tr>
              <tr>
                <td>Closing Date</td>
                <td>{deal.closingDate}</td>
                <td><input type="Date" id='closingDate' onChange={handleClosingDateChange}></input></td>
              </tr>
              <tr>
                <td>subSector</td>
                <td>{deal.subSector}</td>
                <td><input type="text" id='subSector' onChange={handleSubSectorChange}></input></td>
              </tr>
              <tr>
                <td>Is Liquid</td>
                <td>{deal.isLiquid}</td>
                <td><input type="text" id='isLiquid' onChange={handleIsLiquidChange}></input></td>
              </tr>
            </tbody>
          </table>
          <button>Save Changes</button>
          {formSubmitted && dealUploaded && <center><b><p>Deal Updated successfully!</p></b></center>}
          {formSubmitted && !dealUploaded && <center><p><b> Deal Update failed!</b></p></center>}
        </center>
      </form>
    </div>
  );
}

export default DealEdit;
