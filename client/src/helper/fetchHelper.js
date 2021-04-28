import * as fetch from 'node-fetch';
const baseUrl = 'http://localhost:3000';

export const fetchGet = async (url = '') => {
  console.log('GET', url);
  const response = await fetch(baseUrl + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${window.localStorage.getItem('user_id')}`,
    },
  });
  return await response.json();
};
