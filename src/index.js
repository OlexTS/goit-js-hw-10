import './css/styles.css';
import { Notify } from 'notiflix';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputSearchBoxRef = document.querySelector('#search-box');
const searchListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputSearchBoxRef.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const checkCountry = event.target.value.trim();

  if (!checkCountry) {
    return (searchListRef.innerHTML = ''), (countryInfoRef.innerHTML = '');
  }

  searchListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';

  fetchCountries(checkCountry).then(data => {
    if (!data) {
      return;
    }
    onСountCountry(data);
  });
}

function onСountCountry(arrCountries) {
  if (arrCountries.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (arrCountries.length > 1 && arrCountries.length <= 10) {
    return createMarkupList(arrCountries);
  } else {
    createMarkupInfo(arrCountries);
  }
}

function createMarkupList(arrow) {
  const markup = arrow
    .map(({ name, flags }) => {
      return `<li class="country-item">
  <img class="country-img" src="${flags.svg}" alt="${name}" />
  <p class="country-text">${name}</p>
</li>`;
    })
    .join('');

  searchListRef.innerHTML = markup;
}

function createMarkupInfo(arrow) {
  const markup = arrow
    .map(
      ({
        name,
        capital,
        population,
        flags,
        languages,
      }) => `<div class="country-info-box">
      
  <img class="country-info-img" src="${flags.svg}" alt="${name}" />
  <h1 class="country-title">${name}</h1>
  <p class="country-info-text"><span class="country-el">Capital: </span>${capital}</p>
  <p class="country-info-text"><span class="country-el">Population: </span>${population}</p>
  <p class="country-info-text"><span class="country-el">Languages: </span>${languages
    .map(({ name }) => `<span>${name}</span>`)
    .join(', ')}</p>
</div>`
    )
    .join('');

  countryInfoRef.innerHTML = markup;
}
