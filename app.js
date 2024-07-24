const skeleton = document.querySelector(".skeleton");
const wrapper = document.querySelector(".wrapper");
const seeMore = document.querySelector(".see__more");
const collection = document.querySelector(".collection");

const API_URL = "https://dummyjson.com";

for (let i = 0; i < 6; i++) {
    let skeletonItem = document.createElement("div");
    skeletonItem.classList.add("skeleton__item");
    skeletonItem.innerHTML = `
        <div class="skeleton__img skeleton__animation"></div>
        <div class="skeleton__line skeleton__animation"></div>
        <div class="skeleton__line skeleton__animation"></div>
        <div class="skeleton__line skeleton__animation"></div>
    `;
    skeleton.append(skeletonItem);
}

let offset = 1;
let perPageCount = 6;
let categoryValue = "";

async function fetchData(api, limit, category) {
    try {
        let response = await fetch(`${api}/products${category}?limit=${limit}`);
        let res = await response.json();
        createCard(res);
    } catch (err) {
        console.error(err);
    } finally {
        skeleton.style.display = 'none';
    }
}

fetchData(API_URL, perPageCount, "");

function createCard(data) {
    while (wrapper.firstChild) {
        wrapper.firstChild.remove();
    }

    data.products.forEach((product) => {
        let cardItem = document.createElement("div");
        cardItem.classList.add("card");
        cardItem.dataset.id = product.id;

        cardItem.innerHTML = `
            <img src="${product.images[0]}" class="card__images" alt="">
            <h3>${product.brand}</h3>
            <p class="desc" title="${product.description}">${product.description}</p>
        `;
        wrapper.appendChild(cardItem);
    });
}

wrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("card__images")) {
        window.location.href = `/pages/page.html?id=${e.target.closest(".card").dataset.id}`;
    }
});

seeMore.addEventListener('click', () => {
    offset++;
    fetchData(API_URL, perPageCount * offset, categoryValue);
});

async function fetchCategory(api) {
    try {
        let response = await fetch(`${api}/products/categories`);
        let res = await response.json();
        createCategory(res);
    } catch (err) {
        console.error(err);
    }
}

fetchCategory(API_URL);

function createCategory(data) {
    data.forEach((category) => {
        let list = document.createElement("li");
        list.className = "item";
        list.innerHTML = `
          
        `;
        collection.appendChild(list);
    });
}

collection.addEventListener("click", (e) => {
    if (e.target.tagName === "DATA") {
        categoryValue = e.target.value;
        fetchData(API_URL, perPageCount, categoryValue);
    }
});
