var outputElement = document.getElementById('output');

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

var williamBlakeUrl = 'https://poetrydb.org/author/William%20Blake';

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

// Performs renderPoemString on each element and joins them together
var whatToDoWhenWeGetOurData = function (poems) {
    console.log('What is data?', poems);
    var poemsAsHtml = poems.map(renderPoemString);

    outputElement.innerHTML = poemsAsHtml.join('');
}

makeNetworkRequest(williamBlakeUrl, whatToDoWhenWeGetOurData);
