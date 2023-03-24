import Notiflix from 'notiflix';
const formDelay = document.querySelector('.form');
formDelay.addEventListener('submit', onFormSubmit);

function onFormSubmit(ev) {
  ev.preventDefault();
  const {
    elements: { delay, step, amount },
  } = ev.currentTarget;
  let delayEl = Number(delay.value);
  let stepEl = Number(step.value);
  let amountEl = Number(amount.value);
  if (delayEl < 0 || stepEl < 0 || amountEl <= 0) {
    Notiflix.Notify.warning(`All data must be positive`);
    formDelay.reset();
    return;
  }
  for (let position = 1; position <= amountEl; position += 1) {
    // delayEl = delayEl + stepEl * (position - 1);

    createPromise(position, delayEl)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayEl += stepEl;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
// final//
