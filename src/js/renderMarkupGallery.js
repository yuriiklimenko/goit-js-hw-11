export function renderMarkupGallery(photos) {
  return photos
    .map(photo => {
      return `<div class="photo-card">
              <a class="photo-link" href="${photo.largeImageURL}">
                <img class="photo-img" src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
                 <div class="info">
                  <p class="info-item">
                    <b>Likes</b>${photo.likes}
                  </p>
                  <p class="info-item">
                    <b>Views</b>${photo.views}
                  </p>
                  <p class="info-item">
                    <b>Comments</b>${photo.comments}
                  </p>
                  <p class="info-item">
                    <b>Downloads</b>${photo.downloads}
                  </p>
                </div>
               </a>
              </div>`;
    })
    .join('');
}

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
