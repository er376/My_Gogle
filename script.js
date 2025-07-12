const formEl = document.getElementById('form');
const buttonEl = document.getElementById('button');
const inputEl = document.getElementById('input');
const accessKey = "3JfCShUWuLDDM2ExAe3iMKQ1Syo9EMqbxvEROjFDvH8";
const resultsEl = document.getElementById('results')
let page = 1;
buttonEl.style.display = "none"

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    resultsEl.innerHTML = "";
    fetchimages();
    buttonEl.style.display = "block"
})
buttonEl.addEventListener('click', (event) => {
    event.preventDefault();
    page++
    fetchimages();
})


async function fetchimages() {
    const inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    for (let item of data.results) {
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');

        const imageEl = document.createElement('img');
        imageEl.classList.add('image')
        imageEl.setAttribute('src', item.urls.regular)

        const aEl = document.createElement('a');
        aEl.classList.add('description');
        aEl.innerText = item.alt_description;
        aEl.setAttribute("href", item.links.html);
        aEl.setAttribute("target", "_blank")

        cardEl.append(imageEl);
        cardEl.append(aEl);
        resultsEl.append(cardEl);
    }
}

