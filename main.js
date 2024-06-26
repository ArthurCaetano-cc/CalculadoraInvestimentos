import { generateReturnsArray } from "./src/investimentGoals";

const form = document.getElementById("investiment-form");
const clear_btn = document.getElementById("clear-results");

function validateInput(evt){
    const input = evt.target.value.replace(",", ".");
    const parentElement = evt.target.parentElement;
    const GrandparentElement = evt.target.parentElement.parentElement;

    if(input === ''){
        return 
    }
    else if(isNaN(input) || Number(input) <= 0){
        parentElement.classList.add('error');
        const p = GrandparentElement.querySelector('p');
        p.classList.remove('hidden');

    } else if(Number(input) > 0  && parentElement.classList.contains('error')){
        parentElement.classList.remove('error');
        const p = GrandparentElement.querySelector('p');
        p.classList.add('hidden');
    }
}

function claerForm(){
    for(const formElement of form){
        if(formElement.tagName === "INPUT"){
            formElement.value = '';
        }
    }

    const errorInputs = document.querySelectorAll('.error');
    for(const errorInputContainer of errorInputs){
        errorInputContainer.classList.remove('error');
        errorInputContainer.parentElement.querySelector('p').classList.add('hidden');
    }

}



function renderProgression(event){
    event.preventDefault();
    if(document.querySelector('.error')){
        return
    }
    const p_list = document.getElementsByTagName('p');
    const startingAmount = Number(document.getElementById("starting-amount").value.replace(',', '.')); //
    const additionalContribution = Number(document.getElementById("additional-contribution").value);
    const timeAmount = Number(document.getElementById('time-amount').value);  //
    const timePeriod = document.getElementById('time-period').value;
    const returnRate = Number(document.getElementById('return-rate').value.replace(',', '.')); //
    const returnRatePeriod = document.getElementById('return-rate-period').value;
    const taxRate = Number(document.getElementById("tax-rate").value.replace(',', '.'));  //

    const returnsArray = generateReturnsArray(startingAmount, timeAmount, timePeriod, 
                                              additionalContribution, returnRate, returnRatePeriod);

    console.log(returnsArray);
}

form.addEventListener("submit", renderProgression);
clear_btn.addEventListener('click', claerForm);

for(const formElement of form){
    if(formElement.tagName === "INPUT"){
        formElement.addEventListener('blur', validateInput);
    }
}
