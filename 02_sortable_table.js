// Gets access to the elements of the HTML page by referring to their IDs
var tableBodyElement = document.getElementById('table-body');
var ratMessageElement = document.getElementById('rat-message');

// Set up our array of rat objects
var rats = [
    {
        name: 'Yuki',
        age: 1,
        isFeral: false,
    },
    {
        name: 'Nebula',
        age: 2,
        isFeral: false,
    },
    {
        name: 'Wolf',
        age: 3,
        isFeral: true,
    },
    {
        name: 'Vincent',
        age: 2,
        isFeral: true,
    },
    {
        name: 'Fawkes',
        age: 3,
        isFeral: true,
    },
];


// Takes in a rat object and its index
var makeRowStringForRat = function (rat, index) {
    return `
    <tr>
        <th>${index}</th>
        <td>${rat.name}</td>
        <td>${rat.age}</td>
        <td>${rat.isFeral ? 'Yes' : 'No'}</td>
    </tr>
    `;
}

// Finds the number of rats from the array and sets the message as the innerText of the message element
// Runs the map function on the array, which performs the function on each object in the array
// Map returns an array of the results, which in this case is an array of strings
// Joins each element of the array into a single string, putting nothing ('') between them 
var updateRatDisplay = function () {
    var label = `We have ${rats.length} rats!!!`
    ratMessageElement.innerText = label;
    var arrayOfRatRowStrings = rats.map(makeRowStringForRat);
    tableBodyElement.innerHTML = arrayOfRatRowStrings.join('');
}

// Makes sure the function is called when the page loads initially
updateRatDisplay();

// Creates a reverseButton that's hooked to the button with the ID "reverse" in the HTML
var reverseButton = document.getElementById('reverse');
// Uses the innate reverse function to reverse the index order
// Every array shares a prototype object, which is an object filled with properties and methods
// A function doesn't belong to anybody, a method is a function that belongs to an object
// Reverse is a method that we have access to because it receives/inherits from its prototype
var reverseHandler = function () {
    rats.reverse();
    updateRatDisplay();
}
// Adds an event that runs reverseHandler on a click
reverseButton.addEventListener('click', reverseHandler);

// This creates an object that holds properties, each of which is a declared function
// This is a function map
var sortMethods = {
    sortRatsByName: function (a, b) { return a.name.localeCompare(b.name) },
    sortRatsByNameBackwards: function (a, b) { return b.name.localeCompare(a.name) },
    sortRatsByAge: function (a, b) { return a.age - b.age},
    sortRatsByAgeBackwards: function (a, b) { return b.age - a.age},
    sortRatsByFeralState: function (a, b) { return a.isFeral - b.isFeral},
    sortRatsByFeralStateBackwards: function (a, b) { return b.isFeral - a.isFeral},
}


/*
This next function relies on dynamic property name access
> var a = {color: "Blue", price: 5.99}
> var propertyName = "color"
> a[propertyName]
'Blue'
*/

// Creating a function that runs when the document's body is clicked
var bodyClickHandler = function (clickEvent) {
    // What is this accessing? 
    console.log('What is clickEvent?', clickEvent);
    // The target is the HTML element that got clicked
    // dataset is a property of the target element
    // 
    // We're looking for something like this in the page:
    /*
    <button
        class="table-sorter"
        data-sort-method="sortRatsByName"    <---- This line right here
    >👆</button>
    */
    // Turns this into target.dataset.sortMethod
    var sortMethodName = clickEvent.target.dataset.sortMethod;
    // If sortMethodName exists, if we can find that matching "data-sort-method" ID above
    if (sortMethodName) {
        // Records a click, and the name of its sorting method
        console.log(`Document click happened!`, sortMethodName);
        // Sets the method as a function
        var sortMethod = sortMethods[sortMethodName];
        // Sorts the array by way of the method we picked out of the function map
        rats.sort(sortMethod);
        updateRatDisplay();
    }
}

// Creates an event to listen for a click on the document body
document.body.addEventListener(`click`, bodyClickHandler);
