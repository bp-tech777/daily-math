// app.js

// --- CONFIGURATION ---
const HINT_LOCKOUT_SECONDS = 60; 
// ---------------------

const today = new Date();

// 1. Format the date in Bulgarian
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('current-date').innerText = today.toLocaleDateString('bg-BG', options);

// 2. Safely calculate days since the reference date
// We split the string and create local dates at midnight to avoid timezone/Daylight Saving bugs
const [refYear, refMonth, refDay] = referenceDate.split("-");
const refMidnight = new Date(refYear, refMonth - 1, refDay); 
const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

const msPerDay = 24 * 60 * 60 * 1000;
// We use Math.round to safely handle Daylight Saving Time shifts
let daysSince = Math.round((todayMidnight - refMidnight) / msPerDay);

// Prevent negative numbers if you test the page before the reference date arrives
if (daysSince < 0) daysSince = 0;

// Use modulo to safely loop back to the beginning if the batch runs out
const problemIndex = daysSince % mathProblems.length;
const todaysProblem = mathProblems[problemIndex];

// 3. Inject the question and image
document.getElementById('question-container').innerHTML = todaysProblem.question;

if (todaysProblem.image !== "") {
    document.getElementById('image-container').innerHTML = `<img src="${todaysProblem.image}" alt="Math Problem Image">`;
}

// 4. Hint and Timer Logic (with Bulgarian translations)
const hintBtn = document.getElementById('hint-btn');
const hintContainer = document.getElementById('hint-container');

if (todaysProblem.hint && todaysProblem.hint.trim() !== "") {
    hintContainer.innerHTML = todaysProblem.hint;
    
    let timeLeft = HINT_LOCKOUT_SECONDS;
    
    hintBtn.innerText = `Подсказка ще е достъпна след ${timeLeft} сек.`;
    
    const timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            hintBtn.innerText = `Подсказка ще е достъпна след ${timeLeft} сек.`;
        } else {
            clearInterval(timerInterval);
            hintBtn.innerText = "Покажи подсказка.";
            hintBtn.disabled = false;
        }
    }, 1000); 

} else {
    hintBtn.style.display = "none";
}

hintBtn.addEventListener('click', () => {
    if (hintContainer.style.display === "none" || hintContainer.style.display === "") {
        hintContainer.style.display = "block";
        hintBtn.innerText = "Скрий подсказката.";
    } else {
        hintContainer.style.display = "none";
        hintBtn.innerText = "Покажи подсказката.";
    }
});