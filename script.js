// // API URL for fetching live exchange rates (replace with a reliable API service if needed)
// const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// // Store the exchange rate data in a variable
// let exchangeRateData;

// /**
//  * Function to fetch the exchange rate data from the API.
//  * It returns a promise that resolves with the exchange rate data.
//  */
// async function fetchExchangeRateData() {
//     try {
//         // Fetch data from the exchange rate API
//         const response = await fetch(API_URL);
//         if (!response.ok) throw new Error('Failed to fetch exchange rate data.');

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching exchange rate data:', error);
//         throw error;
//     }
// }

// /**
//  * Function to populate the currency options dynamically in the dropdowns.
//  * It fetches available currency rates and uses them to populate the "From" and "To" selectors.
//  */
// async function populateCurrencyOptions() {
//     try {
//         // Fetch the exchange rate data
//         exchangeRateData = await fetchExchangeRateData();

//         // Extract currency codes
//         const currencyList = Object.keys(exchangeRateData.rates);

//         // Get the dropdown elements
//         const fromCurrencySelect = document.getElementById('fromCurrency');
//         const toCurrencySelect = document.getElementById('toCurrency');

//         // Populate the dropdowns with currency options
//         currencyList.forEach((currency) => {
//             const optionFrom = document.createElement('option');
//             optionFrom.value = currency;
//             optionFrom.textContent = currency;
//             fromCurrencySelect.appendChild(optionFrom);

//             const optionTo = document.createElement('option');
//             optionTo.value = currency;
//             optionTo.textContent = currency;
//             toCurrencySelect.appendChild(optionTo);
//         });

//         // Set default selected values
//         fromCurrencySelect.value = 'USD';
//         toCurrencySelect.value = 'INR';
//     } catch (error) {
//         console.error('Error populating currency options:', error);
//     }
// }

// /**
//  * Function to convert the currency based on user input and live exchange rates.
//  * It calculates the equivalent amount in the target currency.
//  */
// async function convertCurrency() {
//     // Get user input values
//     const fromCurrency = document.getElementById('fromCurrency').value;
//     const toCurrency = document.getElementById('toCurrency').value;
//     const amount = document.getElementById('amount').value;

//     // Validate the input amount
//     if (amount === '') {
//         document.getElementById('result').textContent = 'Please enter an amount.';
//         return;
//     }

//     const amountValue = parseFloat(amount);
//     if (isNaN(amountValue) || amountValue <= 0) {
//         document.getElementById('result').textContent = 'Please enter a valid amount.';
//         return;
//     }

//     // Validate the currency selection
//     if (fromCurrency === '' || toCurrency === '') {
//         document.getElementById('result').textContent = 'Please select a currency.';
//         return;
//     }

//     try {
//         // Calculate the conversion rate
//         const rate = exchangeRateData.rates[toCurrency] / exchangeRateData.rates[fromCurrency];
//         const convertedAmount = (amountValue * rate).toFixed(2);

//         // Display the converted amount
//         document.getElementById('result').textContent = `Converted Amount: ${convertedAmount} ${toCurrency}`;
//     } catch (error) {
//         console.error('Error converting currency:', error);
//         document.getElementById('result').textContent = 'Error fetching conversion rate.';
//     }
// }

// // Event listener for when the page is fully loaded
// window.addEventListener('DOMContentLoaded', populateCurrencyOptions);

// // Event listener for the convert button click
// document.getElementById('convert').addEventListener('click', convertCurrency);



















// --- 2ND METHOD ---------------------------------------------------------------------------------------------------------------


// Define the API URL to fetch live exchange rates (Make sure to use a reliable API service)
const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

// Global variable to store exchange rate data once fetched
let exchangeRateData;

/**
 * Function to fetch exchange rate data from the API.
 * This function returns a promise that resolves with the exchange rate data.
 * It uses the Fetch API to get real-time exchange rates in JSON format.
 */
async function fetchExchangeRateData() {
  try {
    // Fetch exchange rate data from the API
    const response = await fetch(API_URL);

    // If the response is not OK (status 200), throw an error
    if (!response.ok) throw new Error("Failed to fetch exchange rate data.");

    // Parse the response JSON data
    const data = await response.json();

    // Return the fetched exchange rate data
    return data;
  } catch (error) {
    // Log the error in case of failure
    console.error("Error fetching exchange rate data:", error);
    throw error; // Re-throw error for further handling
  }
}

