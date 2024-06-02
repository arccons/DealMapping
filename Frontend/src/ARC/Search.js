import "../App.css";

import React, { useEffect, useState } from "react";

export default function Search({ initialDataList, setCurrentDataList, search_parameters, placeholder }) {

   const [currentData, setCurrentData] = useState([]);
   const [query, setQuery] = useState("");

   useEffect(() => {
      setCurrentData(initialDataList);
   }, [initialDataList]);

   function search() {
      console.log("search_parameters = " + search_parameters.toString());
      if (query !== '') {
         let queryStr = query.toString().toLowerCase();
         let searchResults = currentData.filter(d =>
            search_parameters.some(param => d[param.toString()].toString().toLowerCase().includes(queryStr)));
         console.log("searchResults = " + searchResults);
         return searchResults;
      }
      else {
         return initialDataList;
      }
   }

   function handleSearchQuery(event) {
      setQuery(event.target.value);
      setCurrentDataList(search());
   }

   return (
      <div className=".container-fluid">
         <div className="input-box" data-mdb-input-init>
            <input
               type="Search"
               name="search-form"
               id="search-form"
               className="form-control"
               onChange={handleSearchQuery}
               placeholder={placeholder}
            />
         </div>
      </div>
   );
}
