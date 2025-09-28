const readlineSync = require('readline-sync');
const input = (prompt) => readlineSync.question(prompt);

const rates = [
    // Rates now expressed per 1 EUR (EUR is the base)
    { code: "EUR", rate: 1 },
    { code: "USD", rate: 1.168 },  // example: 1 EUR ≈ 1.168 USD
    { code: "JPY", rate: 175.0 },  // 1 EUR ≈ 175.0 JPY
    { code: "RUB", rate: 29.1 },   // 1 EUR ≈ 29.1 RUB
    { code: "GBP", rate: 0.875 },  // 1 EUR ≈ 0.875 GBP
    { code: "CHF", rate: 1.052 },  // 1 EUR ≈ 1.052 CHF
    { code: "SEK", rate: 12.8 },   // 1 EUR ≈ 12.8 SEK
    { code: "NOK", rate: 12.1 },   // 1 EUR ≈ 12.1 NOK
    { code: "PLN", rate: 4.61 },   // 1 EUR ≈ 4.61 PLN
    { code: "CZK", rate: 27.3 },   // 1 EUR ≈ 27.3 CZK
];

console.log("Welcome to Currency Converter!");
rates.forEach(r => {
    console.log(`1 EUR equals ${r.rate} ${r.code}`);
});

function askChoice() {
    while (true) {
        console.log("What do you want to do?\n" +
            "1-Convert currencies 2-Exit program");
        const choice = String(input());
        if (choice === "1" || choice === "2") return choice;
        console.log("Unknown input");
    }
}

function askCurrency(prompt, allowed) {
    while (true) {
        let value = input(prompt);
        value = String(value).trim().toUpperCase();
        if (allowed.includes(value)) return value;
        console.log("Unknown currency");
        // resume and re-ask the same prompt
    }
}

function askAmount() {
    while (true) {
        const raw = input("Amount: ");
        const amount = Number(raw);
        if (Number.isNaN(amount)) {
            console.log("The amount has to be a number");
            continue;
        }
        if (amount < 1) {
            console.log("The amount cannot be less than 1");
            continue;
        }
        return amount;
    }
}

function convert(inputCurrency, outputCurrency, amount) {
    const inputRate = rates.find(r => r.code === inputCurrency)?.rate;
    const outputRate = rates.find(r => r.code === outputCurrency)?.rate;
    return amount * (outputRate / inputRate);
}

while (true) {
    const choice = askChoice();
    if (choice === "1") {
        console.log("What do you want to convert?");
    }
    if (choice === "2") {
        console.log("Have a nice day!");
        process.exit(0);
    }
    const allowed = rates.map(r => r.code);

    const inputCurrency = askCurrency("From: ", allowed);
    const outputCurrency = askCurrency("To: ", allowed);
    const amount = askAmount();


    let result = convert(inputCurrency, outputCurrency, amount);
    console.log(`Result: ${amount} ${inputCurrency} equals ${result.toFixed(4)} ${outputCurrency}`);

}
