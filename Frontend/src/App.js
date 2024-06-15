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
import CheckDeals from './pages/CheckDeals';
import Reports from './pages/Reports';

export default function App() {
  const [DBdeal, setDBdeal] = useState();
  const [DBfund, setDBfund] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Deals setDBdeal={setDBdeal} />} />
          <Route path="funds" element={<Funds DBdeal={DBdeal} setDBfund={setDBfund} />} />
          <Route path="mappings" element={<Mappings DBdeal={DBdeal} DBfund={DBfund} />} />
        </Route>
        <Route path="/checkDeals" element={<Layout />}>
          <Route index element={<CheckDeals />} />
        </Route>
        <Route path="/reports" element={<Layout />}>
          <Route index element={<Reports />} />
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
