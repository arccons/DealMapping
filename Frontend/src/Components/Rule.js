import React from "react";

export default function Rule({ parsedFile, rule, result }) {

   return (
      <>
         <h6>{rule}</h6>
         {result.map((rs, rsIndex) => {
            return <div key={rsIndex}><p>{parsedFile[rs].toString()}</p></div>
         })}
      </>
   )
}
