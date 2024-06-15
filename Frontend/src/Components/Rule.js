import React, { useState, useEffect } from "react";
import './Rule.css'

export default function Rule({ parsedFile, rule, result }) {
   const [ruleColor, setRuleColor] = useState();

   useEffect(() => {
      result.length === 0 ? setRuleColor('passed-rule') : setRuleColor('failed-rule')
   }, [result.length])

   return (
      <>
         <h6 className={ruleColor}>{rule}</h6>
         {result.map((rs, rsIndex) => {
            return <div key={rsIndex}><p>{parsedFile[rs].toString()}</p></div>
         })}
      </>
   )
}
