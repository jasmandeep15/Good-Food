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
    apiKey = `5c33e02d2f956b33f9e47edc7424cf4c`;


card1.addEventListener('click', function () {
    const userClick = document.getElementById('card1');
    const cuisine = 175; // cuisine ID for american
    console.log('click1');
    getEstablishmentsByCity(cityID);

});

card2.addEventListener('click', function () {
    const userClick = document.getElementById('card2');
    const cuisine = 168; // cuisine ID for burgers
    console.log('click2');
    getEstablishmentsByCity(cityID);
});

card3.addEventListener('click', function () {
    const userClick = document.getElementById('card3');
    const cuisine = 82; // cuisine ID for pizza
    console.log('click3');
    getEstablishmentsByCity(cityID);
});

card4.addEventListener('click', function () {
    const userClick = document.getElementById('card4');
    const cuisine = 83; // cuisine ID for seafood
    console.log('click4');
    getEstablishmentsByCity(cityID);
});

card5.addEventListener('click', function () {
    const userClick = document.getElementById('card5');
    const cuisine = 193; // cuisine ID for bbq
    console.log('click5');
    getEstablishmentsByCity(cityID);
});

card6.addEventListener('click', function () {
    const userClick = document.getElementById('card6');
    const cuisine = 55; // cuisine ID for italian
    console.log('click6');
    getEstablishmentsByCity(cityID);
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

    // const cuisine = 82; // cuisine ID for pizza 
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


// Pexel API - Random pictures displayed on selection cards
const pexelApiKey = '563492ad6f917000010000015b1b377af3ac48368c8dbfb885947855';
const americanFood = document.getElementById('americanFoodPicture');
const burgers = document.getElementById('burgerPicture');
const pizzaPicture = document.getElementById('pizzaPicture');
const seafoodPicture = document.getElementById('seafoodPicture');
const bbqPicture = document.getElementById('bbqPicture');
const italianPicture = document.getElementById('italianPicture');



// function getRandomPicture(category, element) {
//     let url = `https://api.pexels.com/v1/search?query=${category}&per_page=6&orientation=landscape`;
//     let fetchVar = fetch(url, {
//         headers: {
//             'Authorization': pexelApiKey,
//         },
//     })
//         .then((res) => {
//             return res.json();
//         })
//         .then((data) => {
//             return data;
//         })
//         .then((res) => {
//             console.log(res)
//             let sizedPhotos = res.photos.filter(item => {
//                 return item.width > item.height
//             });
//             let randomIndex = Math.floor(Math.random() * sizedPhotos.length);
//             console.log(sizedPhotos[randomIndex])
//             let randomPhoto = sizedPhotos[randomIndex].src.medium;
//             element.setAttribute('src', randomPhoto)
//         });
//     return fetchVar;
// };

// getRandomPicture('American food', americanFood);
// getRandomPicture('Burger', burgers);
// getRandomPicture('Pizza', pizzaPicture);
// getRandomPicture('Seafood', seafoodPicture);
// getRandomPicture('BBQ pork', bbqPicture);
// getRandomPicture('Pasta', italianPicture);

