const key = "ASz-7F7MDZXXuGmykn1-9-7MKFNxJCrT0I-EbF0rOX4";
const input_box = document.getElementById('search');
const imgResults = document.getElementById('gallery');
const showMoreBtn = document.getElementById('show-more-btn');
const searchBtn = document.getElementById('search-btn');


let keyword = "";
let page =1;

async function searchImages() {
    keyword = input_box.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    if (results.length>0) {
        results.map((result) => {
            const image = document.createElement('img');
            image.src = result.urls.small;
            const imageLink = document.createElement('a')
            imageLink.href = result.links.html;
            imageLink.target="_blank";
    
            imageLink.appendChild(image);
    
            imgResults.appendChild(imageLink);
        })
        showMoreBtn.style.display = 'block';
    }
    else{
        showMoreBtn.style.display = 'none';

    }
}

searchBtn.addEventListener("click", (e)=>{
e.preventDefault();
page=1;
imgResults.innerHTML='';
searchImages();
})
input_box.addEventListener("keydown", (e)=>{
    if(e.key=== "Enter"){
e.preventDefault();
page=1;
imgResults.innerHTML='';
searchImages();
    }
})

showMoreBtn.addEventListener('click', ()=>{
    page++;
    searchImages();
})
