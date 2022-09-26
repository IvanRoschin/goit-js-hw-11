import '../src/sass/index.scss';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import ImagesApiService from '../src/js/images-service';
import markupImages from '../src/js/render-card-markup';

//!Variables
const refs = {
  searchForm: document.querySelector('.js-search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const imagesApiService = new ImagesApiService();

//!Listeners
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
window.addEventListener('scroll', smoothScroll);

// !Functions
// 1.1. Запрос на бекенд

function onSearch(e) {
  e.preventDefault();
  imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  imagesApiService.resetPage();

  if (imagesApiService.query === '') {
    return Notiflix.Notify.failure(
      `❌ Ошибка, поле запроса не может быть пустым`
    );
  }
  renderGallery();
}
// 1.2. Рендер разметки
async function renderGallery() {
  try {
    imagesApiService.fetchImages().then(data => {
      clearImageContainer();
      refs.loadMoreBtn.classList.remove('is-hidden');
      if (!data.hits.length) {
        Notiflix.Notify.warning(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        refs.loadMoreBtn.classList.add('is-hidden');
        return;
      }
      appendImagesMarkup(data);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images !!!`);
      lightbox.refresh();
    });

    var lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  } catch (error) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

// 1.3. Загрузить больше
function onLoadMore() {
  imagesApiService.fetchImages().then(data => {
    if (data.hits.totalHits === data.hits.totalPages) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMoreBtn.classList.add('is-hidden');
      return;
    }
    appendImagesMarkup(data);
  });
}
// 1.4. Добавляем разметку в хтмл
function appendImagesMarkup(images) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', markupImages(images));
}
// 1.5. Чистим контейнер
function clearImageContainer() {
  refs.galleryContainer.innerHTML = '';
}
