const key = "ASz-7F7MDZXXuGmykn1-9-7MKFNxJCrT0I-EbF0rOX4";
const input_box = document.getElementById('search');
const imgResults = document.getElementById('gallery');
const showMoreBtn = document.getElementById('show-more-btn');
const searchBtn = document.getElementById('search-btn');

let keyword = "";
let page = 1;

async function downloadImage(imageUrl, imageName) {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = imageName || 'image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading image:', error);
        alert('Failed to download image. Please try again.');
    }
}

async function searchImages() {
    try {
        keyword = input_box.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}`;
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (results.length > 0) {
            results.forEach((result) => {
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');

                const image = document.createElement('img');
                image.src = result.urls.small;
                image.alt = result.alt_description || 'Unsplash Image';

                const downloadBtn = document.createElement('button');
                downloadBtn.classList.add('download-btn');
                downloadBtn.textContent = 'Download';
                
                const filename = `${result.description || 'unsplash-image'}-${result.id}.jpg`
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, '-');

                downloadBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    downloadImage(result.urls.full, filename);
                });

                imageContainer.appendChild(image);
                imageContainer.appendChild(downloadBtn);
                imgResults.appendChild(imageContainer);
            });
            
            showMoreBtn.style.display = 'block';
        } else {
            if (page === 1) {
                imgResults.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #fff;">No images found. Try a different search term.</p>';
            }
            showMoreBtn.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        imgResults.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #fff;">An error occurred. Please try again.</p>';
        showMoreBtn.style.display = 'none';
    }
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    page = 1;
    imgResults.innerHTML = '';
    searchImages();
});

input_box.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        page = 1;
        imgResults.innerHTML = '';
        searchImages();
    }
});

showMoreBtn.addEventListener('click', () => {
    page++;
    searchImages();
});