const PropertyValue = 800000;
let LVM = 0.8; //you borrow 80%
const InterestOnlyRate = 0.0329; // https://www.commbank.com.au/home-loans.html

const CashIn = {
    RentPerWeek: 550,
};

const CashOutYear = {
    ManagementFee: 0.055 * CashIn.RentPerWeek * 2, // 2 weeks fee
    // Insurance: 0,
    // Other fees:
};

const CashOutSeason = {
    StrataPerSeason: 600,
    CouncilPerSeason: 250,
    WaterPerSeaon: 150,
};

// const Insurance;

const Depreciation = PropertyValue * 0.015;

const TotalCashIn = () => {
    return CashIn.RentPerWeek * 52;
};

const TotalCashOut = () => {
    let cash = 0;
    for (let rate of Object.keys(CashOutYear)) {
        cash += CashOutYear[rate];
    }
    for (let rate of Object.keys(CashOutSeason)) {
        cash += CashOutSeason[rate] * 4;
    }

    const interest = PropertyValue * LVM * InterestOnlyRate;
    cash += interest;

    return cash;
};

const TotalTaxLost = () => {
    return TotalCashOut() + Depreciation;
};

const destiny = () => {
    let cash = TotalCashIn() - TotalCashOut();
    const tax = (TotalCashIn() - TotalTaxLost()) * 0.37; 
    cash -= tax; // if tax is negative, then we can money from ATO

    const InitialPrincipal = PropertyValue * (1 - LVM);
    if (tax > 0) {
        console.log("yearly tax pay: ", tax.toFixed(1));
    } else {
        console.log("yearly tax return: ", tax.toFixed(1) * -1);
    }

    console.log("yearly total earn: ", cash.toFixed(1));
    console.log("yearly return rate", (cash / InitialPrincipal).toFixed(4), ", lvm: ", LVM.toFixed(3));
};
destiny();
/*
for (let i = 0.9; i >= 0.2; i-=0.1) {
    LVM = i
    destiny();
}

*/