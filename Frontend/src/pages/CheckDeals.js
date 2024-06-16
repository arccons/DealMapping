import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Results from "../Components/Results";
import CSVReader from 'react-csv-reader';

export default function CheckDeals() {

   const [parsedFile, setParsedFile] = useState([]);
   const [rules, setRules] = useState([]);
   const [results, setResults] = useState([]);

   const [fileSelected, setFileSelected] = useState(false);
   const [fileChecked, setFileChecked] = useState(false);
   const [showResults, setShowResults] = useState(false);
   const [failed, setFailed] = useState(false);

   const [pageMsg, setPageMsg] = useState("");

   function handleFileSelect(fileData) {
      if (fileData.length !== 0) {
         fileData.pop(); // LAST ROW EXISTS BECAUSE OF CSVReader
      }
      if (fileData.length !== 0) {
         fileData.shift(); // HEADER ROW EXPECTED
      }
      if (fileData.length === 0) {
         document.getElementById("fileError").innerHTML = "Empty file selected";
         setParsedFile([]);
         setFileSelected(false);
         setShowResults(false);
         setFailed(false);
      } else {
         document.getElementById("fileError").innerHTML = "";
         setParsedFile(fileData);
         setFileSelected(true);
         setFileChecked(false);
         setShowResults(false);
         setFailed(false);
      }
   }

   function handleFileSubmit(event) {
      setFileChecked(false);
      setShowResults(false);
      setFailed(false);
      const fileAsJSON = JSON.stringify(parsedFile);
      const checkURL = "http://localhost:8000/checkDeals";
      const formData = new FormData();
      formData.append('parsedFile', fileAsJSON);
      const config = {
         headers: {
            'content-type': 'text/json'
         },
      };
      axios.post(checkURL, formData, config)
         .then((response) => {
            const tempRules = JSON.parse(response.data.RULES);
            const tempResults = JSON.parse(response.data.RESULTS);
            setRules(tempRules);
            setResults(tempResults);
            setFileChecked(true);
            setShowResults(true);
            setPageMsg(response.data.message);
         })
         .catch((error) => {
            setFileChecked(false);
            setShowResults(false);
            const errMsg = JSON.parse(error);
            setPageMsg(errMsg);
            console.error("error: ", errMsg);
         });
   }

   function handleFileUpload(event) {
      const fileAsJSON = JSON.stringify(parsedFile);
      const formData = new FormData();
      formData.append('parsedFile', fileAsJSON);
      const config = {
         headers: {
            'content-type': 'text/json'
         },
      };
      const submitURL = "http://localhost:8000/uploadMappings";
      axios.post(submitURL, formData, config)
         .then((response) => {
            setRules([]);
            setResults([]);
            setShowResults(false);
            setFailed(false);
            setPageMsg(response.data.message);
         })
         .catch((error) => {
            setPageMsg(error.message);
            console.error("error.message: ", error.message);
         });
   }

   function handleCancel() {
      setShowResults(false);
   }

   return (
      <>
         <h4>Check Deals</h4>
         <form id="FileForm">
            <label htmlFor="fileToUpload">Select Mappings File:</label>
            <CSVReader id="fileToUpload" autoFocus required
               onFileLoaded={(data, fileInfo, originalFile) => {
                  console.log(data, fileInfo, originalFile);
                  handleFileSelect(data);
               }} />
            <p id="fileError"></p>
            {fileSelected && <Button disabled={!fileSelected} onClick={handleFileSubmit}>Check File</Button>}
         </form>
         {showResults && <Results parsedFile={parsedFile} rules={rules} results={results} setFailed={setFailed} />}
         {fileChecked && showResults &&
            <>
               {!failed && <Button onClick={handleFileUpload}>Upload File</Button>}
               <Button onClick={handleCancel}>Cancel</Button>
            </>}
         <br />
         {pageMsg}
      </>
   )
}