/**
 * Function to populate the currency dropdowns dynamically.
 * It fetches available currency codes and populates the "From" and "To" selectors.
 */
async function populateCurrencyOptions() {
  try {
    // Fetch exchange rate data and store it in the global variable
    exchangeRateData = await fetchExchangeRateData();

    // Extract currency codes from the API response
    const currencyList = Object.keys(exchangeRateData.rates);

    // Get the dropdown elements from the DOM
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");

    // Loop through each currency and add options dynamically
    // Loop through each currency in the fetched currency list
    currencyList.forEach((currency) => {
      // Create an option element for the "From" currency dropdown
      const optionFrom = document.createElement("option"); // Create a new <option> element
      optionFrom.value = currency; // Set the currency code as the value of the option
      optionFrom.textContent = currency; // Set the visible text of the option to the currency code
      fromCurrencySelect.appendChild(optionFrom); // Append the newly created option to the "From" dropdown

      // Create an option element for the "To" currency dropdown
      const optionTo = document.createElement("option"); // Create a new <option> element
      optionTo.value = currency; // Set the currency code as the value of the option
      optionTo.textContent = currency; // Set the visible text of the option to the currency code
      toCurrencySelect.appendChild(optionTo); // Append the newly created option to the "To" dropdown
    });

    // Set default selected values (From: USD, To: INR)
    fromCurrencySelect.value = "USD";
    toCurrencySelect.value = "INR";
  } catch (error) {
    // Log error and display message if currency options fail to populate
    console.error("Error populating currency options:", error);
    document.getElementById("result").textContent =
      "Error populating currency options.";
  }
}

/**
 * Function to convert the currency based on user input and live exchange rates.
 * It calculates the equivalent amount in the selected target currency.
 */
async function convertCurrency() {
  // Get user-selected currencies and input amount
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const amount = document.getElementById("amount").value;

  // Validate the input amount (ensure it's not empty)
  if (amount === "") {
    document.getElementById("result").textContent = "Please enter an amount.";
    return;
  }

  // Convert input amount to a number and validate
  const amountValue = parseFloat(amount);
  if (isNaN(amountValue) || amountValue <= 0) {
    document.getElementById("result").textContent =
      "Please enter a valid amount.";
    return;
  }

  // Validate that the user has selected valid currencies
  if (fromCurrency === "" || toCurrency === "") {
    document.getElementById("result").textContent = "Please select a currency.";
    return;
  }

  // Ensure that the selected currencies exist in the fetched exchange rate data
  if (
    !exchangeRateData.rates[fromCurrency] ||
    !exchangeRateData.rates[toCurrency]
  ) {
    document.getElementById("result").textContent = "Invalid currency code.";
    return;
  }

  try {
    // Calculate the exchange rate by dividing target currency rate by source currency rate
    const rate =
      exchangeRateData.rates[toCurrency] / exchangeRateData.rates[fromCurrency];

    // Handle division errors (Infinity or -Infinity cases)
    if (rate === Infinity || rate === -Infinity) {
      document.getElementById("result").textContent =
        "Error calculating conversion rate.";
      return;
    }

    // Calculate the converted amount and round to 2 decimal places
    const convertedAmount = (amountValue * rate).toFixed(2);

    // Display the converted amount on the page
    document.getElementById(
      "result"
    ).textContent = `Converted Amount: ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    // Log and display error message in case of failure
    console.error("Error converting currency:", error);
    document.getElementById("result").textContent =
      "Error converting currency.";
  }
}

/**
 * Event listener for when the page is fully loaded.
 * It ensures that the currency dropdowns are populated when the page is ready.
 */
window.addEventListener("DOMContentLoaded", populateCurrencyOptions);

/**
 * Event listener for the convert button.
 * When the button is clicked, it triggers the currency conversion function.
 */
document.getElementById("convert").addEventListener("click", convertCurrency);

/**
 * Event listener for "Enter" key press inside the input field.
 * Allows users to trigger conversion by pressing Enter instead of clicking the button.
 */
document.getElementById("amount").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    convertCurrency();
  }
});
