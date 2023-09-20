const searchText = $("#input");
const searchButton = $("#search");
const generateAuthorList = $("#generateAuthorList");
const contentArea = $("#contentArea");
const clickable = $("button");

let userInput = "";
let clickableClicked = "";


// ------------POETRY API------------

// --------------------- Clicking on a Poem Title ----------------------------

// Clicking on a poem title ->
function onClick() {

        clickableClicked = this.innerHTML;
        let trimmedTitle = clickableClicked.split(" ").join("%20");
        let currentPoemSearch = "https://poetrydb.org/title/" + trimmedTitle;
        console.log(currentPoemSearch);

        contentArea.empty();
        loadPoem(currentPoemSearch);
}

// <- generates poem content
function loadPoem(url) {

    fetch(url)
        .then(function (response) {
            return response.json();
         })
        .then(function (data) {

            console.log(data);
            console.log(data[0].title);

            if (data.status == 404) throw "Author not found";

            let contentTitle = $("<h3></h3>").text(data[0].title)
            $(contentTitle).addClass("contentTitle");
            $("#contentArea").append(contentTitle);

            let contentAuthor = $("<h5></h5>").text(data[0].author)
            $(contentAuthor).addClass("contentAuthor");
            $("#contentArea").append(contentAuthor);

            for (let i = 0; i < data[0].lines.length; i++) {
                let poemLine = $("<p></p>").text(data[0].lines[i])
                $(poemLine).addClass("poemLine");
                $("#contentArea").append(poemLine);
              }

            let wikiButton = $("<button></button>").text("Click for more info on " + data[0].author)
            $(wikiButton).addClass("wikiButton");
            $(currentName).on("click", wikiApiCall(data[0].author));
            $("#contentArea").append(wikiButton);
        })
        .catch(function (error) {
            let notFound = document.createElement("p");
            notFound.innerHTML = "Poem not found";
            $("#contentArea").append(notFound);
            console.log(error);
        })
}

// Opens wikipedia article in new tab
function wikiApiCall(url) {

}

// -------------- Poet Search -----------------

function authorSearch(url) {

    fetch(url)
        .then(function (response) {
            return response.json();
         })
        .then(function (data) {

            console.log(data);

            let authorTitles = [];

            if (data.status == 404) throw "Author not found";

            for (let i = 0; i < data.length; i++) {
                authorTitles.push(data[i].title);
              }
                let currentName ;
            for (let i = 0; i < data.length; i++) {
                currentName = document.createElement("button");
                currentName.textContent = authorTitles[i];
                $(currentName).addClass("clickable");
                $(currentName).on("click", onClick);
                $("#contentArea").append(currentName);
              }
        })
        .catch(function (error) {
            let notFound = document.createElement("p");
            notFound.innerHTML = "Author not found";
            $("#contentArea").append(notFound);
            console.log(error);
        })
}

// Author Search Button
$(searchButton).on("click", function(event) {
    event.preventDefault();
    userInput = searchText.val();

    let searchAuthorApi = 'https://poetrydb.org/author/' + userInput;
    let trimmedAuthor = searchAuthorApi.split(" ").join("%20");
    console.log(trimmedAuthor);

    contentArea.empty();
    authorSearch(trimmedAuthor);
})
// CREDIT: solution for replacing blank spaces using split and join: https://www.geeksforgeeks.org/how-to-remove-spaces-from-a-string-using-javascript/
// CREDIT: solution to replacing spaces with a specific string: http://dotnet-concept.com/Tips/2015/3/5798821/How-to-replace-Space-with-Dash-or-Underscore-in-JQuery

// -------------- Author List -----------------

let authorsApi = 'https://poetrydb.org/author'

function getAuthorList(url) {

    fetch(url)
        .then(function (response) {
            return response.json();
         })
        .then(function (data) {
            console.log(data);

            let authorName = data.authors;
            console.log(authorName);

            for (let i = 0; i < authorName.length; i++) {
                let currentName = document.createElement("p");
                currentName.innerHTML = authorName[i];
                $("#contentArea").append(currentName);
              }
        })
}

// Author List button 
$(generateAuthorList).on("click", function(event) {
    event.preventDefault();

    contentArea.empty();
    getAuthorList(authorsApi);
})

// -----------------


// https://poetrydb.org/index.html




// // ------------MEDIAWIKI API------------

// let wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=Shakespeare&formatversion=2&limit=1';

// function getWikiApi(url) {

//     fetch(url)
//         .then(function (response) {
//             return response.json();
//          })
//         .then(function (data) {
//             console.log(data);
//             $(".test2").text(data[3][0]);
//         })
// }

// getWikiApi(wikiUrl);
// https://www.mediawiki.org/wiki/API:Opensearch
// https://www.mediawiki.org/wiki/API:Get_the_contents_of_a_page
