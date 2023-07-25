var outputElement = document.getElementById('output');
var tableBody = document.getElementById('table-body');

// This function invokes the callback function when the json promise is fulfilled
var makeNetworkRequest = function (url, callback) {
    // Asking the browser to make a network request to this URL
    // What information is it receiving?
    // It is a query to get information
    var requestPromise = fetch(url);
    // This gets called when the network request has started
    var networkRequestCallback = function (responseObject) {
        console.log('What is responseObject?', responseObject);
        //Looks at json, parses it as json, and gives you back JavaScript objects from what it parsed
        var jsonPromise = responseObject.json();
        // When that's done, when the promise has resolved, run the callback.
        jsonPromise.then(callback);
    }
    // Handing the network request callback to the promise
    // When the network request promise resolves, this is run
    // Callback is a function that is passed as an argument to another function, to be run potentially at some point, if at all.
    requestPromise.then(networkRequestCallback);
}

var authors = [
    {
        name : 'William Blake',
        poems : [],
        isFeral : true
    },
    {
        name : 'Emily Dickinson',
        poems : [],
        isFeral : false
    },
    {
        name : 'Edgar Allan Poe',
        poems : [],
        isFeral : true
    },
    {
        name : 'Mark Twain',
        poems : [],
        isFeral : false
    },
    {
        name : 'William Wordsworth',
        poems : [],
        isFeral : false
    },
    
];

// Takes in an author object and its index
var makeRowStringForAuthor = function (author, index) {
    return `
    <tr>
        <td>${index}</td>
        <td>${author.name}</td>
        <td>${author.poems.length}</td>
        <td><a href="#author=${author.name}">Show Poems</a></td>
    </tr>
    `;
}

// Accesses poem attributes
// Prints out HTML code
var renderPoemString = function (poem) {
    return `
    <div class="poem">
        <h1>${poem.title}</h1>
        <h2>By: ${poem.author}</h2>
        <pre>${poem.lines.join('\n')}</pre>
    </div>
    `;
}

// Receives the author's position in the authors array and displays the whole list of their poems
var handleAuthorPoemsLoad = function (poems, authorIndex) {
    var author = authors[authorIndex];
    console.log('What is data?', poems);
    // Takes poems from network and attaches them to the author
    // It replaces the author's array of no poems with their list of poems
    author.poems = poems;
    // Builds the table's contents
    tableBody.innerHTML += makeRowStringForAuthor(author, authorIndex);
}

// 
var requestPoemsByAuthor = function (author) {
    // This promise will have its data when the resolve function has been called. We are passing this function as the callback argument to our makeNetworkRequest
    return new Promise(function (resolve, reject){
        var authorURL = 'https://poetrydb.org/author/' + author.name;
        // This returns one array of poems per author. When it resolves, all poems from that author are passed to the resolve function.
        makeNetworkRequest(authorURL, resolve);
    })
}

// For each of the Authors in the authors array, we are going to pass the item into this function as the first arguement
// This map creates a new array of promises.
var authorLoadPromises = authors.map(requestPoemsByAuthor);
// This is a promise that will resolve when all authors' load promises have resolved
var allAuthorsLoadedPromise = Promise.all(authorLoadPromises);
// What to do when they all finish loading, when this ^ one promise resolves.
// The map method goes through each element of the array in order. Because the Promise is looking at an array that has been mapped, it retains that same order, even though it receives promise resolutions in whatever order the requests complete.
allAuthorsLoadedPromise.then(function(arrayOfPoems) {
    arrayOfPoems.forEach(handleAuthorPoemsLoad);
    outputElement.innerHTML = 'Content loaded.'
    // After all the poems have loaded, parse URL and manage state with the loaded data
    parseURL();
})

// -------- What to do when the URL changes!!

var parseURL = () => {
    // '#author=William%20Blake&poem=A%20POISON%20TREE&goats=true'
    var hash = window.location.hash;
    //Split creates an array of everything separated by &
    var segments = hash.replace('#', '').split('&');
    var result = {};
    // Segments look like: author=William%20Blake
    segments.forEach((segment) => {
        // decodeURIComponent takes "author=William%20Blake" and gives us "author=William Blake"
        var decodedSegment = decodeURIComponent(segment);
        // This is array destructuring. The split method returns an array and stores the values from the first two items into two newly created variables: propertyName and value.
        // We get: ['author', 'William Blake']
        // propertyName is author, value is William Blake
        var [propertyName, value] = decodedSegment.split('=');
        // We store the value, William Blake, into the `result` object we created earlier, and give it a property named for the propertyName, author, that we received in the split. This is called `dynamic property name access`.
        result[propertyName] = value;
    })
    console.log("What is the parsed hash?", result);
    console.log("What is the hash?", hash);
    if (result.author) {
        //Trying to find any author who meets those criteria
        //Either it's undefined, or an author object
        var author = authors.find(function(author){
            return author.name === result.author;
        })
        if (!author) {
            throw new Error('Unable to find author by name: ' + result.author);
        }
        // Performs renderPoemString on each element and joins them together
        var authorPoemStrings = author.poems.map(renderPoemString);
        outputElement.innerHTML = authorPoemStrings.join('\n');
    }
}

window.addEventListener(
    "hashchange",
    parseURL
);

// TODO: When you click on author, should show a list of poems by that author.
// TODO: Clicking on a poem in the above list should show only that one poem.