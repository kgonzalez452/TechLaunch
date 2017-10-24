// READ the giphy API docs: https://developers.giphy.com/
const giphy_endpoint = 'http://api.giphy.com/v1'

//obtain the giphy api key at developer.giphy.com
const giphy_api_key = 'CjSlxNtszUoitwy8U5Lm67VZLRXXWd7c'

//elements from the DOM
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-form input')
const results = document.querySelector('.results')

//we will use axios to help manage our promises and we will use it in a function called getGifs

function getGifs(term, path, callback){

    axios(`${giphy_endpoint}/gifs/${path}?api_key=${giphy_api_key}&q=${term}`)
    .then(function(response){
        console.log(response.data.data)

        callback(response.data.data)
    })
}

function displayManyGifs(response){
    response.forEach(function(gif) {
        const gif_url = gif.images.preview_gif.url
        results.innerHTML += `
        <a target = "_blank" rel="noopener" href=${gif.url}>
            <img class="image" src="${gif_url}">
        </a>    
        `
    });
}

searchForm.addEventListener('submit', function(event){
    event.preventDefault()
    if(searchInput.value ==='') return
    //This is to clear the results div
    results.innerHTML = ''

    getGifs(searchInput.value, 'search', displayManyGifs)
})


