const convertTime = (timestamp) => {
   var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   var date = new Date(timestamp * 1000);
   var year = date.getFullYear();
   var month = months[date.getMonth()];
   var day = date.getDate();

   // Will display time in 10:30:23 format
   var formattedTime = day + ' ' + month + ' ' + year;
   return formattedTime;
}

export default convertTime;