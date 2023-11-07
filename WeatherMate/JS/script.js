let citynameInput=document.getElementById('citysearch');
let searchbtn=document.getElementById('search');
let cityname=document.getElementById('cityname');
let currentDate=document.getElementById('currentDate');
let tempcity=document.getElementById('tempcity');
let currentweather=document.getElementById('currentWeather');
let sunrise=document.getElementById('sunrise');
let sunset=document.getElementById('sunset');
let windspeed=document.getElementById('windspeed');
let countrycode=document.getElementById('countrycode');
let locationIcon=document.querySelector('.weather-icon');
const weatherImage = document.getElementById("weathericon")
// currentDate.textContent=getCurrentDate();

function getCurrentDate()
{
    const now=new Date();
    const options={day:'numeric',month:'short',year:'numeric'};
    return now.toLocaleDateString(undefined,options);
}

search.addEventListener('click',function()
{
    let location=citynameInput.value;
    cityname.innerText=location;
    if(location)
    {
        getWeatherData(location)
    }
});
function getWeatherData(location)
{
    const apiKey=("Paste You Api Here");
    const apiUrl=(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    
    fetch(apiUrl)
    .then((response)=>{
        if(!response.ok)
        {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }).then((responseData)=>{
        data=responseData;
        console.log(data);
        displayWeatherData(data)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    
};
function current_weather()
{
    const mainWeather = data.weather[0].main;
    return mainWeather;
}
function sunriseTime()
{
    let timestamp=data.sys.sunrise;
    let date=new Date(timestamp * 1000);
    const hours=date.getHours();
    const minutes=date.getMinutes().toString().padStart(2,'0');
    const ampm=hours >=12 ? 'AM' :'PM';
    const hours12=(hours % 12) || 12;
    const formattedTime=`${hours12} : ${minutes} ${ampm}`;
    return formattedTime;
}
function sunsetTime()
{
    let timestamp=data.sys.sunset;
    let date=new Date(timestamp * 1000);
    const hours=date.getHours();
    const minutes=date.getMinutes().toString().padStart(2,'0');
    const ampm=hours >=12 ? 'AM' :'PM';
    const hours12=(hours % 12) || 12;
    const formattedTime=`${hours12} : ${minutes} ${ampm}`;
    return formattedTime;
}
function getWindspeed()
{
    const wind=data.wind.speed;
    return wind;   
}
function getCountryCode()
{
    let countrycode=data.sys.country;
    return countrycode;
}

function displayWeatherData(data)
{
    var celsius =Math.round(data.main.temp-273.15);
    tempcity.textContent=(`${(celsius)}°C`);
    currentweather.textContent=current_weather();
    sunrise.textContent=sunriseTime();
    sunset.textContent=sunsetTime();
    windspeed.textContent=getWindspeed();
    countrycode.textContent=getCountryCode();
    let dataIcon=data.weather[0].icon
    weatherImage.src=`http://openweathermap.org/img/wn/${dataIcon}.png`
}