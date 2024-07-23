const skeleton = document.querySelector(".skeleton")
const wrapper = document.querySelector(".wrapper")
const seeMore = document.querySelector(".see__more")
const collection = document.querySelector(".collection")


const API__URL = "https://dummyjson.com"


for(let i = 0; i < 6; i++){
    let skeletonItem = document.createElement("div")
    skeletonItem.classList.add("skeleton__item")
    skeletonItem.innerHTML = `
        <div class="skeleton__img skeleton__animation"></div>
        <div class="skeleton__line skeleton__animation"></div>
        <div class="skeleton__line skeleton__animation"></div>
        <div class="skeleton__line skeleton__animation"></div>

    `
    skeleton.append(skeletonItem)
}

let offset = 1
let perPageCount = 6
let categoryValue = ""

async function fetchData(api, limit, category){
    let reponse =  await fetch (`${api}/products${category}?limit=${limit}`)
    reponse
        .json()
        .then(res => createCard(res))
        .catch(err => console.log(err))
        .finally(()=>{  
            skeleton.style.display = 'none'
        })

}
fetchData(API__URL, perPageCount, "")

function createCard(data){
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }

    data.products.forEach((product)=>{
        let cardItem = document.createElement("div")
        cardItem.classList.add("card")
        cardItem.innerHTML = `
            <img src=${product.images[0]} alt="">
            <h3>${product.title}</h3>
            <p class="desc" title="${product.description}">${product.description}</p>
            <button>Buy now</button>
        `
        wrapper.appendChild(cardItem)
    })
    
}


 seeMore.addEventListener('click', ()=>{
    offset++
    fetchData(API__URL, perPageCount * offset, categoryValue)
 })

async function fetchCategory(api){
    let response = await fetch(`${api}/products/category-list`)
    response
        .json()
        .then(res => createCategory(res))
        .catch(err => console.log(err))
}

fetchCategory(API__URL)

function createCategory(data){
    data.forEach((category)=>{
        let list = document.createElement("li")
        list.className = "item"
        list.innerHTML = `
            <data value="/category/${category}">${category}</data>
        `
        collection.appendChild(list)
    })
}

collection.addEventListener("click", (e)=>{
    if(e.target.tagName === "DATA"){
        categoryValue =  e.target.value
        fetchData(API__URL, perPageCount, categoryValue)
    }
})


