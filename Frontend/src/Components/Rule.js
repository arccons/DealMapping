import React, { useState, useEffect } from "react";
import './Rule.css'

export default function Rule({ parsedFile, rule, result, setFailed }) {
   const [ruleColor, setRuleColor] = useState('failed-rule');

   useEffect(() => {
      result.length !== 0 ? setFailed(true) : setRuleColor('passed-rule');
   }, [result.length, setFailed])

   return (
      <>
         <h6 className={ruleColor}>{rule}</h6>
         {result.map((rs, rsIndex) => {
            return <div key={rsIndex}><p>{parsedFile[rs].toString()}</p></div>
         })}
      </>
   )
}
