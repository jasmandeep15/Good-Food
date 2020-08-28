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

card1.addEventListener('click', function () {
    const userClick = document.getElementById('card1');
    restaurantOverlay.classList.toggle('open');
    const cuisine = 168; // cuisine ID for burgers
    getEstablishmentsByCity(cityID, cuisine);
});

card2.addEventListener('click', function () {
    const userClick = document.getElementById('card2');
    restaurantOverlay.classList.toggle('open');
    const cuisine = 82; // cuisine ID for pizza
    getEstablishmentsByCity(cityID, cuisine);
});

card3.addEventListener('click', function () {
    const userClick = document.getElementById('card3');
    restaurantOverlay.classList.toggle('open');
    const cuisine = 83; // cuisine ID for seafood
    getEstablishmentsByCity(cityID, cuisine);
});

card4.addEventListener('click', function () {
    const userClick = document.getElementById('card4');
    restaurantOverlay.classList.toggle('open');
    const cuisine = 193; // cuisine ID for bbq
    getEstablishmentsByCity(cityID, cuisine);
});

card5.addEventListener('click', function () {
    const userClick = document.getElementById('card5');
    restaurantOverlay.classList.toggle('open');
    const cuisine = 55; // cuisine ID for italian
    getEstablishmentsByCity(cityID, cuisine);
});

card6.addEventListener('click', function () {
    const userClick = document.getElementById('card6');
    restaurantOverlay.classList.toggle('open');
    getRandomCuisineByCity(cityID);
});

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    modalOverlay.classList.toggle('open');
    getCityId(cityInput.value).then(aCityID => {
        cityID = aCityID;
    });
});

closeModal.addEventListener('click', function () {
    restaurantOverlay.classList.toggle('open');
});

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
            //console.log(cityID);
            //getCusineByCity(res.location_suggestions[0].id)
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

                const timings = document.createElement('p');

                h1.innerText = restaurantName;
                p.innerText = restaurantAddress;
                timings.innerText = restaurantHours;
                a.innerText = 'Website';
                a.setAttribute('src', restaurantWebsite);
                restaurantContainer.appendChild(h1);
                restaurantContainer.appendChild(p);
                restaurantContainer.appendChild(timings);
                restaurantContainer.appendChild(a);

            });
        });
}



// Pexel API - Random pictures displayed on selection cards
const pexelApiKey = '563492ad6f917000010000015b1b377af3ac48368c8dbfb885947855';
const americanFood = document.getElementById('americanFoodPicture');
const burgers = document.getElementById('burgerPicture');
const pizzaPicture = document.getElementById('pizzaPicture');
const seafoodPicture = document.getElementById('seafoodPicture');
const bbqPicture = document.getElementById('bbqPicture');
const italianPicture = document.getElementById('italianPicture');



function getRandomPicture(category, element) {
    let url = `https://api.pexels.com/v1/search?query=${category}&per_page=1`;
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
// getRandomPicture('Pasta', italianPicture);