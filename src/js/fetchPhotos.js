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
      per_page: '5',
      page: page,
    },
  };

  return await axios.get(BASE_URL, options);
}
