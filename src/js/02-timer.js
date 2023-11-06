import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector("button[data-start]");
const datePicker = document.querySelector("#datetime-picker");
const timer = document.querySelector('.timer');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');
const fields = document.querySelectorAll('.field');
const timeItem = document.querySelectorAll('.value');

timer.style.display = "flex";

fields.forEach(({ style }) => {
  style.display = 'flex';
  style.flexDirection = 'column';
  style.textTransform = 'uppercase';
  style.textAlign = 'center';
  style.fontSize = '12px';
  style.marginRight = '10px';
})
 

for (let i = 0; i < timeItem.length; i += 1){
  timeItem[i].style.fontSize = '30px';
}

startBtn.setAttribute("disabled", true);

startBtn.addEventListener('click', onClick);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
        if (selectedDate > Date.now()) {
            startBtn.removeAttribute('disabled');
        } else {
            Notiflix.Notify.failure("Please choose a date in the future");
          startBtn.setAttribute("disabled", true);
        }
    },
};

flatpickr(datePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return {days, hours, minutes, seconds};
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


function onClick() {
    const endDate = new Date(datePicker.value);
  const timeId = setInterval(() => {
    const currentDate = new Date();
    const timeDifferent = endDate - currentDate;

    if (timeDifferent <= 0) {
      clearInterval(timeId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifferent);

    day.textContent = addLeadingZero(days);
    hour.textContent= addLeadingZero(hours);
    minute.textContent = addLeadingZero(minutes);
    second.textContent = addLeadingZero(seconds);
  }, 1000);
}
