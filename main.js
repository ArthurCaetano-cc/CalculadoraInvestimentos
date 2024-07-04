import { generateReturnsArray } from "./src/investimentGoals";
import { Chart } from "chart.js/auto";
import { createTable } from "./src/table";

const form = document.getElementById("investiment-form");
const clear_btn = document.getElementById("clear-results");

const finalMoneyDistribution = document.getElementById('final-money-distribution');
const progression = document.getElementById('progression');
let doughnutChartReference = {};
let barChartReference = {};

const columnsArray = [
  {columnLabel: "Mês", accessor:"month"},
  {columnLabel: "Total Investido", accessor:"investedAmount", format: value => formatValue(value)},
  {columnLabel: "Rendimento Mensal", accessor: "interestReturns", format: value => formatValue(value)},
  {columnLabel: "Rendimento Total", accessor:"totalinterestReturns", format: value => formatValue(value)},
  {columnLabel: "Quantia total", accessor:"totalAumont", format: value => formatValue(value)},
]

function formatValue(value){
  return value.toLocaleString("pt-br", {style:"currency", currency:"BRL"})
}

function isEmpty(obj){
     return Object.keys(obj).length === 0;
}

function resetCharts(){
     if(!isEmpty(doughnutChartReference) && !isEmpty(barChartReference)){
         doughnutChartReference.destroy();
         barChartReference.destroy();
     }
}


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

function clearForm(){
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
    resetCharts();

}

function formatCurrency(value){
    return value.toFixed(2);
}


function renderProgression(event){
    event.preventDefault();
    if(document.querySelector('.error')){
        return
    }
    resetCharts();

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
    

    const finalInvestiment = returnsArray[returnsArray.length-1];

    doughnutChartReference = new Chart(finalMoneyDistribution, {
        type: 'doughnut',
        data: {
            labels: [
              'Total Investido',
              'Rendimento',
              'Imposto'
            ],
            datasets: [{
              data: [
                formatCurrency(finalInvestiment.totalAumont),
                formatCurrency(finalInvestiment.totalinterestReturns * (1-taxRate/100)),
                formatCurrency(finalInvestiment.totalinterestReturns * (taxRate/100))
                ],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          },
      });

      barChartReference = new Chart(progression, {
        type: 'bar',
        data: {
            labels:returnsArray.map(arrayObject => arrayObject.month),
            datasets: [
                {
                    label: "Total Investido",
                    data: returnsArray.map(arrayObject => formatCurrency(arrayObject.investedAmount)),
                    backgroundColor: 'rgb(255, 99, 132)',
                },

                {
                    label: "Retorno do Investimento",
                    data: returnsArray.map(arrayObject => formatCurrency(arrayObject.interestReturns)),
                    backgroundColor: 'rgb(54, 162, 235)',
                },
            ]
          }, 
          
          options: {
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true
              }
            }
          }
      });
    
    createTable(columnsArray, returnsArray, 'results-table');
}


const mainEL = document.querySelector('main');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const carouselEl = document.getElementById('carousel');

leftArrow.addEventListener('click', () => {
  carouselEl.scrollLeft -= mainEL.clientWidth;
  console.log("Botão apertado da esquerda");
})

rightArrow.addEventListener('click', () => {
  carouselEl.scrollLeft += mainEL.clientWidth;
  console.log("Botão apertado da direita");
})


form.addEventListener("submit", renderProgression);
clear_btn.addEventListener('click', clearForm);

for(const formElement of form){
    if(formElement.tagName === "INPUT"){
        formElement.addEventListener('blur', validateInput);
    }
}
