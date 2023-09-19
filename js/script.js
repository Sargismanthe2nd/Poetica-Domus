const searchText = $("#input");
const searchButton = $("#search");
const generateAuthorList = $("#generateAuthorList");
const contentArea = $("#contentArea");
const clickable = $(".clickable");

let userInput = "";
let clickableClicked = "";


// ------------POETRY API------------

// -------------- Poem Loading -----------------

let currentPoemSearch = "https://poetrydb.org/title/" + clickableClicked;

$(clickable).on("click", function(event) {
    event.preventDefault();
    console.log("good");

    // let searchAuthorApi = 'https://poetrydb.org/author/' + userInput;
    // let trimmedAuthor = searchAuthorApi.split(" ").join("%20");
    // console.log(trimmedAuthor);

    // contentArea.empty();
    // authorSearch(trimmedAuthor);
})


// -------------- Poet Search -----------------

function authorSearch(url) {

    fetch(url)
        .then(function (response) {
            return response.json();
         })
        .then(function (data) {

            let authorPoems = data.title;
            console.log(data);

            let authorTitles = [];

            if (data.status == 404) throw "Author not found";

            for (let i = 0; i < data.length; i++) {
                authorTitles.push(data[i].title);
              }

            for (let i = 0; i < data.length; i++) {
                let currentName = document.createElement("p");
                currentName.innerHTML = authorTitles[i];
                $(currentName).addClass("clickable")
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
