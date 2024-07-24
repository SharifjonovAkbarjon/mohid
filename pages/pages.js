const API_URL = "https://dummyjson.com";
const content = document.querySelector(".content")

async function fetchSingleData(api) {
    let query = new URLSearchParams(window.location.search);
    let id = query.get("id");
    
    let response = await fetch(`${api}/products/${id}`);
    response
    .json()
    .then((mana) => createContent(mana))
    .catch((pishirib) => console.log(pishirib));
  }
  
  fetchSingleData(API_URL);
  
  function createContent(data) {
      console.log(data);
      content.innerHTML = `
      <div class="content_image">
      <img width="300" src="${data.images[0]}" alt="${data.title}">
      </div>
      <div class="content_text">
      <h1>${data.title}</h1>
      <p>${data.description}</p>
      <p>rating ${data.rating} <img src="./assets/star.png" alt=""></p>
      <button>Buy now</button>
      </div>
      `;
  }