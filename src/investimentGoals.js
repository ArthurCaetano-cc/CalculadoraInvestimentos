function convertToMonthlyRate(yearlyRate){
    return yearlyRate ** (1/12);
}

function generateReturnsArray(
    startingAumont = 0,
    timeHorizon = 0,
    timePeriod = "Monthly",
    monthlyContribution = 0,
    returnRate,
    ratePeriod = "Monthly"
    ){
    if(!startingAumont || !timeHorizon){
        throw new Error("O investimento inicial e o período de investimento devem ser números positivos.");
    }

    const finalReturnRate = ratePeriod === "Monthly" ? 1 + returnRate / 100 : convertToMonthlyRate(1+returnRate/100); 
    const finalTimeHorizon = timePeriod === "Monthly" ? timeHorizon : timeHorizon*12;

    const referenceInvestimentObject = {
        investedAumont: startingAumont,  // Quanto já foi investido 
        interestReturns: 0,  // Quanto retornou com juros
        totalinterestReturns: 0,  // Quanto retornou no total
        month: 0,
        totalAumont: startingAumont, // valor total ao término o mês
    };

    const returnsArray = [referenceInvestimentObject];
    
    for(let time = 1; time <= finalTimeHorizon; time++){
        const totalAumont = returnsArray[time-1].totalAumont * finalReturnRate + monthlyContribution;
        const interestReturns = returnsArray[time-1].totalAumont * finalReturnRate;
        const investedAumont = startingAumont + monthlyContribution*time;
        const totalinterestReturns = totalAumont - investedAumont; 
        
        returnsArray.push({
            investedAumont,
            interestReturns,
            totalinterestReturns,
            month: time,
            totalAumont,
        })
    }

    return returnsArray;
}