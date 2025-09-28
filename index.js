const readlineSync = require('readline-sync');
const input = (prompt) => readlineSync.question(prompt);

const rates = [
    // Rates now expressed per 1 EUR (EUR is the base)
    { code: "EUR", rate: 1 },
    { code: "USD", rate: 1.168 },  // United States
    { code: "JPY", rate: 175.0 },  // Japan
    { code: "RUB", rate: 29.1 },   // Russia
    { code: "GBP", rate: 0.875 },  // United Kingdom
    { code: "CHF", rate: 1.052 },  // Switzerland
    { code: "SEK", rate: 12.8 },   // Sweden
    { code: "NOK", rate: 12.1 },   // Norway
    { code: "PLN", rate: 4.61 },   // Poland
    { code: "CZK", rate: 27.3 },   // Czech Republic
    { code: "AUD", rate: 1.62 },   // Australian Dollar
    { code: "CAD", rate: 1.49 },   // Canadian Dollar
    { code: "CNY", rate: 8.52 },   // Chinese Yuan
    { code: "HKD", rate: 9.14 },   // Hong Kong Dollar
    { code: "SGD", rate: 1.58 },   // Singapore Dollar
    { code: "NZD", rate: 1.78 },   // New Zealand Dollar
    { code: "INR", rate: 97.5 },   // Indian Rupee
    { code: "BRL", rate: 6.25 },   // Brazilian Real
    { code: "MXN", rate: 20.3 },   // Mexican Peso
    { code: "ZAR", rate: 21.7 },   // South African Rand
    { code: "TRY", rate: 38.0 },   // Turkish Lira
    { code: "AED", rate: 4.29 },   // UAE Dirham
    { code: "SAR", rate: 4.38 },   // Saudi Riyal
    { code: "ILS", rate: 4.35 },   // Israeli Shekel
    { code: "KRW", rate: 1540 },   // South Korean Won
    { code: "THB", rate: 39.5 },   // Thai Baht
    { code: "MYR", rate: 5.52 },   // Malaysian Ringgit
    { code: "IDR", rate: 18800 },  // Indonesian Rupiah
    { code: "DKK", rate: 7.46 },   // Danish Krone
    { code: "HUF", rate: 392 },    // Hungarian Forint
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
