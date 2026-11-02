// function setDarkMode() {
//     // 1. Change the body class (this changes all CSS)
//     document.body.classList.add('dark-mode');
//     document.body.classList.remove('light-mode');

//     // 2. Show moon button, hide sun button
//     document.querySelector('.js-sun').classList.add('hidden');
//     document.querySelector('.js-moon').classList.remove('hidden');

// }

// function setLightMode() {
//     // 1. Change the body class
//     document.body.classList.add('light-mode');
//     document.body.classList.remove('dark-mode');

//     // 2. Show sun button, hide moon button
//     document.querySelector('.js-moon').classList.add('hidden');
//     document.querySelector('.js-sun').classList.remove('hidden');

// }

function setDarkMode() {
    document.body.classList.add('dark-mode');
    document.querySelector('.js-moon').classList.add('hidden');
    document.querySelector('.js-sun').classList.remove('hidden');
}

function setLightMode() {
    document.body.classList.remove('dark-mode');
    document.querySelector('.js-sun').classList.add('hidden');
    document.querySelector('.js-moon').classList.remove('hidden');
}
const searchPort = document.querySelector('.search-space')
const searchBtn = document.querySelector('#search-btn')
const citySearch = document.querySelector('#city')
const maxTemp = document.querySelector('.max-1');
const minTemp = document.querySelector('.min-1');
const windSpeed = document.querySelector('#wind-speed');
const  feelsLike = document.querySelector('#feels-like');
const humidity = document.querySelector('#humidity');
const temperature = document.querySelector('#temperature');
const weatherIcon = document.querySelector('.w-icon');
const weatherDescription = document.querySelector('#weather-desc')
const country = document.querySelector('#sri')
 const apiKey = "575be30d4952028d6d74e9e8d0f5f000"
async function getWeather(city){
    try{
 const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  if(!response.ok){
    throw new Error("City not found");
  }
  const data =  await response.json();
  console.log("Weather data loaded successfully:", data);
  console.log(`City: ${data.name}`);
        console.log(`Temp: ${data.main.temp}°C`);
        console.log(`Weather: ${data.weather[0].description}`);
        console.log( data.sys.country )
        return data;
}catch(error){
console.error("Error: ", error.message)
}

}
getWeather('Lagos')
async function showWeather(city){
    const data = await getWeather(city);
    if(!data){
    alert('Could not load weather data');
    return
     }
     console.log("Icon code from API:", data.weather[0].icon);
     const iconCode = data.weather[0].icon;
 citySearch.innerHTML =`${data.name}, <span id="sri">${data.sys.country}</span>`  
weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
temperature.textContent = data?.main?.temp !== undefined ? `${data.main.temp} °C`:"N/A";
 weatherDescription.textContent = data?.weather[0]?.main !== undefined ? data.weather[0].main : "N/A";
 maxTemp.textContent = data?.main?.temp_max !== undefined ? `${data.main.temp_max} °C` : "N/A";
 minTemp.textContent = data?.main?.temp_min !== undefined ? `${data.main.temp_min} °C` : "N/A";
 feelsLike.textContent = data?.main?.feels_like !== undefined ? data.main.feels_like : "N/A";
 humidity.textContent = data?.main?.humidity !== undefined ? `${data.main.humidity}%` : "N/A";
 windSpeed.textContent = data?.wind?.speed !== undefined ? `${data.wind.speed} m/s` : "N/A";
    }
searchBtn.addEventListener("click",()=>{
    const chooseCity = searchPort.value;
    if(chooseCity !== ""){
        showWeather(chooseCity);
    } 

})