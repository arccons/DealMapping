import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import CSVReader from "react-csv-reader";
//import _ from "lodash";
import Results from "../Components/Results";

export default function UploadFile({ objType, checkURL, submitURL, columns }) {

   const [parsedFile, setParsedFile] = useState([]);
   const [rules, setRules] = useState([]);
   const [results, setResults] = useState([]);

   const [applicableDate, setApplicableDate] = useState(getApplicableDate());
   const [fileSelected, setFileSelected] = useState(false);
   const [fileChecked, setFileChecked] = useState(false);
   const [showResults, setShowResults] = useState(false);
   const [failed, setFailed] = useState(false);

   const [pageMsg, setPageMsg] = useState("");

   function getApplicableDate() {
      let today = new Date();
      const dayToday = today.getDay();
      if (dayToday === 1) { today.setDate(today.getDate() - 3); }
      else if (dayToday === 0) { today.setDate(today.getDate() - 2); }
      else { today.setDate(today.getDate() - 1); }
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      const year = today.getFullYear();
      const dateStr = `${year}-${month}-${day}`;
      return dateStr;
   }

   useEffect(() => {
      setApplicableDate(getApplicableDate);
   }, []);

   function processFile(fileData) {
      // DOES NOT HANDLE FILES WITH WRONG COLUMNS THAT ARE EMPTY
      if (fileData.length !== 0) {
         fileData.pop(); // LAST ROW EXISTS BECAUSE OF CSVReader
         if (fileData.length !== 0) {
            const fileColumns = fileData.shift(); // HEADER ROW EXPECTED
            //if (fileData.length !== 0 && !_.isEqual(fileColumns, columns)) {
            if (fileData.length !== 0 && fileColumns.length !== columns.length) {
               return null;
            }
         }
      }
      return fileData;
   }

   function handleFileSelect(fileData) {
      const processedFile = processFile(fileData);
      if (!Array.isArray(processedFile)) {
         const errMsg = "Expected file format not found.";
         setPageMsg(errMsg);
         document.getElementById("fileError").innerHTML = errMsg;
         setParsedFile([]);
         setFileSelected(false);
         setShowResults(false);
         setFailed(false);
      } else {
         if (processedFile.length === 0) {
            const errMsg = "Empty file selected.";
            setPageMsg(errMsg);
            document.getElementById("fileError").innerHTML = errMsg;
            setParsedFile([]);
            setFileSelected(false);
            setShowResults(false);
            setFailed(false);
         } else {
            document.getElementById("fileError").innerHTML = "";
            setParsedFile(processedFile);
            setFileSelected(true);
            setFileChecked(false);
            setShowResults(false);
            setFailed(false);
            setPageMsg("File selected.")
         }
      }
   }

   function handleFileCheck(event) {
      setFileChecked(false);
      setShowResults(false);
      setFailed(false);
      const fileAsJSON = JSON.stringify(parsedFile);
      const formData = new FormData();
      formData.append('parsedFile', fileAsJSON);
      formData.append('applicableDate', applicableDate);
      const config = { headers: { 'content-type': 'text/json' }, };
      axios.post(checkURL, formData, config)
         .then((response) => {
            const tempRules = JSON.parse(response.data.RULES);
            setRules(tempRules);
            const tempResults = JSON.parse(response.data.RESULTS);
            setResults(tempResults);
            setFileChecked(true);
            setShowResults(true);
            setPageMsg(response.data.message);
         })
         .catch((error) => {
            setFileChecked(false);
            setShowResults(false);
            const errMsg = error.message;
            setPageMsg(errMsg);
            console.error("error: ", errMsg);
         });
   }

   function handleFileUpload(event) {
      const fileAsJSON = JSON.stringify(parsedFile);
      const formData = new FormData();
      formData.append('parsedFile', fileAsJSON);
      formData.append('applicableDate', applicableDate);
      const config = {
         headers: {
            'content-type': 'text/json'
         },
      };
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
      setPageMsg("File selected.");
   }

   return (
      <>
         <CSVReader id="fileToUpload"
            required
            onFileLoaded={(data, fileInfo, originalFile) => handleFileSelect(data)}
         />
         <p id="fileError"></p>
         <b>{objType === "Mappings" && "Applicable to " + applicableDate}</b>
         <br></br>
         {fileSelected && <Button onClick={handleFileCheck}>Check File</Button>}
         {showResults &&
            <Results
               parsedFile={parsedFile}
               rules={rules}
               results={results}
               setFailed={setFailed} />
         }
         {fileChecked && showResults &&
            <>
               {!failed && <Button onClick={handleFileUpload}>Upload File</Button>}
               <Button onClick={handleCancel}>Cancel</Button>
            </>
         }
         <br></br>
         {pageMsg}
      </>
   )
}
