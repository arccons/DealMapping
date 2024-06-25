import React from "react";
import Rule from "./Rule";

export default function Results({ parsedFile, rules, results, setFailed }) {

   return (
      <>
         <h4>File check results</h4>
         {rules.map((rl, rlIndex) => {
            return (
               <Rule key={"Rule-" + rlIndex}
                  parsedFile={parsedFile}
                  rule={rl}
                  result={results[rlIndex]}
                  setFailed={setFailed} />
            );
         }
         )}
      </>
   );
}
