'use strict';
const cards = document.querySelectorAll('.card'),
    cityInput = document.getElementById('cityInput'),
    submitButton = document.getElementById('submitButton'),
    modalOverlay = document.querySelector('.modal-overlay'),
    card1 = document.getElementById('card1'),
    card2 = document.getElementById('card2'),
    card3 = document.getElementById('card3'),
    card4 = document.getElementById('card4'),
    card5 = document.getElementById('card5'),
    card6 = document.getElementById('card6'),
    restaurantOverlay = document.querySelector('.restaurant-overlay'),
    closeModal = document.getElementById('close-modal'),
    apiKey = `5c33e02d2f956b33f9e47edc7424cf4c`;



let cityID;
let cuisine;


cards.forEach(item => {
    item.addEventListener('click', () => {
        switch (item.id) {
            case 'card1':
                restaurantOverlay.classList.toggle('open');
                getEstablishmentsByCity(cityID, 168);
                break;
            case 'card2':
                restaurantOverlay.classList.toggle('open');
                getEstablishmentsByCity(cityID, 82);
                break;
            case 'card3':
                restaurantOverlay.classList.toggle('open');
                getEstablishmentsByCity(cityID, 83);
                break;
            case 'card4':
                restaurantOverlay.classList.toggle('open');
                getEstablishmentsByCity(cityID, 193);
                break;
            case 'card5':
                restaurantOverlay.classList.toggle('open');
                getEstablishmentsByCity(cityID, 55);
                break;
            case 'card6':
                restaurantOverlay.classList.toggle('open');
                getRandomCuisineByCity(cityID);
                break;
            default:
                console.log('Default');
        }
    })
});


closeModal.addEventListener('click', function () {
    restaurantOverlay.classList.toggle('open');

});

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    getListOfCities(cityInput.value)
});





function getListOfCities(city) {
    const modalContent = document.querySelector('.modal-content')
    let url = `https://developers.zomato.com/api/v2.1/cities?q=${city}`;
    fetch(url, {
        headers: {
            'user-key': apiKey,
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .then((res) => {
            console.log(res.location_suggestions);
            res.location_suggestions.forEach((item) => {
                let li = document.createElement('li');
                li.classList.add('modal-city-list');
                // li.setAttribute('id',)
                console.log(item)
                li.innerText = item.name;
                modalContent.appendChild(li);
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

function getCityId(city) {
    const currentCity = document.getElementById('currentCity');
    let url = `https://developers.zomato.com/api/v2.1/cities?q=${city}`;
    let fetchVar = fetch(url, {
        headers: {
            'user-key': apiKey,
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .then((res) => {
            console.log(res.location_suggestions[0].name);
            currentCity.innerText = res.location_suggestions[0].name;
            return res.location_suggestions[0].id;
        });
    return fetchVar;
};


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomCuisineByCity(cityID) {
    let url = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityID}`;

    fetch(url, {
        headers: {
            'user-key': apiKey,
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .then((res) => {
            const randomIndex = randomNumber(0, res.cuisines.length);
            cuisine = res.cuisines[randomIndex].cuisine.cuisine_id;
            console.log(cuisine);
            getEstablishmentsByCity(cityID, cuisine);
        });
}

function getEstablishmentsByCity(cityID, cuisine) {
    let url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&start=1&count=6&cuisines=${cuisine}&sort=rating`;
    fetch(url, {
        headers: {
            'user-key': apiKey,
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .then((res) => {
            const restaurantContainer = document.getElementById('restaurantContainer');
            restaurantContainer.innerHTML = '';
            res.restaurants.forEach((item) => {

                let restaurantName = item.restaurant.name;
                let restaurantAddress = item.restaurant.location.address;
                let restaurantHours = item.restaurant.timings;
                let restaurantWebsite = item.restaurant.url;
                console.log("Restaurant: ", restaurantName, restaurantAddress, restaurantHours, restaurantWebsite);


                restaurantContainer.classList.add('has-background-info-dark');
                restaurantContainer.classList.add('has-text-primary-light');
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

                const mapDiv = document.createElement('div');
                mapDiv.classList.add('map-div');


                const timings = document.createElement('p');

                h1.innerText = restaurantName;
                p.innerText = restaurantAddress;
                timings.innerText = restaurantHours;
                a.innerText = 'Website';
                a.setAttribute('href', restaurantWebsite);
                restaurantContainer.appendChild(h1);
                restaurantContainer.appendChild(p);
                restaurantContainer.appendChild(timings);
                restaurantContainer.appendChild(a);

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

// getRandomPicture('American food', americanFood);
// getRandomPicture('Burger', burgers);
// getRandomPicture('Pizza', pizzaPicture);
// getRandomPicture('Seafood', seafoodPicture);
// getRandomPicture('BBQ pork', bbqPicture);
// getRandomPicture('Pasta', pastaPicture);
