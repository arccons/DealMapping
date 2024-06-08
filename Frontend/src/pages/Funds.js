import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Search from '../ARC/Search';
import { Table, Button } from 'react-bootstrap';

export default function Funds({ DBdeal, setDBfund }) {

  const [initialFundList, setInitialFundList] = useState([]);
  const [displayedFundList, setDisplayedFundList] = useState([]);
  const [gotFunds, setGotFunds] = useState(false);

  const [pageMsg, setPageMsg] = useState("");

  const navigate = useNavigate();
  const fundsURL = "http://localhost:8000/dealFunds/" + DBdeal.ACDB_Deal_ID;

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
          const DBfunds = JSON.parse(response.data.FUNDS_LIST);
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
        <h5>Funds for: {DBdeal.Deal_Name} (ACDB_Deal_ID: {DBdeal.ACDB_Deal_ID}) </h5>
        {gotFunds &&
          <Search
            initialDataList={initialFundList}
            setDisplayList={setDisplayedFundList}
            search_parameters={search_parameters}
            placeholder={"Search Funds"}>
          </Search>
        }
        <br></br>
        <Table striped hover bordered align="middle" responsive>
          <thead>
            <tr align="center">
              <th>Fund Name</th>
              <th>Active/Realized</th>
              <th>Deal Investment Currency</th>
              <th>Investment Blended FX Rate</th>
              <th>Mapping</th>
            </tr>
          </thead>
          <tbody>
            {displayedFundList.map((f, index) => (
              <tr key={index} align="center">
                <td>{f.Fund_Name}</td>
                <td>{f.Active_Realized}</td>
                <td>{f.Deal_Investment_Currency}</td>
                <td>{f.Investment_Blended_FX_Rate}</td>
                <td><Button variant="secondary" size='sm' value={index} onClick={handleMappingClick}>Mapping</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={() => navigate("/")}>Done</Button>
        <br></br>
        {pageMsg}
      </center>
    </div>
  );
}
