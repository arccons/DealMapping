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
   //const [fileSubmitted, setFileSubmitted] = useState(false);
   const [fileChecked, setFileChecked] = useState(false);
   const [showResults, setShowResults] = useState(false);
   //const [fileUploaded, setFileUploaded] = useState(false);
   const [failed, setFailed] = useState(false);

   const [pageMsg, setPageMsg] = useState("");

   function handleFileSelect(fileData) {
      console.log("CheckDeals.js: handleFileSelect entered ...");
      console.log("CheckDeals.js: handleFileSelect(fileData)");
      if (fileData.length !== 0) {
         fileData.pop(); // LAST ROW EXISTS BECAUSE OF CSVReader
      }
      if (fileData.length !== 0) {
         fileData.shift(); // HEADER ROW EXPECTED
      }
      if (fileData.length === 0) {
         document.getElementById("fileError").innerHTML = "Empty file selected";
         setFileSelected(false);
      } else {
         document.getElementById("fileError").innerHTML = "";
         setParsedFile(fileData);
         setFileSelected(true);
         //setFileSubmitted(false);
         setFileChecked(false);
         setShowResults(false);
         // setFileUploaded(false);
      }
   }

   function handleFileSubmit(event) {
      console.log("CheckDeals.js: handleFileSubmit entered ...");
      //setFileSubmitted(true);
      setFileChecked(false);
      setShowResults(false);
      //setFileUploaded(false);
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
            const tempRules = JSON.parse(response.data.rules);
            const tempResults = JSON.parse(response.data.results);
            setRules(tempRules);
            setResults(tempResults);
            setFileChecked(true);
            setShowResults(true);
            //setFileUploaded(false);
            setPageMsg(response.data.message);
         })
         .catch((error) => {
            //setFileSubmitted(false);
            setFileChecked(false);
            setShowResults(false);
            //setFileUploaded(false);
            const errMsg = JSON.parse(error);
            setPageMsg(errMsg);
            console.error("error: ", errMsg);
         });
   }

   function handleFileUpload(event) {
      console.log("CheckDeals.js: handleFileUpload entered ...");
      //setFileUploaded(false);
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
            //setFileUploaded(true);
            setShowResults(false);
            setPageMsg(response.data.message);
         })
         .catch((error) => {
            //setFileUploaded(false);
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
