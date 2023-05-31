import axios from 'axios';
export default async function fetchImages() {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  try {
    const response = await axios.get(url);
    const images = response.data.hits;
    totalHits = response.data.totalHits; // update totalHits with each request

    if (images.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      appendImages(images);
      if (totalHits <= page * 40) {
        // compare totalHits with the number of displayed images
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        loadMoreBtn.style.display = 'block';
      }
    }
  } catch (error) {
    Notiflix.Notify.failure('An error occurred while fetching data.');
  }
  page += 1;
}
