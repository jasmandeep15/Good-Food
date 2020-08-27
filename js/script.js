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
        console.log('click');
    });
});

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    modalOverlay.classList.toggle('open');
    getCityId(cityInput.value)
    const currentCity = document.getElementById('currentCity');
    currentCity.innerText = cityInput.value;
    console.log(cityID)
    //getCusineByCity(String(cityID));

});

function getCityId(city) {
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
            console.log(res.location_suggestions[0].name);
            cityID = res.location_suggestions[0].id;
            //console.log(cityID);
        });
};


function getCusineByCity(cityID) {
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
                // const listItem = document.createElement('p');
                // body.appendChild(listItem);
                // listItem.innerText = item.name;
                // returnitem.cuisine.cuisine_name);
                console.log("Cuisine, ", item.cuisine.cuisine_name)
            });
        });
}

function getEstablishmentsByCity(cityID) {
    let url = `https://developers.zomato.com/api/v2.1/establishments?city_id=${cityID}`;
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
            console.log(res);
            res.establishments.forEach((item) => {
                // const listItem = document.createElement('p');
                // body.appendChild(listItem);
                // listItem.innerText = item.name;
                console.log(item.establishment.name);
            });
        });
}

//getCusineByCity('288');
