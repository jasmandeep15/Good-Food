'use strict';

let cityID;
let cuisine;


(function () {
    const restaurantOverlay = document.querySelector('.restaurant-overlay');
    const cityInput = document.getElementById('cityInput');
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', function (e) {

        e.preventDefault();
        getListOfCities(cityInput.value);
    });

    const closeModal = document.getElementById('close-modal');
    closeModal.addEventListener('click', function () {
        restaurantOverlay.classList.toggle('open');
        restaurantContainer.innerText = '';
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(item => {
        const spinner = document.getElementById('spinner');
        item.addEventListener('click', () => {
            switch (item.id) {
                case 'card1':
                    restaurantOverlay.classList.toggle('open');
                    restaurantContainer.append(spinner);
                    getEstablishmentsByCity(cityID, 168);
                    break;
                case 'card2':
                    restaurantOverlay.classList.toggle('open');
                    restaurantContainer.append(spinner);
                    getEstablishmentsByCity(cityID, 82);
                    break;
                case 'card3':
                    restaurantOverlay.classList.toggle('open');
                    restaurantContainer.append(spinner);
                    getEstablishmentsByCity(cityID, 83);
                    break;
                case 'card4':
                    restaurantOverlay.classList.toggle('open');
                    restaurantContainer.append(spinner);
                    getEstablishmentsByCity(cityID, 193);
                    break;
                case 'card5':
                    restaurantOverlay.classList.toggle('open');
                    restaurantContainer.append(spinner);
                    getEstablishmentsByCity(cityID, 55);
                    break;
                case 'card6':
                    restaurantOverlay.classList.toggle('open');
                    restaurantContainer.append(spinner);
                    getRandomCuisineByCity(cityID);
                    break;
                default:
                    console.log('Default');
            }
        });
    });
})()



function fetchZomatoAPI(url) {
    const apiKey = `5c33e02d2f956b33f9e47edc7424cf4c`;
    const fetchVar = fetch(url, {
        headers: { 'user-key': apiKey },

    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
    return fetchVar;
}


function getListOfCities(city) {
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalContent = document.querySelector('.modal-content');
    const cityList = document.querySelector('.city-list');
    let url = `https://developers.zomato.com/api/v2.1/cities?q=${city}`;
    fetchZomatoAPI(url)
        .then((res) => {
            cityList.innerHTML = '';
            console.log(res.location_suggestions);
            res.location_suggestions.forEach((item) => {
                let li = document.createElement('li');
                li.classList.add('modal-city-list');
                li.innerText = item.name;
                cityList.appendChild(li);
                li.addEventListener('click', () => {
                    modalOverlay.classList.toggle('open');
                    currentCity.innerText = item.name;
                    setCityId(item.id);
                })
            });
        })
};

function setCityId(id) {
    cityID = id;
}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomCuisineByCity(cityID) {
    let url = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityID}`;
    fetchZomatoAPI(url)
        .then((res) => {
            const randomIndex = randomNumber(0, res.cuisines.length);
            cuisine = res.cuisines[randomIndex].cuisine.cuisine_id;
            //console.log(cuisine);
            getEstablishmentsByCity(cityID, cuisine);
        });
}

function getEstablishmentsByCity(cityID, cuisine) {
    const restaurantContainer = document.getElementById('restaurantContainer')
    let url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&start=1&count=6&cuisines=${cuisine}&sort=rating`;
    fetchZomatoAPI(url)
        .then((res) => {
            restaurantContainer.innerHTML = '';
            res.restaurants.forEach((item) => {
                let restaurantName = item.restaurant.name;
                let restaurantAddress = item.restaurant.location.address;
                let restaurantHours = item.restaurant.timings;
                let restaurantWebsite = item.restaurant.url;
                let cuisineName = item.restaurant.cuisines;
                //console.log("Restaurant: ", restaurantName, restaurantAddress, restaurantHours, restaurantWebsite);
                let lat = item.restaurant.location.latitude;
                let long = item.restaurant.location.longitude;
                console.log(restaurantName, lat, long);

                restaurantContainer.classList.add('has-text-primary-light');
                const cuisineHeader = document.createElement('h1');
                cuisineHeader.classList.add('cuisine-header');

                const h1 = document.createElement('h1');
                h1.classList.add('title');
                h1.classList.add('pt-4');
                h1.classList.add('has-text-info-light');

                const p = document.createElement('p');
                p.classList.add('subtitle');
                p.classList.add('has-text-info-light');

                const a = document.createElement('a');
                a.classList.add('pb');
                a.classList.add('has-text-black');
                a.classList.add('has-text-strong');
                a.classList.add('has-text-border');


                // Mapquest API
                const mapDiv = document.createElement('div');
                mapDiv.setAttribute('id', 'mapid');
                mapDiv.classList.add('map-div');
                let mapImg = document.createElement('img');
                let mapImageUrl = 'not-found.png';
                if (long !== "0.0000000000") {
                    mapImageUrl = `https://www.mapquestapi.com/staticmap/v5/map?locations=${lat},${long}&size=200,200&key=xeCphPXGmQ9H0qZ0fCSxVdrJzLOQPtsP`;

                } else {
                    mapImageUrl = 'not-found.png';
                }
                mapImg.setAttribute('src', mapImageUrl);
                mapDiv.appendChild(mapImg);


                const timings = document.createElement('p');

                cuisineHeader.innerText = "Cuisine(s): " + cuisineName;
                h1.innerText = restaurantName;
                p.innerText = restaurantAddress;
                timings.innerText = restaurantHours;
                a.innerText = 'Website';
                a.setAttribute('href', restaurantWebsite);
                restaurantContainer.appendChild(cuisineHeader);
                restaurantContainer.appendChild(h1);
                restaurantContainer.appendChild(p);
                restaurantContainer.appendChild(timings);
                restaurantContainer.appendChild(a);

                restaurantContainer.appendChild(mapDiv);
                restaurantContainer.appendChild(document.createElement('hr'));

            });
        });
}


// Pexel API - Random pictures displayed on selection cards
const pexelApiKey = '563492ad6f917000010000015b1b377af3ac48368c8dbfb885947855';
const burgers = document.getElementById('burgerPicture');
const pizzaPicture = document.getElementById('pizzaPicture');
const seafoodPicture = document.getElementById('seafoodPicture');
const bbqPicture = document.getElementById('bbqPicture');
const pastaPicture = document.getElementById('italianPicture');

function getRandomPicture(category, element) {
    let url = `https://api.pexels.com/v1/search?query=${category}&per_page=5`;
    let fetchVar = fetch(url, {
        headers: {
            'Authorization': pexelApiKey,
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .then((res) => {
            console.log(res)
            let sizedPhotos = res.photos.filter(item => {
                return item.width > item.height
            });
            let randomIndex = Math.floor(Math.random() * sizedPhotos.length);
            let randomPhoto = sizedPhotos[randomIndex].src.medium;
            element.setAttribute('src', randomPhoto)
        });
    return fetchVar;
};


// getRandomPicture('Burger', burgers);
// getRandomPicture('Pizza', pizzaPicture);
// getRandomPicture('Seafood', seafoodPicture);
// getRandomPicture('BBQ pork', bbqPicture);
// getRandomPicture('Pasta', pastaPicture);

// var rangeslider = document.getElementById("sliderRange");
// var output = document.getElementById("demo");
// output.innerHTML = rangeslider.value;

// rangeslider.oninput = function() {
//   output.innerHTML = this.value;
// }