import { renderMarkupGallery } from './js/renderMarkupGallery';
import { fetchPhotos } from './js/fetchPhotos';
import { smoothScrollToBottom } from './js/smoothScrollToBottom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import throttle from 'lodash.throttle';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

var lightbox = new SimpleLightbox('.gallery a');

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loading = document.querySelector('.loading');
const submitBtn = document.querySelector('button[type=submit]');

const PER_PAGE = 40;
let value = '';
let page = 1;
let remainder = 0;

const loadMore = throttle(async () => {
  loading.classList.remove('is-hidden');

  // отримуємо у прямокутника координати
  const documentRect = document.documentElement.getBoundingClientRect();

  //висота(в px) правої нижньої точки(в доному випадку documenta) від верху вьюпорта
  // тобто чим нижче ми опускаємося вниз тим менша висота між висотою вьюпорта і
  // правою нижньою точкою елемента(в даному випадку документа)
  // console.log(documentRect.bottom);

  // значение равно внутренней высоте элемента(висота вьюпорта)
  // console.log(document.documentElement.clientHeight);

  if (documentRect.bottom < document.documentElement.clientHeight + 150) {
    remainder -= PER_PAGE;

    if (remainder < 1) {
      window.removeEventListener('scroll', loadMore);

      loading.classList.add('is-hidden');
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );

      return;
    }
    page++;

    const response = await fetchPhotos(value, page);

    gallery.insertAdjacentHTML(
      'beforeend',
      renderMarkupGallery(response.data.hits)
    );
    smoothScrollToBottom();
    lightbox.refresh();
  }

  loading.classList.add('is-hidden');
}, 300);
// --------------------------------------------

form.addEventListener('submit', onSubmit);
window.addEventListener('scroll', loadMore);

// --------------------------------
async function onSubmit(e) {
  e.preventDefault();
  value = e.currentTarget.elements.searchQuery.value;

  if (value === '') {
    Notify.failure('Enter something');
    return;
  }

  loading.classList.remove('is-hidden');

  gallery.innerHTML = '';
  submitBtn.disabled = true;
  page = 1;

  const response = await fetchPhotos(value, page);

  submitBtn.disabled = false;

  if (response.data.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loading.classList.add('is-hidden');
    return;
  }

  Notify.success(`Hooray! We found ${response.data.totalHits} images.`);

  remainder = response.data.totalHits;

  gallery.insertAdjacentHTML(
    'beforeend',
    renderMarkupGallery(response.data.hits)
  );

  loading.classList.add('is-hidden');
  lightbox.refresh();
}
