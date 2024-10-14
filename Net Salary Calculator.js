function calculateNetSalary(basicSalary, benefits) {
    // Constants
    const personalRelief = 2400;
    const pensionFundContributionLimit = 20000;
    const nssfRate = 0.06; 
    const nhifRates = [
        { min: 0, max: 5999, deduction: 150 },
        { min: 6000, max: 7999, deduction: 300 },
        { min: 8000, max: 11999, deduction: 400 },
        { min: 12000, max: 14999, deduction: 500 },
        { min: 15000, max: 19999, deduction: 600 },
        { min: 20000, max: 24999, deduction: 750 },
        { min: 25000, max: 29999, deduction: 850 },
        { min: 30000, max: 34999, deduction: 900 },
        { min: 35000, max: 39999, deduction: 950 },
        { min: 40000, max: 44999, deduction: 1000 },
        { min: 45000, max: 49999, deduction: 1100 },
        { min: 50000, max: 59999, deduction: 1200 },
        { min: 60000, max: 69999, deduction: 1300 },
        { min: 70000, max: 79999, deduction: 1400 },
        { min: 80000, max: 89999, deduction: 1500 },
        { min: 90000, max: 99999, deduction: 1600 },
        { min: 100000, max: Infinity, deduction: 1700 }
    ];

    
    let grossSalary = basicSalary + benefits;

    
    let nssfDeduction = 0;
    if (grossSalary <= 7000) {
        nssfDeduction = grossSalary * nssfRate;
    } else if (grossSalary > 7000) {
        nssfDeduction = (7000 * nssfRate) + ((grossSalary - 7000) * nssfRate);
    }
    nssfDeduction = Math.min(nssfDeduction, pensionFundContributionLimit);

    
    let nhifDeduction = 0;
    for (let rate of nhifRates) {
        if (grossSalary >= rate.min && grossSalary <= rate.max) {
            nhifDeduction = rate.deduction;
            break;
        }
    }

    
    let taxableIncome = grossSalary - nssfDeduction; 
    let paye = 0;

    if (taxableIncome <= 24000) {
        paye = taxableIncome * 0.1;
    } else if (taxableIncome <= 32333) {
        paye = (24000 * 0.1) + ((taxableIncome - 24000) * 0.25);
    } else if (taxableIncome <= 500000) {
        paye = (24000 * 0.1) + (8333 * 0.25) + ((taxableIncome - 32333) * 0.3);
    } else if (taxableIncome <= 800000) {
        paye = (24000 * 0.1) + (8333 * 0.25) + (467667 * 0.3) + ((taxableIncome - 500000) * 0.325);
    } else {
        paye = (24000 * 0.1) + (8333 * 0.25) + (467667 * 0.3) + (300000 * 0.325) + ((taxableIncome - 800000) * 0.35);
    }

    
    paye = paye - personalRelief;
    paye = Math.max(paye, 0); 

    
    let netSalary = grossSalary - paye - nhifDeduction - nssfDeduction;

    
    return {
        grossSalary: grossSalary,
        nssfDeduction: nssfDeduction,
        nhifDeduction: nhifDeduction,
        paye: paye,
        netSalary: netSalary
    };
}

let basicSalary = 50000; 
let benefits = 10000;   

let result = calculateNetSalary(basicSalary, benefits);

console.log("Gross Salary: Ksh " + result.grossSalary);
console.log("NSSF Deduction: Ksh " + result.nssfDeduction);
console.log("NHIF Deduction: Ksh " + result.nhifDeduction);
console.log("PAYE: Ksh " + result.paye);
console.log("Net Salary: Ksh " + result.netSalary);