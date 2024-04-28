import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import Layout from "./Layout";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import About from "./pages/About";

import DealList from './pages/DealList';
//import DealEdit from './pages/DealEdit';

function App() {
  const [pageMsg, setPageMsg] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout pageMsg={pageMsg} />}>
          <Route index element={<DealList setPageMsg={setPageMsg} />} />
          {/* <Route path="dealEdit" element={<DealEdit setPageMsg={setPageMsg}/>} /> */}
          <Route path="contact" element={<Contact setPageMsg={setPageMsg} />} />
          <Route path="about" element={<About setPageMsg={setPageMsg} />} />
          <Route path="*" element={<NoPage setPageMsg={setPageMsg} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
