console.log("News App console");
// 54ce1638d89344eca275eb2c7ebf29a8 -> API key
let apiKey = '54ce1638d89344eca275eb2c7ebf29a8';
var articles;
let url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`;
// Get the News Container Accordion (parent div)
let newsAccordion = document.getElementById('newsAccordion');

// Fetch the news API get request
fetch(url)
.then(response => response.json())
.then(data => {
    // console.log(data.articles);
    articles = data.articles;
    let newsHTML = "";
    let num = 1;
    articles.forEach(element => {
        let news = `<div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-heading${num}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapse${num}" aria-expanded="true"
                                aria-controls="panelsStayOpen-collapse${num}">
                                ${element['title']}
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapse${num}" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-heading${num}">
                            <div class="accordion-body">
                                <img src="${element['urlToImage']}" class="img-thumbnail" style=" display : block; height: 10rem;" alt="img">
                                ${element['content']}. + <a href = "${element['url']}" target = '_blank'> Read more here </a>
                            </div>
                        </div>
                    </div>`;
        newsHTML += news;
        num++;
    });
    newsAccordion.innerHTML = newsHTML;
})
.catch(error => console.error(error));

// grab the search bar
let searchBar = document.getElementById('searchBar');
// console.log(searchBar);

// add event listener on input to searchbar
searchBar.addEventListener('input',runQuery);
function runQuery() {
    // console.log("on input running");
    // console.log(articles);
    // initialize query value as input value of searchbar
    let query = searchBar.value;
    if(query != null) {
        let newsHTML = "";
        // iterate in articles response and filter results to change the DOM
        articles.forEach((element,index) => {
            if(element['title'].toLowerCase().includes(query.toLowerCase())) {
                let news = `<div class="accordion-item">
                                <h2 class="accordion-header" id="panelsStayOpen-heading${index}">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapse${index}">
                                        ${element['title']}
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapse${index}" class="accordion-collapse collapse"
                                    aria-labelledby="panelsStayOpen-heading${index}">
                                    <div class="accordion-body">
                                        <img src="${element['urlToImage']}" class="img-thumbnail" style=" display : block; height: 10rem;" alt="img">
                                        ${element['content']}. + <a href = "${element['url']}" target = '_blank'> Read more here </a>
                                    </div>
                                </div>
                            </div>`;
                newsHTML += news;
            }
        });
        newsAccordion.innerHTML = newsHTML;
    }
}