import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FundEdit from '../Components/FundEdit';
import Search from '../ARC/Search';
import { Table, Button } from 'react-bootstrap';

export default function Funds({ DBdeal, setDBfund }) {

  const [initialFundList, setInitialFundList] = useState([]);
  const [currrentFundList, setCurrentFundList] = useState([]);
  const [currentFund, setCurrentFund] = useState();
  const [gotFunds, setGotFunds] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);
  const [pageMsg, setPageMsg] = useState("");

  const navigate = useNavigate();
  const fundsURL = "http://localhost:8000/dealFunds/" + DBdeal.ACDB_Deal_ID;

  const search_parameters = ["ACDB_Deal_ID", "Fund_Name"];

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
          setCurrentFundList(DBfunds);
          setGotFunds(true);
          setPageMsg("Got funds list from DB for deal: " + DBdeal.Deal_Name);
        })
        .catch(error => {
          setPageMsg("Error getting funds list: " + error);
          setGotFunds(false);
        });
    }
  }, [DBdeal, fundsURL, gotFunds, pageMsg])

  function handleEditClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    const f = currrentFundList[selectedIndex];
    setCurrentFund(f);
    setShowEditForm(true);
    setPageMsg("Editing Fund for deal ID: " + DBdeal.Deal_Name);
  }

  function handleMappingClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    const f = currrentFundList[selectedIndex];
    setCurrentFund(f);
    setDBfund(f);
    navigate('/mappings');
  }

  return (
    <div className="App">
      <center>
        <h5>Funds for: {DBdeal.Deal_Name} (ACDB_Deal_ID: {DBdeal.ACDB_Deal_ID}) </h5>
        {gotFunds &&
          <Search
            initialDataList={initialFundList}
            setCurrentDataList={setCurrentFundList}
            search_parameters={search_parameters}
            placeholder={"Search Funds"}>
          </Search>
        }
        <br></br>
        <Table striped hover bordered align="middle" responsive>
          <thead>
            <tr align="center">
              <th>Edit Fund</th>
              <th>Fund Name</th>
              <th>Active/Realized</th>
              <th>Deal Investment Currency</th>
              <th>Investment Blended FX Rate</th>
              <th>Mapping</th>
            </tr>
          </thead>
          <tbody>
            {currrentFundList.map((f, index) => (
              <tr key={index} align="center">
                <td><Button variant="link" size='sm' value={index} onClick={handleEditClick}>Edit Fund</Button></td>
                <td>{f.Fund_Name}</td>
                <td>{f.Active_Realized}</td>
                <td>{f.Deal_Investment_Currency}</td>
                <td>{f.Investment_Blended_FX_Rate}</td>
                <td><Button variant="secondary" size='sm' value={index} onClick={handleMappingClick}>Mapping</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        {!showEditForm && <Button onClick={() => navigate("/")}>Done</Button>}
        <br></br>
        {showEditForm &&
          <FundEdit
            fund={currentFund}
            setGotFunds={setGotFunds}
            setShowEditForm={setShowEditForm}
            setPageMsg={setPageMsg} />}
        <br></br>
        {pageMsg}
      </center>
    </div>
  );
}
