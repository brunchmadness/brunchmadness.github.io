// Timer Function
let x

function startTimer() {
    x = setInterval(timer, 10);
  } 

  function stopTimer() {
    clearInterval(x);
  }

    let milisec = 0;
    let sec = 0; 
    let min = 0;

    let miliSecOut = 0;
    let secOut = 0;
    let minOut = 0;

function timer() {
  miliSecOut = checkTime(milisec);
  secOut = checkTime(sec);
  minOut = checkTime(min);

  milisec = ++milisec;

  if (milisec === 100) {
    milisec = 0;
    sec = ++sec;
  }

  if (sec == 60) {
    min = ++min;
    sec = 0;
  }

  document.getElementById("milisec").innerHTML = miliSecOut;
  document.getElementById("sec").innerHTML = secOut + ".";
  document.getElementById("min").innerHTML = minOut + ":";
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function resetTimer() {

  milisec = 0;
  sec = 0;
  min = 0

  document.getElementById("milisec").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";

}