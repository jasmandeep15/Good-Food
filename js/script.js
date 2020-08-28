'use strict';
const cards = document.querySelectorAll('.card');
const cityInput = document.getElementById('cityInput');
const submitButton = document.getElementById('submitButton');
const modalOverlay = document.querySelector('.modal-overlay')
const apiKey = `5c33e02d2f956b33f9e47edc7424cf4c`;

cards.forEach((card) => {
    card.addEventListener('click', () => {
        console.log('click');
    });
});

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    modalOverlay.classList.toggle('open');
    getCityId(cityInput.value).then(cityID => {
        console.log(cityID);
        getCusineByCity(cityID);
    })
    // console.log(cityID)
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
                if (item.cuisine.cuisine_name === 'BBQ' || item.cuisine.cuisine_name === 'Burger' || item.cuisine.cuisine_name === 'Pizza' || item.cuisine.cuisine_name === 'Seafood' || item.cuisine.cuisine_name === 'Italian' || item.cuisine.cuisine_name === 'American')
                // .fil= 'BBQ')ter(cusine => cuisine_name != 
                {
                    console.log("Cuisine, ", item.cuisine.cuisine_name);

                }
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







// Pexel API - Random pictures displayed on selection cards
const pexelApiKey = '563492ad6f917000010000015b1b377af3ac48368c8dbfb885947855';
const americanFood = document.getElementById('americanFoodPicture');
const burgers = document.getElementById('burgerPicture');
const pizzaPicture = document.getElementById('pizzaPicture');
const seafoodPicture = document.getElementById('seafoodPicture');
const bbqPicture = document.getElementById('bbqPicture');
const italianPicture = document.getElementById('italianPicture');


function getRandomPicture(category, element) {
    let url = `https://api.pexels.com/v1/search?query=${category}&per_page=10&orientation=landscape`;
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
            console.log(sizedPhotos[randomIndex])
            let randomPhoto = sizedPhotos[randomIndex].src.medium;
            element.setAttribute('src', randomPhoto)
        });
    return fetchVar;
};

getRandomPicture('American food', americanFood);
getRandomPicture('Burger', burgers);
getRandomPicture('Pizza', pizzaPicture);
getRandomPicture('Seafood', seafoodPicture);
getRandomPicture('BBQ pork', bbqPicture);
getRandomPicture('Pasta', italianPicture);