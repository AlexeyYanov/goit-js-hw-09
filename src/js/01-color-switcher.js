function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
console.log(bodyEl);
let intervalId = null;
btnStart.addEventListener('click', () => {
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
});
// function onColorChange() {
//   intervalId = setInterval(() => {
//     bodyEl.style.backgroundColor = getRandomHexColor();
//   }, 1000);
//   btnStart.setAttribute('disabled', true);
//   btnStop.removeAttribute('disabled');
// }
btnStop.addEventListener('click', () => {
  clearInterval(intervalId);
  btnStop.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled');
});

// startBtn.addEventListener('click', () => {
//   timerId = setInterval(() => {
//     console.log(`I love async JS!  ${Math.random()}`);
//   }, 1000);
// });

// stopBtn.addEventListener('click', () => {
//   clearInterval(timerId);
//   console.log(`Interval with id ${timerId} has stopped!`);
// });
