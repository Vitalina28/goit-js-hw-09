import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[ name="amount"]');

form.addEventListener('submit', onStart);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

function onStart(event) {
  event.preventDefault();
  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

 for (let i = 1; i <= amount; i++) {
    
    const currentDelay = delay + step* (i-1);

    createPromise(i, currentDelay)
    .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  })
 
}
    
}


// form.addEventListener('submit', handleFormSubmit);

// function handleFormSubmit(event) {
//     event.preventDefault();
//     const firstDelay = parseInt(form.elements['delay'].value);
//     const step = parseInt(form.elements['step'].value);
//     const amount = parseInt(form.elements['amount'].value);

//     for (let i = 0; i < amount; i++) {
//         const currentDelay = firstDelay + i * step;
//         createPromise(i + 1, currentDelay)
//             .then(({ position, delay }) => {
//                 Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
//             })
//             .catch(({ position, delay }) => {
//                 Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
//             });
//     }
// }

// function createPromise(position, delay) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const shouldResolve = Math.random() > 0.3;
//             if (shouldResolve) {
//                 resolve({ position, delay });
//             } else {
//                 reject({ position, delay });
//             }
//         }, delay);
//     });
// }