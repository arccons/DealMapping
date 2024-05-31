export function ARC_handleSelectChange_NULL(nullField, changedField, setter) {
   const nullVal = document.getElementById(nullField).checked;
   console.log(nullField + " nullVal = " + nullVal);
   let enteredVal = document.getElementById(changedField).value;
   console.log(changedField + " enteredVal = " + enteredVal);
   if (nullVal === true) {
      setter('');
   }
   else if (nullVal === false) {
      if (enteredVal !== '-1') {
         setter(enteredVal);
      }
   }
}

export function ARC_handleSelectChange(changedField, setter) {
   let enteredVal = document.getElementById(changedField).value;
   console.log(changedField + " enteredVal = " + enteredVal);
   if (enteredVal !== '-1') {
      setter(enteredVal);
   }
}

export function ARC_handleTextChange_NULL(nullField, changedField, setter) {
   const nullVal = document.getElementById(nullField).checked;
   console.log(nullField + " nullVal = " + nullVal);
   let enteredVal = document.getElementById(changedField).value;
   console.log(changedField + " enteredVal = " + enteredVal);
   if (nullVal === true) {
      setter(null);
   }
   else if (nullVal === false) {
      if (enteredVal !== null) {
         setter(enteredVal);
      }
   }
}

export function ARC_handleTextChange(changedField, setter) {
   let enteredVal = document.getElementById(changedField).value;
   console.log(changedField + " enteredVal = " + enteredVal);
   if (enteredVal !== null) {
      setter(enteredVal);
   }
}

export function ARC_handleDateChange_NULL(nullField, changedField, setter) {
   const nullVal = document.getElementById(nullField).checked;
   console.log(nullField + " nullVal = " + nullVal);
   let enteredVal = document.getElementById(changedField).value;
   console.log(changedField + " enteredVal = " + enteredVal);
   if (nullVal === true) {
      setter('');
   }
   else if (nullVal === false) {
      if (enteredVal !== null) {
         setter(enteredVal);
      }
   }
}

export function ARC_handleDateChange(changedField, setter) {
   let enteredVal = document.getElementById(changedField).value;
   console.log(changedField + " enteredVal = " + enteredVal);
   if (enteredVal !== null) {
      setter(enteredVal);
   }
}
