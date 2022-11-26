import { renderMarkupGallery } from './js/renderMarkupGallery';
import { fetchPhotos } from './js/fetchPhotos';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import throttle from 'lodash.throttle';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loading = document.querySelector('.loading');
const submitBtn = document.querySelector('button[type=submit]');

const PER_PAGE = 5;
let value = '';
let page = 1;
let remainder = 0;

form.addEventListener('submit', onSubmit);
window.addEventListener('scroll', throttle(loadMore, 1000));

// --------------------------------
async function onSubmit(e) {
  e.preventDefault();
  value = e.currentTarget.elements.searchQuery.value;

  loading.classList.remove('is-hidden');

  if (value === '') {
    return Notify.failure('Enter something');
  }

  gallery.innerHTML = '';
  submitBtn.disabled = true;
  page = 1;

  const response = await fetchPhotos(value, page);

  submitBtn.disabled = false;

  if (response.data.hits.length === 0) {
    Notify.failure('Nothing found ');
    return;
  }

  Notify.success(`Hooray! We found ${response.data.totalHits} images.`);

  remainder = response.data.totalHits;

  gallery.insertAdjacentHTML(
    'beforeend',
    renderMarkupGallery(response.data.hits)
  );
}

// ----------------------------------------------------------

async function loadMore() {
  // отримуємо у прямокутника кооординати
  const documentRect = document.documentElement.getBoundingClientRect();

  //висота(в px) правої нижньої точки(в доному випадку documenta) від верху вьюпорта
  // тобто чим нижче ми опускаємося вниз тим менша висота між висотою вьюпорта і
  // правою нижньою точкою елемента(в даному випадку документа)
  // console.log(documentRect.bottom);

  // значение равно внутренней высоте элемента(висота вьюпорта)
  // console.log(document.documentElement.clientHeight);

  if (documentRect.bottom < document.documentElement.clientHeight + 150) {
    remainder -= PER_PAGE;
    console.log(remainder);
    if (remainder < 1) {
      window.removeEventListener('scroll', throttle(loadMore, 1000));
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
  }
}
