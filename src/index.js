import Notiflix from 'notiflix';
import fetchImages from './fetchImages';
const API_KEY = '36838711-56df4c2f8a3a85471ff3834b0';
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let searchQuery = '';
let page = 1;
let totalHits = 0; // add a new variable here

loadMoreBtn.style.display = 'none';

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value;

  // Check if the search query is empty
  if (!searchQuery.trim()) {
    Notiflix.Notify.failure('Please enter a search query.');
    return;
  }

  gallery.innerHTML = '';
  page = 1;
  fetchImages();
});

loadMoreBtn.addEventListener('click', fetchImages);

function appendImages(images) {
  const markup = images
    .map(
      image => `
    <div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> ${image.likes}
        </p>
        <p class="info-item">
          <b>Views:</b> ${image.views}
        </p>
        <p class="info-item">
          <b>Comments:</b> ${image.comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b> ${image.downloads}
        </p>
      </div>
    </div>
  `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
