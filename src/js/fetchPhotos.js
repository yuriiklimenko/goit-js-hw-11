// const axios = require('axios').default;

// export async function fetchPhotos(value, page) {
//   const BASE_URL = 'https://pixabay.com/api';

//   // axios приймає другим параметром об'єкт у якого властивість(params) зі значенням об'єкт {}
//   //  у якого властивість це значення це параметр( строки запиту
//   const options = {
//     params: {
//       key: '30733564-741f3ed68786028815fba657d',
//       image_type: 'photo',
//       q: value,
//       orientation: 'horizontal',
//       safesearch: 'true',
//       per_page: '40',
//       page: page,
//     },
//   };

//   return await axios.get(BASE_URL, options);
// }
// ====================================================
// `${BASE_LINK}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
const axios = require('axios').default;

export async function fetchPhotos(value, page) {
  const BASE_URL = 'https://pixabay.com/api';

  // axios приймає другим параметром об'єкт у якого властивість(params) зі значенням об'єкт {}
  //  у якого властивість це значення це параметр( строки запиту
  const options = {
    params: {
      key: '30733564-741f3ed68786028815fba657d',
      image_type: 'photo',
      q: value,
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: '40',
      page: page,
    },
  };

  const response = await axios.get(BASE_URL, options);

  return response;
}
