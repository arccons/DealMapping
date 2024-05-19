import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';

import DealEdit from '../Components/DealEdit';
import Securities from '../Components/Securities';
import Search from '../ARC/Search';

function Deals({ setDBdeal }) {

  const [gotDeals, setGotDeals] = useState(false);
  const [initialDealList, setInitialDealList] = useState([]);
  const [currrentDealList, setCurrentDealList] = useState([]);
  const [currentDeal, setCurrentDeal] = useState();

  const [showSecurities, setShowSecurities] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [pageMsg, setPageMsg] = useState("");

  const navigate = useNavigate();

  const dealsURL = "http://localhost:8000/deals";
  const search_parameters = ["id", "dealName"];

  useEffect(() => {
    console.log("Deal.js: useEffect entered.");
    if (!gotDeals) {
      console.log("useEffect: Getting deal list.");
      const config = {
        headers: {
          'content-type': 'application/json'
        },
      }
      axios.get(dealsURL, config)
        .then(response => {
          const initialDeals = JSON.parse(response.data.DEAL_LIST);
          setInitialDealList(initialDeals);
          setCurrentDealList(initialDeals);
          setGotDeals(true);
          setShowEditForm(false);
          setPageMsg("Got deal list from DB.");
        })
        .catch(error => {
          setPageMsg("Error getting deal list: " + error);
          setGotDeals(false);
          setShowEditForm(false);
        });
    }
  }, [gotDeals, pageMsg, showEditForm])

  function handleEditClick(event) {
    event.preventDefault();
    setShowEditForm(true);
    const selectedIndex = event.target.value;
    const dl = currrentDealList[selectedIndex];
    setCurrentDeal(dl);
    setPageMsg("Got deal details.");
  }

  function handleMappingClick(event) {
    event.preventDefault();
    setShowEditForm(false);
    const selectedIndex = event.target.value;
    const dl = currrentDealList[selectedIndex];
    setDBdeal(dl);
    navigate('/funds');
  }

  function handleSecuritiesClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    const dl = currrentDealList[selectedIndex];
    setCurrentDeal(dl);
    console.log("Current deal = " + dl.dealName);
    setShowSecurities(true);
    console.log("showSecurities = " + showSecurities);
  }

  return (
    <div className="App">
      <center>
        <h4>Deals</h4>
        {gotDeals &&
          <>
            <Search
              initialDataList={initialDealList}
              setCurrentDataList={setCurrentDealList}
              search_parameters={search_parameters}
              setModalOpen={showSecurities}
              placeholder={"Search Deals"}>
            </Search>
            <br />
            <MDBTable striped hover bordered align="middle" small responsive borderColor="dark">
              <MDBTableHead>
                <tr align="center">
                  <th>Securities</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Effective Date</th>
                  <th>Closing Date</th>
                  <th>Sub-Sector</th>
                  <th>Is Liquid</th>
                  <th>Edit</th>
                  <th>Mappings</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {currrentDealList.map((d, index) => (
                  <tr key={index} align="center">
                    <td><button value={index} onClick={handleSecuritiesClick}>Securities</button></td>
                    <td>{d.id}</td>
                    <td>{d.dealName}</td>
                    <td>{d.effectiveDate}</td>
                    <td>{d.closingDate === 'None' ? '' : d.closingDate}</td>
                    <td>{d.subSector}</td>
                    <td>{d.isLiquid}</td>
                    <td><MDBBtn color='link' rounded size='sm' value={index} onClick={handleEditClick}>Edit</MDBBtn></td>
                    <td><button value={index} onClick={handleMappingClick}>Mappings</button></td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
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
            setPageMsg={setPageMsg} />
        }
        <br />
        {pageMsg}
      </center>
    </div>
  );
}

export default Deals;
