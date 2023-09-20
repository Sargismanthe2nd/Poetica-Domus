const searchText = $("#input");
const searchButton = $("#search");
const generateAuthorList = $("#generateAuthorList");
const contentArea = $("#contentArea");
const clickable = $("button");

let userInput = "";
let clickableClicked = "";
let wikiButton = "";


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

            let wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' + data[0].author + '&formatversion=2&limit=1';

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

            wikiApiCall(wikiUrl);

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

    fetch(url)
        .then(function (response) {
            return response.json();
         })
        .then(function (data) {

            console.log(data[3][0]);
            let wikiButton = $('<a href="" target="_blank"</a>').text("Click for more info on this Author")
            $(wikiButton).addClass("wikiButton");
            $("#contentArea").append(wikiButton);
            $(wikiButton).attr("href", data[3][0]);
            console.log(wikiButton);

        })

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
                let currentTitle ;
            for (let i = 0; i < data.length; i++) {
                currentTitle = document.createElement("p");
                currentTitle.textContent = authorTitles[i];
                $(currentTitle).addClass("clickable");
                $(currentTitle).on("click", onClick);
                $("#contentArea").append(currentTitle);
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
    console.log(searchAuthorApi);
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
            let currentName ;

            for (let i = 0; i < authorName.length; i++) {
                currentName = document.createElement("p");
                currentName.textContent = authorName[i];
                $(currentName).addClass("poetListName");
                $("#contentArea").append(currentName);
              }
        })
}


// // click on author list name and go to their works
// function authorClick() {

//     listClicked = this.innerHTML;
//     let authorClickSearch = "https://poetrydb.org/author/" + listClicked;
//     let trimmedAuthorClick = authorClickSearch.split(" ").join("%20");
//     console.log(trimmedAuthorClick);

//     // contentArea.empty();
//     // authorSearch(trimmedAuthorClick);
// }

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
