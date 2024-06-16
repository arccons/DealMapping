import React from "react";
import Rule from "./Rule";

export default function Results({ parsedFile, rules, results, setFailed }) {

   return (
      <>
         {rules.map((rl, rlIndex) => {
            return <>
               <Rule key={"Rule-" + (rlIndex + 1)}
                  parsedFile={parsedFile}
                  rule={rl}
                  result={results[rlIndex]}
                  setFailed={setFailed} />
               <br></br>
            </>;
         }
         )}
      </>
   );
}