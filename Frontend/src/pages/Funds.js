import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Search from '../ARC/Search';
import { Button, Container, Row, Col } from 'react-bootstrap';
import DownloadCSV from '../ARC/DownloadCSV';

export default function Funds({ DBdeal, setDBfund }) {

  const [initialFundList, setInitialFundList] = useState([]);
  const [displayedFundList, setDisplayedFundList] = useState([]);
  const [gotFunds, setGotFunds] = useState(false);

  const [pageMsg, setPageMsg] = useState("");

  const navigate = useNavigate();
  const fundsURL = process.env.REACT_APP_URL_DEFAULT + "dealFunds/" + DBdeal.ACDB_Deal_ID;
  const columns = ["ACDB_Deal_ID", "Deal_Name", "Deal_Name_EntityCode", "Fund Name", "Currency",
    "Deal Realized / Active", "Realized Date", "Realized_IRR", "Realized_MOIC", "Realized_PnL",
    "Commitment_Local", "Legal_Commitment_Local"];

  const search_parameters = ["Fund_Name"];

  useEffect(() => {
    console.log("Funds.js: useEffect entered.");
    if (!gotFunds) {
      console.log("Funds.js: useEffect getting Funds list.");
      const config = {
        headers: {
          'content-type': 'application/json'
        },
      }
      axios.get(fundsURL, config)
        .then(response => {
          const DBfunds = JSON.parse(response.data.FUNDS);
          console.log(DBfunds);
          setInitialFundList(DBfunds);
          setDisplayedFundList(DBfunds);
          setGotFunds(true);
          setPageMsg("Got funds list from DB for deal: " + DBdeal.Deal_Name);
        })
        .catch(error => {
          setPageMsg("Error getting funds list: " + error);
          setGotFunds(false);
        });
    }
  }, [DBdeal, fundsURL, gotFunds, pageMsg])

  function handleMappingClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    const f = displayedFundList[selectedIndex];
    setDBfund(f);
    console.log(f);
    navigate('/mappings');
  }

  return (
    <div className="App">
      <center>
        {<Container className='displaySection'>
          <Row>
            <Col>Deal Name: <b>{DBdeal.Deal_Name}</b></Col>
            <Col>EntityCode: <b>{DBdeal.Deal_Name_EntityCode}</b></Col>
            <Col>ACDB_Deal_ID: <b>{DBdeal.ACDB_Deal_ID}</b></Col>
          </Row>
        </Container>}
        {gotFunds && displayedFundList.length > 0 &&
          <>
            <Search
              initialDataList={initialFundList}
              setDisplayList={setDisplayedFundList}
              search_parameters={search_parameters}
              placeholder={"Search Funds"}>
            </Search>
            <br></br>
            <Container striped hover bordered align="middle" responsive>
              <Row>
                <Col><b>Fund Name</b></Col>
                <Col><b>Deal Mapping Currency</b></Col>
                <Col><b>Active/Realized</b></Col>
                <Col><b>Realized Date</b></Col>
                <Col><b>Mapping</b></Col>
              </Row>
              {displayedFundList.map((f, index) => (
                <Row key={index} align="center" className='mt-2'>
                  <Col>{f.Fund_Name}</Col>
                  <Col>{f.Deal_Mapping_Currency}</Col>
                  <Col>{f.Realized_Active}</Col>
                  <Col>{f.Realized_Date}</Col>
                  <Col><Button variant="secondary" size='sm' value={index} onClick={handleMappingClick}>Mapping</Button></Col>
                </Row>
              ))}
            </Container>
            <DownloadCSV
              data={displayedFundList}
              fileName={"Funds - " + DBdeal.Deal_Name}
              columns={columns}
            />
          </>}
        {displayedFundList.length === 0 && <h6>No Funds mapped</h6>}
        <Button onClick={() => navigate("/")} className='m-3'>Done</Button>
        <br></br>
        {pageMsg}
      </center>
    </div>
  );
}
