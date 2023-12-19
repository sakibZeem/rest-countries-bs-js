// fetch rest-countries api
let url = 'https://restcountries.com/v3.1/all';
const loadCountries = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountries(data))
}

const displayCountries = countries => {
    const countryContainer = document.getElementById('country-container');
    countryContainer.innerHTML = '';
    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('col');
        countryDiv.innerHTML = `
        <div class="card h-100 shadow">
            <img class="img-fluid" src=${country.flags.svg} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <button onclick="loadCountryDetails(${country.ccn3})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#country-details">
                  More Details
                </button>
        </div>`
        countryContainer.appendChild(countryDiv);
    })
}

const searchCountry = () => {
    const searchText = document.getElementById('search-text');
    url = `https://restcountries.com/v3.1/name/${searchText.value}`;
    searchText.value = '';
    loadCountries(url);
}

const loadCountryDetails = (ccn3) => {
    const url = `https://restcountries.com/v3.1/alpha/${ccn3}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountryDetails(data[0]))
}

const displayCountryDetails = country => {
    document.getElementById('countryDetailsLabel').innerText = country.name.common;
    const mealDetails = document.getElementById('countryDetailsBody');
    mealDetails.innerHTML = `
    <img class="img-fluid" src="${country.flags.png}">
    <p class="mt-2">Capital: ${country.capital}</p>
    <p class="mt-2">Time-Zone: ${country.timezones}</p>
    <p class="mt-2">Population: ${country.population}</p>
    <p class="mt-2">Map: <a href=${country.maps.googleMaps} target="_blank">Click here</a></p>`
}
loadCountries(url);