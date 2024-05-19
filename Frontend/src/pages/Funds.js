import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import History from '../Components/History';
import FundEdit from '../Components/FundEdit';
import Search from '../ARC/Search';

function Funds({ DBdeal }) {

  const [initialFundList, setInitialFundList] = useState([]);
  const [currrentFundList, setCurrentFundList] = useState([]);
  const [currentFund, setCurrentFund] = useState();
  const [gotFunds, setGotFunds] = useState(false);

  const [showHistory, setShowHistory] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [pageMsg, setPageMsg] = useState("");

  const navigate = useNavigate();
  const fundsURL = "http://localhost:8000/funds/" + DBdeal.id;
  const search_parameters = ["fund_name"];

  useEffect(() => {
    console.log("Funds.js: useEffect entered.");
    if (!gotFunds) {
      console.log("Funds.js: useEffect getting Funds list.");
      console.log(DBdeal);
      const config = {
        headers: {
          'content-type': 'application/json'
        },
      }
      axios.get(fundsURL, config)
        .then(response => {
          const funds = JSON.parse(response.data.FUNDS_LIST);
          setInitialFundList(funds);
          setCurrentFundList(funds);
          setGotFunds(true);
          console.log(funds);
          setPageMsg("Got funds list from DB for deal: " + DBdeal.dealName);
        })
        .catch(error => {
          setPageMsg("Error getting funds list: " + error);
          setGotFunds(false);
        });
    }
  }, [DBdeal, fundsURL, gotFunds, pageMsg])

  function handleHistoryClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    const f = currrentFundList[selectedIndex];
    setCurrentFund(f);
    setShowHistory(true);
    setPageMsg("Editing Fund for deal ID: " + DBdeal.dealName);
  }

  function handleEditClick(event) {
    event.preventDefault();
    const selectedIndex = event.target.value;
    const f = currrentFundList[selectedIndex];
    setCurrentFund(f);
    setShowEditForm(true);
    setPageMsg("Editing Fund for deal ID: " + DBdeal.dealName);
  }

  return (
    <div className="App">
      <center>
        <h5>{DBdeal.dealName}</h5>
        <div>
          Deal ID: <b>{DBdeal.id}</b> ||
          Deal Name: <b>{DBdeal.dealName}</b> ||
          Effective Date: <b>{DBdeal.effectiveDate}</b> ||
          Closing Date: <b>{DBdeal.closingDate === 'None' ? '' : DBdeal.closingDate}</b> ||
          Sub-Sector: <b>{DBdeal.subSector}</b> ||
          Is Liquid: <b>{DBdeal.isLiquid}</b>
        </div>
        <br></br>
        <h6>Funds for: {DBdeal.dealName}</h6>
        {gotFunds &&
          <Search
            initialDataList={initialFundList}
            setCurrentDataList={setCurrentFundList}
            search_parameters={search_parameters}
            placeholder={"Search Funds"}>
          </Search>
        }
        <br></br>
        <MDBTable striped hover bordered align="middle" small responsive borderColor="dark">
          <MDBTableHead>
            <tr align="center">
              <th>History</th>
              <th>Name</th>
              <th>As of Date</th>
              <th>Local Cmmt</th>
              <th>Legal Cmmt</th>
              <th>Is Active</th>
              <th>Realized IRR</th>
              <th>Realized PNL</th>
              <th>Realized Date</th>
              <th>IC_PM_ADJ</th>
              <th>Realized MOIC</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {currrentFundList.map((f, index) => (
              <tr key={index} align="center">
                <td><button value={index} onClick={handleHistoryClick}>History</button></td>
                <td>{f.fund_name}</td>
                <td>{f.as_of_date}</td>
                <td>{f.local_cmmt === 'None' ? '' : f.local_cmmt}
                  <br />
                  <MDBBtn color='link' rounded size='sm' value={index} onClick={handleEditClick}>Edit</MDBBtn>
                </td>
                <td>{f.legal_cmmt === 'None' ? '' : f.legal_cmmt}
                  <br />
                  <MDBBtn color='link' rounded size='sm' value={index} onClick={handleEditClick}>Edit</MDBBtn>
                </td>
                <td>{f.is_active === 'None' ? '' : f.is_active}
                  <br />
                  <MDBBtn color='link' rounded size='sm' value={index} onClick={handleEditClick}>Edit</MDBBtn>
                </td>
                <td>{f.realized_irr === 'None' ? '' : f.realized_irr}
                  <br />
                  <MDBBtn color='link' rounded size='sm' value={index} onClick={handleEditClick}>Edit</MDBBtn>
                </td>
                <td>{f.realized_pnl === 'None' ? '' : f.realized_pnl}
                  <br />
                  <MDBBtn color='link' rounded size='sm' value={index} onClick={handleEditClick}>Edit</MDBBtn>
                </td>
                <td>{f.realized_date === 'None' ? '' : f.realized_date}
                  <br />
                  <MDBBtn color='link' rounded size='sm' value={index} onClick={handleEditClick}>Edit</MDBBtn>
                </td>
                <td>{f.ic_pm_adj === 'None' ? '' : f.ic_pm_adj}
                  <br />
                  <MDBBtn color='link' rounded size='sm' value={index} onClick={handleEditClick}>Edit</MDBBtn>
                </td>
                <td>{f.realized_moic === 'None' ? '' : f.realized_moic}
                  <br />
                  <MDBBtn color='link' rounded size='sm' value={index} onClick={handleEditClick}>Edit</MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
        {showHistory &&
          <History
            fund={currentFund}
            setModalOpen={setShowHistory}
            setPageMsg={setPageMsg}>
          </History>}
        {!showEditForm && <button onClick={() => navigate("/")}>Done</button>}
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

export default Funds;
