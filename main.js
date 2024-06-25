import { generateReturnsArray } from "./src/investimentGoals";

const form = document.getElementById("investiment-form");
const clear_btn = document.getElementById("clear-results");

function renderProgression(event){
    event.preventDefault();
    const startingAmount = Number(document.getElementById("starting-amount").value);
    const additionalContribution = Number(document.getElementById("additional-contribution").value);
    const timeAmount = Number(document.getElementById('time-amount').value);
    const timePeriod = document.getElementById('time-period').value;
    const returnRate = Number(document.getElementById('return-rate').value);
    const returnRatePeriod = document.getElementById('return-rate-period').value;
    const taxRate = Number(document.getElementById("tax-rate").value);


    const returnsArray = generateReturnsArray(startingAmount, timeAmount, timePeriod, 
                                              additionalContribution, returnRate, returnRatePeriod);

    console.log(returnsArray);
}

form.addEventListener("submit", renderProgression);