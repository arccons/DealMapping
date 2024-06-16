import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

import DealEdit from '../Components/DealEdit';
import Securities from '../Components/Securities';

import Search from '../ARC/Search';

export default function Deals({ setDBdeal }) {

  const [gotDeals, setGotDeals] = useState(false);
  const [initialDealList, setInitialDealList] = useState([]);
  const [displayedDealList, setDisplayedDealList] = useState([]);
  const [currentDeal, setCurrentDeal] = useState();

  const [showSecurities, setShowSecurities] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [pageMsg, setPageMsg] = useState("");

  const navigate = useNavigate();

  const dealsURL = "http://localhost:8000/deals";
  const search_parameters = ["ACDB_Deal_ID", "Deal_Name", "Deal_Name_EntityCode"];

  useEffect(() => {
    console.log("Deal.js: useEffect entered.");
    if (!gotDeals) {
      console.log("Deal.js: useEffect getting deal list.");
      const config = {
        headers: {
          'content-type': 'application/json'
        },
      }
      axios.get(dealsURL, config)
        .then(response => {
          const initialDeals = JSON.parse(response.data.DEALS);
          setInitialDealList(initialDeals);
          setDisplayedDealList(initialDeals);
          setGotDeals(true);
          setShowEditForm(false);
          setPageMsg("Deal.js: Got deal list from DB.");
        })
        .catch(error => {
          setPageMsg("Deal.js: Error getting deal list: " + error);
          setGotDeals(false);
          setShowEditForm(false);
        });
    }
  }, [gotDeals, pageMsg, showEditForm])

  function handleEditClick(event) {
    event.preventDefault();
    setShowEditForm(true);
    const selectedIndex = event.target.value;
    const dl = displayedDealList[selectedIndex];
    setCurrentDeal(dl);
    setShowEditForm(true);
    setPageMsg("Deal.js: Got deal details.");
  }

  function handleFundsClick(event) {
    event.preventDefault();
    setShowEditForm(false);
    const selectedIndex = event.target.value;
    const dl = displayedDealList[selectedIndex];
    setCurrentDeal(dl);
    setDBdeal(dl);
    navigate('/funds');
  }

  function handleSecuritiesClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    const dl = displayedDealList[selectedIndex];
    setCurrentDeal(dl);
    setShowSecurities(true);
    console.log("Deal.js: Current deal = " + dl.Deal_Name);
    console.log("Deal.js: showSecurities = " + showSecurities);
  }

  return (
    <div className="App">
      <center>
        <h4>Deals</h4>
        {gotDeals &&
          <>
            <Search
              initialDataList={initialDealList}
              setDisplayList={setDisplayedDealList}
              search_parameters={search_parameters}
              placeholder={"Search Deals"}>
            </Search>
            <br />
            <Table striped hover bordered align="middle" responsive>
              <thead>
                <tr align="center">
                  <th>Edit</th>
                  <th>ACDB_Deal_ID</th>
                  <th>Entity Code</th>
                  <th>Deal Name</th>
                  <th>Strategy</th>
                  <th>Sub-Sector</th>
                  <th>Is Liquid</th>
                  <th>Closing Date</th>
                  <th>Securities</th>
                  <th>Funds</th>
                </tr>
              </thead>
              <tbody>
                {displayedDealList.map((d, index) => (
                  <tr key={index} align="center">
                    <td><Button variant="link" size='sm' value={index} onClick={handleEditClick}>Edit Deal</Button></td>
                    <td>{d.ACDB_Deal_ID}</td>
                    <td>{d.Deal_Name_EntityCode}</td>
                    <td>{d.Deal_Name}</td>
                    <td>{d.Strategy}</td>
                    <td>{d.Subsector}</td>
                    <td>{d.Liquid_Illiquid}</td>
                    <td>{d.Closing_Date === 'None' ? '' : d.Closing_Date}</td>
                    <td><Button variant="info" size='sm' value={index} onClick={handleSecuritiesClick}>Securities</Button></td>
                    <td><Button variant="secondary" size='sm' value={index} onClick={handleFundsClick}>Funds</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {showSecurities &&
              <Securities
                deal={currentDeal}
                setModalOpen={setShowSecurities}
                setPageMsg={setPageMsg}>
              </Securities>}
          </>}
        {showEditForm &&
          <DealEdit
            deal={currentDeal}
            setGotDeals={setGotDeals}
            setShowEditForm={setShowEditForm}
            setPageMsg={setPageMsg} />}
        <br />
        {pageMsg}
      </center>
    </div>
  );
}
