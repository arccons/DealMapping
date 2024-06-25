import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import Layout from "./Layout";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import Deals from "./pages/Deals";
import Funds from './pages/Funds';
import Mappings from './pages/Mappings';
import UploadFile from './pages/UploadFile';

export default function App() {
  const [DBdeal, setDBdeal] = useState();
  const [DBfund, setDBfund] = useState();

  const BASE_URL = process.env.REACT_APP_URL_DEFAULT;

  const DEAL_CHECK_URL = BASE_URL + "checkDeals";
  const DEAL_UPLOAD_URL = BASE_URL + "uploadDeals";
  const DEAL_UPLOAD_COLUMNS = ["ACDB_Deal_ID", "Deal_Name_EntityCode", "Deal_Name", "Liquid_Illiquid", "Strategy", "Subsector", "Region", "Closing_Date", "Is_Deleted"];
  const MAPPING_CHECK_URL = BASE_URL + "checkMappings";
  const MAPPING_UPLOAD_URL = BASE_URL + "uploadMappings";
  const MAPPING_UPLOAD_COLUMNS = ["Deal Name", "Deal Code", "Liquid / Illiquid", "Strategy", "Subsector", "DealRegion", "Closing Date", "Prism Link", "DealCloud Link", "ICMemo Link", "Fund Name", "Currency", "Deal Realized / Active", "Realized IRR", "Realized P & L", "Realized Date", "Commitment(Local)", "Legal Commitment", "ITD PM Adjustments(USD)", "IC / Discretionary Unfunded(USD)", "Adjusted Commitment(USD)", "Security_ID", "Security Name", "Investment Type"];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Deals setDBdeal={setDBdeal} />} />
          <Route path="deals" element={<Deals setDBdeal={setDBdeal} />} />
          <Route path="funds" element={<Funds DBdeal={DBdeal} setDBfund={setDBfund} />} />
          <Route path="mappings" element={<Mappings DBdeal={DBdeal} DBfund={DBfund} />} />
        </Route>
        <Route path="/upload" element={<Layout />}>
          <Route path="deals"
            element={<UploadFile
              objType={"Deals"}
              checkURL={DEAL_CHECK_URL}
              submitURL={DEAL_UPLOAD_URL}
              columns={DEAL_UPLOAD_COLUMNS} />} />
          <Route path="mappings"
            element={<UploadFile
              objType={"Mappings"}
              checkURL={MAPPING_CHECK_URL}
              submitURL={MAPPING_UPLOAD_URL}
              columns={MAPPING_UPLOAD_COLUMNS} />} />
        </Route>
        <Route path="/about" element={<Layout />}>
          <Route index element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
