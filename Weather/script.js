const weatherForm =document.querySelector(".weatherForm");
const inputcity =document.querySelector(".inputcity");
const card =document.querySelector(".card");
const apikey="acdc7743be04e5d91e729c0cfb2e8fc9";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city=inputcity.value;
    if(city){
        try{
            const weatherData=await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter the city");
    }
});

async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    console.log(response);
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const {name:city,main:{temp,humidity},weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";

    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(Math.floor(temp-273.15))}°C`;
    humidityDisplay.textContent=`Humidity : ${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id);

    cityDisplay.classList.add("cityname");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("HumidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("EmojiDisplay");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId>=200 && weatherId < 300):
            return "⛈️";
        case (weatherId>=300 && weatherId < 400):
            return "⛈️";
        case (weatherId>=500 && weatherId < 600):
            return "⛈️";
        case (weatherId>=600 && weatherId < 700):
            return "❄️";
        case (weatherId>=700 && weatherId < 800):
            return "🌫️";
        case (weatherId===800):
            return "☀️";
        case (weatherId>=801 && weatherId < 810):
            return "☁️";
        default:
            return "❔";
    }
}

function displayError(message){

    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("ErrorDisplay");
    card.textContent=" ";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}
