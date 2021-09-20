
import Notiflix from "notiflix";
import fetchCountries from './fetchCountries';
import countryCard from './countryCard'
import countryNameFlag from './countryNameFlag'
const inputRef = document.getElementById('search-box');
const countryHolder = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

inputRef.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function renderCountriesCard(country) {
      if (country.length === 1) {
          const markup = country[0];
          countryHolder.insertAdjacentHTML('afterbegin', countryCard(markup));
       
    } else if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
       
    } else if (country.length >= 2 && country.length <= 10) {
        const markup = countryNameFlag(country);
        countryHolder.insertAdjacentHTML('afterbegin', markup)
      
    
    } else if(country.status === 404) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            }
}

let lastRequest = "";

function onSearch(e) {
    clearInput()
    if (e.target.value.trim() === "")
        return
    if (lastRequest === e.target.value.trim())
        return
    lastRequest = e.target.value.trim()
    
    const searchCountry = e.target.value;
    // countryHolder.innerHTML = '';

    fetchCountries(lastRequest)
    .then(renderCountriesCard)
 .catch(error => console.log(error))
    
}

function clearInput() {
    inputRef.innerHTML = ''
    countryHolder.innerHTML = ''
}
