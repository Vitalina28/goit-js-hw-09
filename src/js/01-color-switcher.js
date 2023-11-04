const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

let nIntervId = null;

refs.startBtn.addEventListener('click', colorRandom);
refs.stopBtn.addEventListener('click', stopColorRandom);
 
function colorRandom() {
    if (!nIntervId) {
        nIntervId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor()
        }, 1000);
    }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
 }

function stopColorRandom() {
    clearInterval(nIntervId);
    nIntervId = null;
}

