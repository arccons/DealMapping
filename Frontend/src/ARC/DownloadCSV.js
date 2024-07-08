import React from 'react';
import { Button } from 'react-bootstrap';

export default function DownloadCSV({ data, fileName, columns }) {

   const convertToCSV = (objArray) => {

      const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      let str = columns.toString() + '\r\n';
      for (let i = 0; i < array.length; i++) {
         let line = '';
         for (let index in array[i]) {
            if (line !== '') line += ',';
            let item = array[i][index];
            item = item === 'None' ? '' : item;
            line += item;
         }
         str += line + '\r\n';
      }
      return str;
   };

   const downloadCSV = () => {
      const csvData = new Blob([convertToCSV(data)], { type: 'text/csv' });
      const csvURL = URL.createObjectURL(csvData);
      const link = document.createElement('a');
      link.href = csvURL;
      link.download = `${fileName}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   };

   return (
      <Button onClick={downloadCSV} className='m-3'>Download CSV</Button>
   );
}
