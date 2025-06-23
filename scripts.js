// Show/hide email
$('#email-link').click(function (e) {
  e.preventDefault();
  $(this).text('thakurg3@udayton.edu');
});

// Digital Clock
function updateDigitalClock() {
  $('#digital-clock').text(new Date().toLocaleTimeString());
}
setInterval(updateDigitalClock, 1000);
updateDigitalClock();

// Analog Clock
const canvas = document.getElementById('analog-clock');
const ctx = canvas.getContext('2d');
const radius = canvas.height / 2;
ctx.translate(radius, radius);
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = radius * 0.05;
  ctx.stroke();
}

function drawNumbers(ctx, radius) {
  let ang;
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let num = 1; num <= 12; num++) {
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  hour = hour % 12;
  hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60));
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);
  minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);
  second = (second * Math.PI / 30);
  drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

// JokeAPI
async function fetchJoke() {
  const res = await fetch('https://v2.jokeapi.dev/joke/Any');
  const data = await res.json();
  $('#joke').text(data.setup ? `${data.setup} — ${data.delivery}` : data.joke);
}
fetchJoke();
setInterval(fetchJoke, 60000);

// XKCD comic
async function fetchComic() {
  const res = await fetch('https://xkcd.now.sh/?comic=latest');
  const data = await res.json();
  $('#comic').attr('src', data.img).attr('alt', data.alt);
}
fetchComic();

// Cookies: Welcome back message
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

const lastVisit = getCookie('lastVisit');
const now = new Date().toString();
if (!lastVisit) {
  alert('Welcome to my homepage for the first time!');
} else {
  alert(`Welcome back! Your last visit was ${lastVisit}`);
}
setCookie('lastVisit', now, 365);
