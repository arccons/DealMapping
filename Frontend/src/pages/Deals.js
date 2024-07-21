import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';

import DealEdit from '../Components/DealEdit';
import Securities from '../Components/Securities';

import Search from '../ARC/Search';
import DownloadCSV from '../ARC/DownloadCSV';

export default function Deals({ setDBdeal }) {

  const [gotDeals, setGotDeals] = useState(false);
  const [initialDealList, setInitialDealList] = useState([]);
  const [displayedDealList, setDisplayedDealList] = useState([]);
  const [currentDeal, setCurrentDeal] = useState();

  const [showSecurities, setShowSecurities] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [pageMsg, setPageMsg] = useState("");

  const navigate = useNavigate();


  const columns = ["ACDB_Deal_ID", "Deal_Name_EntityCode", "Deal_Name",
    "Liquid_Illiquid", "Strategy", "Subsector", "Region", "Closing_Date", "Is_Deleted"];
  const dealsURL = process.env.REACT_APP_URL_DEFAULT + "deals";
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
          console.log(initialDeals);
        })
        .catch(error => {
          setPageMsg("Deal.js: Error getting deal list: " + error);
          setGotDeals(false);
          setShowEditForm(false);
        });
    }
  }, [gotDeals, pageMsg, showEditForm, dealsURL])

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
        <h5>Deals</h5>
        {showEditForm &&
          <>
            <DealEdit
              deal={currentDeal}
              setGotDeals={setGotDeals}
              setShowEditForm={setShowEditForm}
              setPageMsg={setPageMsg} />
            <br></br>
          </>
        }
        {gotDeals &&
          <>
            <Search
              initialDataList={initialDealList}
              setDisplayList={setDisplayedDealList}
              search_parameters={search_parameters}
              placeholder={"Search Deals"}>
            </Search>
            <Container>
              <Row align="center">
                <Col><b>Edit</b></Col>
                <Col><b>Deal ID</b></Col>
                <Col><b>Entity Code</b></Col>
                <Col><b>Deal Name</b></Col>
                <Col><b>Strategy</b></Col>
                <Col><b>Sub-Sector</b></Col>
                <Col><b>Is Liquid</b></Col>
                <Col><b>Closing Date</b></Col>
                <Col><b>Securities</b></Col>
                <Col><b>Funds</b></Col>
              </Row>
              {displayedDealList.map((d, index) => (
                <Row key={index} align="center" className='mt-2'>
                  <Col><Button variant="link" size='sm' value={index} onClick={handleEditClick}>Edit Deal</Button></Col>
                  <Col>{d.ACDB_Deal_ID}</Col>
                  <Col>{d.Deal_Name_EntityCode}</Col>
                  <Col>{d.Deal_Name}</Col>
                  <Col>{d.Strategy}</Col>
                  <Col>{d.Subsector}</Col>
                  <Col>{d.Liquid_Illiquid}</Col>
                  <Col>{d.Closing_Date === 'None' ? '' : d.Closing_Date}</Col>
                  <Col><Button variant="info" size='sm' value={index} onClick={handleSecuritiesClick}>Securities</Button></Col>
                  <Col><Button variant="secondary" size='sm' value={index} onClick={handleFundsClick}>Funds</Button></Col>
                </Row>
              ))}
            </Container>
            {showSecurities &&
              <Securities
                deal={currentDeal}
                setModalOpen={setShowSecurities}
                setPageMsg={setPageMsg}>
              </Securities>}
          </>}
        {displayedDealList.length > 0 && !showEditForm &&
          <DownloadCSV
            data={displayedDealList}
            fileName={"All Deals"}
            columns={columns}
          />}
        <p>{pageMsg}</p>
      </center>
    </div>
  );
}
