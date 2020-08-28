'use strict';
const cards = document.querySelectorAll('.card');
const cityInput = document.getElementById('cityInput');
const submitButton = document.getElementById('submitButton');
const modalOverlay = document.querySelector('.modal-overlay')
const apiKey = `5c33e02d2f956b33f9e47edc7424cf4c`;
const pexelApiKey = '563492ad6f917000010000015b1b377af3ac48368c8dbfb885947855';
let cityID;


cards.forEach((card) => {
    card.addEventListener('click', () => {
       // console.log('click');
    });
});

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    modalOverlay.classList.toggle('open');
    getCityId(cityInput.value).then(cityID => {
        console.log(cityID);
        //getCuisineByCity(cityID);
        getEstablishmentsByCity(cityID);
    });
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




function getCuisineByCity(cityID) {
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
            res.cuisines.forEach((item) => {
                //create loop to randomly select cuisine
                console.log(item.cuisine.cuisine_name, item.cuisine.cuisine_id);
            });
        });
}

function getEstablishmentsByCity(cityID) {
    const cuisine = 82; // cuisine ID for pizza 
    const restaurantList = document.getElementById('restaurantList'); 
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
            res.restaurants.forEach((item) => {
                    let restaurantName = item.restaurant.name;
                    let restaurantAddress = item.restaurant.location.address;
                    let restaurantHours = item.restaurant.timings;
                    let restaurantWebsite = item.restaurant.url;
                    console.log("Restaurant: ", restaurantName, restaurantAddress, restaurantHours, restaurantWebsite);
            });
        });
}


//getCusineByCity('288');
