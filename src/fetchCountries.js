import Notiflix from "notiflix";
const inputRef = document.getElementById('search-box');

export default  function fetchCountries(name) {
   
       return fetch(`https://restcountries.com/v2/name/${name}`)
           .then(response => {
               if (!response.ok) {
                   throw new Error('Error')
               }
        return response.json();
           })
    
           .catch(error => {
  
      inputRef.value = ''
      Notiflix.Notify.failure('Oops,something went wrong. Please try again later');
  });
   
}
