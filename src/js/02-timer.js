// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const dateInput = document.querySelector('#datetime-picker');

const buttonEl = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkData(selectedDates[0]);
  },
};

buttonEl.setAttribute('disabled', true);
// кнопка не активна пока пользователь не выбрал дату
flatpickr('#datetime-picker', options);
let userTime = null;
let currentTime = null;
let timerID = null;

buttonEl.addEventListener('click', startTimer);

function startTimer() {
  buttonEl.setAttribute('disabled', true);
  timerID = setInterval(() => {
    currentTime = Date.now();
    let delta = userTime - currentTime;
    if (userTime <= currentTime) {
      clearInterval(timerID);
      Notiflix.Notify.failure('Your time is up');
      return;
    }
    const normaliseDateTime = convertMs(delta);
    console.log(delta);
    updateFaveClock(normaliseDateTime);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function checkData(selectedDates) {
  userTime = selectedDates.getTime();
  currentTime = Date.now();
  if (userTime < currentTime) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    buttonEl.removeAttribute('disabled');
  }
  console.log(`user ${userTime}`, `current ${currentTime}`);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));

  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function updateFaveClock({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}
// final 3
