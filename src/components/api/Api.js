import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29247796-24b66d41fb94834f451b18c5a';
const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 20,
  },
});

export const getPhotos = async (page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      page,
    },
  });
  return data;
};
export const searchPhotos = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
