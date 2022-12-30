// current date 
var date = moment().format('MMMM Do YYYY');
console.log(date);
$('#current-date').text(date);

// current time
var time = moment().format('HH:mm a');
$('#current-time').text(time);

