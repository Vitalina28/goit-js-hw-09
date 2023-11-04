import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onStart);

function onStart(event) {
  // event.preventDefault();
  const delay = document.querySelector('input[name="delay"]').value;
  const step = document.querySelector('input[name="step"]').value;
  const amount = document.querySelector('input[ name="amount"]').value;


  for (let i = 0; i <= amount; i += 1) {
    createPromise(i, delay + (i - 1) * step)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
           Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
          });
  }
 
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({position,delay});
      }
    }, delay);
  });
}

document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector(".form");

        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const formData = new FormData(form);
          const delay = parseInt(formData.get("delay"));
          const step = parseInt(formData.get("step"));
          const amount = parseInt(formData.get("amount"));

          let currentDelay = delay;

          for (let i = 1; i <= amount; i++) {
            createPromise(i, currentDelay)
              .then(({ position, delay }) => {
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
              })
              .catch(({ position, delay }) => {
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
              });

            currentDelay += step;
          }
        });
      });