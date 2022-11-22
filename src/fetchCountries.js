import { Notify } from 'notiflix';

const BASE_URL = 'https://restcountries.com/v2/name/';
const API_PARAMS = 'fields=name,capital,population,flags,languages';
function fetchCountries(name = 'ukraine') {
  return fetch(`${BASE_URL}${name}?${API_PARAMS}`)
    .then(response => {
      // console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      console.error(error);
    });
}

export default fetchCountries;
