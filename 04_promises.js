const createButton = document.getElementById('create-promise');
const resolveButton = document.getElementById('resolve-promise');
const rejectButton = document.getElementById('reject-promise');
const promiseInput = document.getElementById('promise-input');
const outputElement = document.getElementById('output');

// Let any function make use of these variables, which initially have `undefined` as their value
let currentPromise;
let currentPromiseResolveFunction;
let currentPromiseRejectFunction;

// As soon as this function is called, we get access to the currentPromise variables above.
const createPromise = function () {
    // `new` creates a new thing of that type, in this case Promise. Invoking a constructor function.
    // Promises take functions as their only argument.
    currentPromise = new Promise(function (resolve, reject){
        // These undefined variables are made into functions
        currentPromiseResolveFunction = resolve;
        currentPromiseRejectFunction = reject;
    })
    // then for when a Promise succeeds
    currentPromise.then(function (text) {
        outputElement.innerHTML += `<span class="success">Promise resolved with value: "${text}"</span>`
    })
    // catch for when a Promise fails
    currentPromise.catch(function (text) {
        outputElement.innerHTML += `<span class="error">Promise rejected with value: "${text}"</span>\n`;
    })
}

const resolvePromise = function () {
    // Defined fresh each time function is run
    const text = promiseInput.value;
    currentPromiseResolveFunction(text);
}

const rejectPromise = function () {
    // Defined fresh each time function is run
    const text = promiseInput.value;
    currentPromiseRejectFunction(text);
}

createButton.addEventListener('click', createPromise);
resolveButton.addEventListener('click', resolvePromise);
rejectButton.addEventListener('click', rejectPromise);