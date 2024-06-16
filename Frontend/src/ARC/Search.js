import React, { useEffect, useState } from "react";

export default function Search({ initialDataList, setDisplayList, search_parameters, placeholder }) {

   const [currentDataList, setCurrentDataList] = useState([]);

   useEffect(() => {
      console.log("Search.js: useEffect entered.");
      setCurrentDataList(initialDataList);
   }, [initialDataList]);

   function search(queryStr) {
      if (queryStr !== '') {
         const searchQuery = queryStr.toString().trim();
         console.log("Search.js.search(): searchQuery = " + searchQuery);
         // Does not work with fields with null values
         const searchResults = initialDataList.filter(d => search_parameters.some(param =>
            d[param.toString()].toString().toLowerCase().includes(searchQuery.toLowerCase())));
         console.log("Search.js.search(): searchResults = " + searchResults);
         return searchResults;
      }
      else {
         return initialDataList;
      }
   }

   function handleSearchQuery(event) {
      const queryStr = event.target.value.trim();
      const searchResults = search(queryStr);
      setCurrentDataList(searchResults);
      setDisplayList(searchResults);
      console.log("handleSearchQuery.queryStr = " + queryStr);
      console.log("handleSearchQuery.searchResults = " + searchResults);
      console.log("handleSearchQuery.currentDataList = " + currentDataList);
   }

   return (
      <div className=".container-fluid">
         <div>
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
