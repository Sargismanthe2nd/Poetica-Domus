const searchText = $("#input");
const searchButton = $("#search");
const generateAuthorList = $("#generateAuthorList");


$(searchButton).on("click", function(event) {
    event.preventDefault();
    userInput = searchText.val();
    console.log(userInput.trim());
})

$(generateAuthorList).on("click", function(event) {
    event.preventDefault();
    getAuthorList(authorsApi);
})



// ------------POETRY API------------














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
                $("#authorList").append(currentName);
              }
        })
}

// getAuthorList(authorsApi);

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
