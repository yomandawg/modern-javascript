const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const date = document.querySelector('.date');
let clock = undefined;
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
/* use javascript `class` */
const forecast = new Forecast();


const updateUI = (data) => {
  // destructure properties
  const { cityDets, weather } = data;

  // check time
  clock = setInterval(() => {
    date.innerHTML =
    `<span>
    ${new Date().toLocaleString("en-US", { timeZone: cityDets.TimeZone.Name })}
    </span>`
  }, 1000);

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update the night/date & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  icon.setAttribute('src', iconSrc);
  time.setAttribute('src', timeSrc);

  // remove the d-none class if present
  if(card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

// const updateCity = async (city) => {
//   const cityDets = await getCity(city);
//   const weather = await getWeather(cityDets.Key);
//   return { cityDets, weather };
// };

cityForm.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault();
  clearInterval(clock);

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // set local storage
  localStorage.setItem('city', city);
});

if(localStorage.getItem('city')) {
  forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}