import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DealEdit from '../Components/DealEdit';

function DealList({ setPageMsg }) {

  const [gotDBdata, setGotDBdata] = useState(false);
  const [currentDeal, setCurrentDeal] = useState();
  const [dealList, setDealList] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    console.log("useEffect: Entered.");
    if (!gotDBdata) {
      console.log("useEffect: Getting deal list.");
      const url = 'http://localhost:8000/dealList/';
      const config = {
        headers: {
          'content-type': 'application/json'
        },
      }
      axios.get(url, config)
        .then(response => {
          setDealList(JSON.parse(response.data.DEAL_LIST));
          console.log(response.data.DEAL_LIST);
          setGotDBdata(true);
          if (showEditForm) {
            setShowEditForm(false);
          } else {
            setPageMsg("");
          }
        })
        .catch(error => {
          console.error("Error getting deal list: ", error);
          setPageMsg("Error getting deal list: " + error);
          setGotDBdata(false);
          setShowEditForm(false);
        });
    }
  }, [gotDBdata, setPageMsg, showEditForm])

  function handleDealClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    console.log(selectedIndex);
    const dl = dealList[selectedIndex];
    console.log(dl);
    setCurrentDeal(dl);
    setShowEditForm(true);
  }

  return (
    <div className="App">
      <center>
        <table>
          <caption><b>Deal List</b></caption>
          <thead>
            <tr>
              <th>Deal ID</th>
              <th>Deal Name</th>
              <th>Effective Date</th>
              <th>Closing Date</th>
              <th>Sub-Sector</th>
              <th>Is Liquid</th>
            </tr>
          </thead>
          <tbody>
            {dealList.map((d, index) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.dealName}</td>
                <td>{d.effectiveDate}</td>
                <td>{d.closingDate}</td>
                <td>{d.subSector}</td>
                <td>{d.isLiquid}</td>
                <td><button key={d.id} value={index} onClick={handleDealClick}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
      <br></br>
      {showEditForm && <DealEdit deal={currentDeal} setGotDBdata={setGotDBdata} setPageMsg={setPageMsg} />}
    </div>
  );
}

export default DealList;
