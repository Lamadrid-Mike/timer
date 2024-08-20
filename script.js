const container = document.querySelector(".navbar__container");
const movingDiv = document.querySelector(".moving__div");
const countDisplay = document.querySelector(".count__display");
const countHidden = document.querySelector(".count__hidden");
const displayDays = document.querySelector(".days");
const displayHours = document.querySelector(".hours");
const displayMins = document.querySelector(".minutes");
const displaySecs = document.querySelector(".seconds");

let x = 0;
let y = 0;
let dx = 2;
let dy = 2;

// moving div interval ------

function moveDiv() {
  const containerRect = container.getBoundingClientRect();
  const maxX = containerRect.width - movingDiv.offsetWidth;
  const maxY = containerRect.height - movingDiv.offsetHeight;

  x += dx;
  y += dy;

  if (x >= maxX || x <= 0) {
    dx = -dx;
  }

  if (y >= maxY || y <= 0) {
    dy = -dy;
  }

  movingDiv.style.left = `${x}px`;
  movingDiv.style.top = `${y}px`;
}

let futureDate, id;

// time conversion function --------
function displayTime(formDate) {
  let currentDate = new Date();
  // ISO 8601 format
  let futureDate = formDate;

  let diff = futureDate - currentDate;

  // Convert milliseconds to days, hours, minutes, and seconds
  let diffInSeconds = Math.floor(diff / 1000);
  let days = Math.floor(diffInSeconds / (24 * 60 * 60));
  diffInSeconds -= days * 24 * 60 * 60;
  let hours = Math.floor(diffInSeconds / (60 * 60));
  diffInSeconds -= hours * 60 * 60;
  let minutes = Math.floor(diffInSeconds / 60);
  let seconds = diffInSeconds - minutes * 60;

  displayDays.innerHTML = days;
  displayHours.innerHTML = hours;
  displayMins.innerHTML = minutes;
  displaySecs.innerHTML = seconds;
}

// mouse hover listener -----
movingDiv.addEventListener("mouseenter", function (e) {
  e.preventDefault();
  clearInterval(id);
  setInterval(() => displayTime(futureDate), 1000);
  countDisplay.style.display = "none";
  countHidden.style.display = "block";
  countHidden.style.animation = "fade-in forwards 0.8s";
  movingDiv.style.position = "static";
});

// reading date from txt file -----
const url = "./data/date.txt";
fetch(url)
  .then((res) => {
    return res.text();
  })
  .then((txt) => {
    futureDate = new Date(txt.replace(/[\n\r]/g, ""));
    if (futureDate > new Date()) {
      // id for the moving div
      clearInterval(id);
      id = setInterval(moveDiv, 10);
      movingDiv.style.display = "block";
      displayTime(futureDate);
    } else {
      alert("Pick correct date");
    }
  });
