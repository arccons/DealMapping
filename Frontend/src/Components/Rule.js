import React, { useState, useEffect } from "react";
import './Rule.css'

export default function Rule({ parsedFile, rule, result, setFailed }) {
   const [ruleColor, setRuleColor] = useState('failed-rule');

   useEffect(() => {
      result.length !== 0 ? setFailed(true) : setRuleColor('passed-rule');
   }, [result.length, setFailed])

   return (
      <>
         <p className={ruleColor}><b>{rule}</b></p>
         {result.map((rs, rsIndex) => {
            return (<div key={"Result-" + rsIndex}><p>{parsedFile[rs].toString()}</p></div>);
         })}
      </>
   );
}
