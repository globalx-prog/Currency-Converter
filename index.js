const readlineSync = require('readline-sync');
const input = (prompt) => readlineSync.question(prompt);

const rates = [
    { code: "USD", rate: 1 },
    { code: "JPY", rate: 113.5 },
    { code: "EUR", rate: 0.89 },
    { code: "RUB", rate: 74.36 },
    { code: "GBP", rate: 0.75 },
];
console.log("Welcome to Currency Converter!\n" +
    `1 USD equals ${rates.find(r => r.code === "USD").rate} USD\n` +
    `1 USD equals ${rates.find(r => r.code === "JPY").rate} JPY\n` +
    `1 USD equals ${rates.find(r => r.code === "EUR").rate} EUR\n` +
    `1 USD equals ${rates.find(r => r.code === "RUB").rate} RUB\n` +
    `1 USD equals ${rates.find(r => r.code === "GBP").rate} GBP`)

function askChoice() {
    while (true) {
        console.log("What do you want to do?\n1-Convert currencies 2-Exit program");
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
    const allowed = ["JPY", "EUR", "RUB", "USD", "GBP"];

    const inputCurrency = askCurrency("From: ", allowed);
    const outputCurrency = askCurrency("To: ", allowed);
    const amount = askAmount();


    let result = convert(inputCurrency, outputCurrency, amount);
    console.log(`Result: ${amount} ${inputCurrency} equals ${result.toFixed(4)} ${outputCurrency}`);

}
