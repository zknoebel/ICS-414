var workHours = 0;
var breakTime = 0;

var startWorkTimer;
var startBreakTimer;
var continueWorkTimer;

document.getElementById('start').onclick = switchGreen;
document.getElementById('resume').onclick = switchGreen;
document.getElementById('break_').onclick = switchRed;
document.getElementById('end').onclick = switchPaleGoldenRod;

function switchGreen() {
  document.getElementsByTagName('body')[0].style.backgroundColor = 'green';
  document.getElementsByTagName('body')[0].style.color = 'green';
}

function switchRed() {
  document.getElementsByTagName('body')[0].style.backgroundColor = 'red';
  document.getElementsByTagName('body')[0].style.color = 'red';
}

function switchPaleGoldenRod() {
  document.getElementsByTagName('body')[0].style.backgroundColor = 'palegoldenrod';
  document.getElementsByTagName('body')[0].style.color = 'palegoldenrod';
}


document.getElementById('start').addEventListener('click', (e) => {
  event.preventDefault();
  startWorkTimer = setInterval(() => {
    workHours++;
    document.getElementById('work-time').innerHTML = timeFormat(workHours);
  }, 1000)

  document.getElementById('start').disabled = true;
  document.getElementById('break_').disabled = false;
  document.getElementById('resume').disabled = true;
  document.getElementById('end').disabled = false;

  document.getElementById('break-time').style.borderColor = '#000000'
  document.getElementById('work-time').style.borderColor = '#6cfc6e';
});


document.getElementById('break_').addEventListener('click', (e) => {
  event.preventDefault();
  clearInterval(startWorkTimer);
  clearInterval(continueWorkTimer);

  startBreakTimer = setInterval(() => {
    breakTime++;
    document.getElementById('break-time').innerHTML = timeFormat(breakTime);;
  }, 1000)

  document.getElementById('work-time').style.borderColor = '#000000'
  document.getElementById('break-time').style.borderColor = '#f94848';

  document.getElementById('start').disabled = true;
  document.getElementById('break_').disabled = true;
  document.getElementById('resume').disabled = false;
  document.getElementById('end').disabled = false;

});


document.getElementById('end').addEventListener('click', (e) => {
  event.preventDefault();
  clearInterval(startWorkTimer);
  clearInterval(continueWorkTimer);
  clearInterval(startBreakTimer);

  document.getElementById('work-time').innerHTML = "0 %";
  document.getElementById('break-time').innerHTML = "0 %";
  workHours = 0;
  breakTime = 0;

  document.getElementById('work-time').style.borderColor = '#000000';
  document.getElementById('break-time').style.borderColor = '#000000';

  document.getElementById('start').disabled = false;
  document.getElementById('break_').disabled = true;
  document.getElementById('resume').disabled = true;
  document.getElementById('end').disabled = true;

});


document.getElementById('resume').addEventListener('click', (e) => {
  event.preventDefault();
  clearInterval(startBreakTimer);

  continueWorkTimer = setInterval(() => {
    workHours++;
    document.getElementById('work-time').innerHTML = timeFormat(workHours);
  }, 1000)

  document.getElementById('work-time').style.borderColor = '#6cfc6e';
  document.getElementById('break-time').style.borderColor = '#000000';
  document.getElementById('start').disabled = true;
  document.getElementById('break_').disabled = false;
  document.getElementById('resume').disabled = true;
  document.getElementById('end').disabled = false;

});

// credit for https://stackoverflow.com/a/42091810/7997431


var timeFormat = function (counter) { // receive counter from interval function and returns string in time format
                                      // display data format depending on counter value. With a condition checks weather counter lesser than 10 or not.
  var display = function(counter) {return counter < 10 ? + counter : counter;};
  return [ // return an array with three elements ["hours", "minutes", "seconds"]
    //display(Math.floor(counter / 3600)), // convert seconds to hours
    //display(Math.floor(counter % 3600 / 60)), // convert seconds to minutes
    display(Math.floor(counter % 60) + " %"),// the reminds after extracting houts and minuts
  ].join( '' );// convert the array to string to be displayed.
}
