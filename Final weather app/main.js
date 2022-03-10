// Date and Day display

var time = new Date();
var DateDisplay = document.querySelector("#date");
var DayDisplay = document.querySelector("#day");
var TimeDisplay = document.querySelector("#timee");
const Days = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

function TimeAndDate() {
  //Displaying Date
  if (time.getDate() < 10) {
    DateDisplay.innerHTML =
      "0" +
      time.getDate() +
      "/0" +
      (time.getMonth() + 1) +
      "/" +
      time.getFullYear();
  } else {
    DateDisplay.innerHTML =
      time.getDate() + "/0" + (time.getMonth() + 1) + "/" + time.getFullYear();
  }

  //Displaying Day

  DayDisplay.innerHTML = Days[time.getDay()];

  //Displaying Time
  TimeDisplay.innerHTML = time.getHours() + ":" + time.getMinutes();
}

//Displaying todays weather

var LocationDisplay = document.querySelector("#location");
var TempDisplay = document.querySelector("#temp");
var WeatherDisplay = document.querySelector("#weather");
var WeatherIcon = document.querySelector("#todayicon");

const ApiKey = "5ba9b9485dba21a27ec086e1eeeecf9a";

function TodayWeather(long, lat) {
  let ApiResult;
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${ApiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      ApiResult = data;
      LocationDisplay.innerHTML = ApiResult.timezone;
      TempDisplay.innerHTML = ApiResult.current.temp + " °C";
      WeatherDisplay.innerHTML = ApiResult.current.weather[0].description;
      let controlVariable = ApiResult.current.weather[0].description;
      console.log(ApiResult)


      //Background control 

      const Cloudy = ["partiellement nuageux","nuageux","couvert"]
      const Rain = ["pluie lègère","pluie"]
      let imgUrl 
      if(Cloudy.includes(controlVariable)){
        imgUrl="url(./Images/cloudy\ background.jpg)"
      }
      else if(Rain.includes(controlVariable)){
        imgUrl="url(./Images/rain\ background.jpg)"
      }
      else{
        if(NightTime.includes(time.getHours())){
          imgUrl= "url(./Images/clear\ night\ background.jpg)"
        }else{
          imgUrl="url(./Images/clear\ day\ background.jpg)"
        }
      }
      document.body.style.backgroundImage=imgUrl
      
    });
}

//Displaying hourly weather

const Hours = [
  "#hourplusone",
  "#hourplustwo",
  "#hourplusthree",
  "#hourplusfour",
  "#hourplusfive",
  "#hourplussix",
  "#hourplusseven",
  "#hourpluseight",
];
const Times = [
  "#time1",
  "#time2",
  "#time3",
  "#time4",
  "#time5",
  "#time6",
  "#time7",
  "#time8",
];

function HourlyDisplay(long, lat) {
  let h;
  let HourApi;

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${ApiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      HourApi = data;
      for (h = 0; h < Hours.length; h++) {
        document.querySelector(Hours[h]).innerHTML =
          HourApi.hourly[h].temp + "°C";
        if (time.getHours() + (h + 1) > 23) {
          document.querySelector(Times[h]).innerHTML =
            time.getHours() + (h + 1) - 24 + "H";
        } else {
          document.querySelector(Times[h]).innerHTML =
            time.getHours() + (h + 1) + "H";
        }
      }
    });
}

//Displaying today specifications

var today = document.querySelector("#today");
var pr = document.querySelector("#pressure");
var hum = document.querySelector("#humidity");
var feels = document.querySelector("#feels_like");
var sunr = document.querySelector("#sunrise");
var suns = document.querySelector("#sunset");

function TodaySpecs(long, lat) {
  let TodayApi;

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${ApiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      TodayApi = data;
      let unix = TodayApi.current.sunrise;
      let unix2 = TodayApi.current.sunset;
      let sunshine = new Date(unix * 1000);
      let twilight = new Date(unix2 * 1000);
      today.innerHTML = Days[time.getDay()];
      pr.innerHTML = "Pression : " + TodayApi.current.pressure;
      hum.innerHTML = "Humidité : " + TodayApi.current.humidity;
      sunr.innerHTML =
        "Levé de soleil: " + sunshine.getHours() + ":" + sunshine.getMinutes();
      suns.innerHTML =
        "Couché de soleil: " +
        twilight.getHours() +
        ":" +
        twilight.getMinutes();
      feels.innerHTML =
        "Se sent comme : " + TodayApi.current.feels_like + " °C";
    });
}

//Displaying Week days

const Week = ["#day1", "#day2", "#day3", "#day4", "#day5", "#day6"];
const DaysTitle = [
  "#showday1",
  "#showday2",
  "#showday3",
  "#showday4",
  "#showday5",
  "#showday6",
];
const WeekWeather = [
  "#showweather1",
  "#showweather2",
  "#showweather3",
  "#showweather4",
  "#showweather5",
  "#showweather6",
];

function WeekDays(long, lat) {
  let j = 0;

  var IndexofToday = time.getDay();
  var NextDays = [];
  for (j = IndexofToday + 1; j < Days.length; j++) {
    NextDays.push(Days[j]);
  }
  let rest = 6 - NextDays.length;
  let current = NextDays.length;
  if (current < 6) {
    for (j = 0; j < rest; j++) {
      NextDays[current] = Days[j];
      current += 1;
    }
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${ApiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let WeekApi = data;
      for (j = 0; j < Week.length; j++) {
        document.querySelector(Week[j]).innerHTML =
          "<p id='tempmax1'> Max : " +
          Math.trunc(WeekApi.daily[j].temp.max) +
          "°C </p><p id='tempmin1'> Min :" +
          Math.trunc(WeekApi.daily[j].temp.min) +
          "°C</p>";
        document.querySelector(DaysTitle[j]).innerHTML = NextDays[j];
        document.querySelector(WeekWeather[j]).innerHTML =
          WeekApi.daily[j].weather[0].description;
      }
    });
}



// Controlling which icons to show in Today weather

function TodayIconControl(long, lat) {
  var x;
  var TodayIcon = document.querySelector("#todayicon");

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${ApiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let AllWeatherApi = data;
      x = AllWeatherApi.current.weather[0].description;
      let RightNow = time.getHours() + "H";
      if (NightTime.includes(RightNow)) {
        if ((x = "partiellement nuageux")) {
          TodayIcon.src = "/Icons/nugaeux nuit.svg";
        }
        if ((x = "nuageux")) {
          TodayIcon.src = "/Icons/nugaeux nuit.svg";
        }
        if ((x = "ciel dégagé")) {
          TodayIcon.src = "/Icons/nuit.svg";
        }
        if ((x = "peu nuageux")) {
          TodayIcon.src = "/Icons/peu nugaeux nuit.svg";
        }
        if ((x = "lègère ")) {
          TodayIcon.src = "/Icons/nugaeux nuit.svg";
        }
        if ((x = "partiellement nuageux")) {
          TodayIcon.src = "/Icons/nugaeux nuit.svg";
        }
      } else {
        if ((x = "partiellement nuageux")) {
          TodayIcon.src = "/Icons/partiellement nuageux jour.svg";
        }
        if ((x = "nuageux")) {
          TodayIcon.src = "/Icons/nuageux.svg";
        }
        if ((x = "ciel dégagé")) {
          TodayIcon.src = "/Icons/ciel degagé.svg";
        }
        if ((x = "peu nuageux")) {
          TodayIcon.src = "/Icons/peu nuageux.svg";
        }
        if ((x = "pluie lègère")) {
          TodayIcon.src = "/Icons/pluie.svg";
        }
        if ((x = "partiellement nuageux")) {
          TodayIcon.src = "/Icons/partiellement nuageux jour.svg";
        }
      }
    });
}

//Hourly weather icon control

const Imgs = ["#i1", "#i2", "#i3", "#i4", "#i5", "#i6", "#i7", "#i8"];
const DayTime = [
  "6H",
  "7H",
  "8H",
  "9H",
  "10H",
  "11H",
  "12H",
  "13H",
  "14H",
  "15H",
  "16H",
  "17H",
];
const NightTime = [
  "18H",
  "19H",
  "20H",
  "21H",
  "22H",
  "23H",
  "0H",
  "1H",
  "2H",
  "3H",
  "4H",
  "5H",
];
const Timings = [
  "#time1",
  "#time2",
  "#time3",
  "#time4",
  "#time5",
  "#time6",
  "#time7",
  "#time8",
];

function HourlyIconControl(long, lat) {
  let x;

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${ApiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let HourWeatherApi = data;

      for (let G = 0; G < Imgs.length; G++) {
        x = HourWeatherApi.hourly[G + 1].weather[0].description;

        let IconHour;
        IconHour = document.querySelector(Imgs[G]);
        let timing = document.querySelector(Timings[G]).innerHTML;
        if (NightTime.includes(timing)) {
          if ((x = "partiellement nuageux")) {
            IconHour.src = "/Icons/nugaeux nuit.svg";
          }
          if ((x = "nuageux")) {
            IconHour.src = "/Icons/nugaeux nuit.svg";
          }
          if ((x = "ciel dégagé")) {
            IconHour.src = "/Icons/nuit.svg";
          }
          if ((x = "peu nuageux")) {
            IconHour.src = "/Icons/peu nugaeux nuit.svg";
          }
          if ((x = "lègère")) {
            IconHour.src = "/Icons/nugaeux nuit.svg";
          }
          if ((x = "partiellement nuageux")) {
            IconHour.src = "/Icons/nugaeux nuit.svg";
          }
        } else {
          if ((x = "partiellement nuageux")) {
            IconHour.src = "/Icons/partiellement nuageux jour.svg";
          }
          if ((x = "nuageux")) {
            IconHour.src = "/Icons/nuageux.svg";
          }
          if ((x = "ciel dégagé")) {
            IconHour.src = "/Icons/ciel degagé.svg";
          }
          if ((x = "peu nuageux")) {
            IconHour.src = "/Icons/peu nuageux.svg";
          }
          if ((x = "pluie lègère")) {
            IconHour.src = "/Icons/pluie.svg";
          }
          if ((x = "partiellement nuageux")) {
            IconHour.src = "/Icons/partiellement nuageux jour.svg";
          }
        }
      }
    });
}

//City Search function
const Contents = [
  "#day",
  "#todayicon",
  "#location",
  "#temp",
  "#weather",
  "#date",
  "#timee",
  "#time1",
  "#hourplusone",
  "#i1",
  "#i2",
  "#i3",
  "#i4",
  "#i5",
  "#i6",
  "#i7",
  "#i8",
  "#time2",
  "#time3",
  "#time4",
  "#time5",
  "#time6",
  "#time7",
  "#time8",
  "#hourplustwo",
  "#hourplusthree",
  "#hourplusfour",
  "#hourplusfive",
  "#hourplussix",
  "#hourplusseven",
  "#hourpluseight",
  "#today",
  "#pressure",
  "#humidity",
  "#feels_like",
  "#sunrise",
  "#sunset",
  "#showday1",
  "#showweather1",
  "#day1",
  "#showday2",
  "#showweather2",
  "#day2",
  "#showday3",
  "#showweather3",
  "#day3",
  "#showday4",
  "#showweather4",
  "#day4",
  "#showday5",
  "#showweather5",
  "#day5",
  "#showday6",
  "#showweather6",
  "#day6",
];
const Sections = [
  ".TodayWeather",
  ".DateAndDay",
  ".HourlyWeather",
  ".TodaySpecs",
  ".WeeklyWeather",
  ".Day1",
  ".Day2",
  ".Day3",
  ".Day4",
  ".Day5",
  ".Day6",
];

function SearchCity() {
  var CityName = document.querySelector("#SearchBox");

  var ResultDisplay = document.querySelector(".SearchResult");
  ResultDisplay.style.display = "block";

  //Hiding old display
  for (let m = 0; m < Sections.length; m++) {
    document.querySelector(Sections[m]).style.backgroundImage = "none";
  }

  for (let k = 0; k < Contents.length; k++) {
    document.querySelector(Contents[k]).style.display = "none";
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${CityName.value}&appid=${ApiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let CityApi = data;
      console.log(CityApi)
      document.querySelector("#CityName").innerHTML = CityApi.name;
      document.querySelector("#CityCountry").innerHTML = CityApi.sys.country;
      document.querySelector("#CityTemp").innerHTML =
        "Tempèrature : " + (CityApi.main.temp - 273.15).toFixed(2) + "°C";
      document.querySelector("#CityMax").innerHTML =
        "Tempèrature max : " +
        (CityApi.main.temp_max - 273.15).toFixed(2) +
        "°C";
      document.querySelector("#CityMin").innerHTML =
        "Tempèrature min : " +
        (CityApi.main.temp_min - 273.15).toFixed(2) +
        "°C";
      document.querySelector("#CityFeels").innerHTML =
        "Se sent comme : " +
        (CityApi.main.feels_like - 273.15).toFixed(2) +
        "°C";
      document.querySelector("#CityPressure").innerHTML =
        "Pression : " + CityApi.main.pressure;
      document.querySelector("#CityHumidity").innerHTML =
        "Humidité : " + CityApi.main.humidity;
      let dtThere = CityApi.dt;
      let dtMilliseconds = dtThere* 1000
      let RightNow = new Date(dtMilliseconds);
      let DisplayRightNow = RightNow.getHours()+"H"
      let Engx = CityApi.weather[0].description;
      let w;
      let text;

      //Translation from english to french

      if (Engx == "few clouds") {
        text = "Partiellement Nuageux";
        w = "partiellement nuageux";
      }
      if (Engx == "clear sky") {
        text = "Ciel dégagé";
        w = "ciel dégagé";
      }
      if (Engx == "cloudy") {
        text = "Nuageux";
        w = "nuageux";
      }
      if (Engx == "scattered clouds") {
        text = "Peu Nuageux";
        w = "peu nuageux";
      }
      if (Engx == "broken clouds") {
        w = "peu nuageux";
        text = "Peu Nuageux"
      }
      if (Engx == "rain") {
        text = "Pluie";
        w = "lègère";
      }

      document.querySelector("#CityWeather").innerHTML=text



      //Weather icon control

      if (NightTime.includes(DisplayRightNow)) {
        if (w == "partiellement nuageux") {
          CityIcon.src = "/Icons/nugaeux nuit.svg";
        }
        if (w == "nuageux") {
          CityIcon.src = "/Icons/nugaeux nuit.svg";
        }
        if (w == "ciel dégagé") {
          CityIcon.src = "/Icons/nuit.svg";
        }
        if (w == "peu nuageux") {
          CityIcon.src = "/Icons/peu nugaeux nuit.svg";
        }
        if (w == "lègère") {
          CityIcon.src = "/Icons/nugaeux nuit.svg";
        }
      } else {
        if (w == "partiellement nuageux") {
          CityIcon.src = "/Icons/partiellement nuageux jour.svg";
        }
        if (w == "nuageux") {
          CityIcon.src = "/Icons/nuageux.svg";
        }
        if (w == "ciel dégagé") {
          CityIcon.src = "/Icons/ciel degagé.svg";
        }
        if (w == "peu nuageux") {
          CityIcon.src = "/Icons/peu nuageux.svg";
        }
        if (w == "pluie lègère") {
          CityIcon.src = "/Icons/pluie.svg";
        }
      }
    });
}

//Display when loading screen
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      var long = position.coords.longitude;
      var lat = position.coords.latitude;

      TimeAndDate();
      TodayWeather(long, lat);
      HourlyDisplay(long, lat);
      TodaySpecs(long, lat);
      WeekDays(long, lat);
      TodayIconControl(long, lat);
      HourlyIconControl(long, lat);
    },
    () => {
      alert(
        `Vous avez refusé la géolocalisation, l'application ne peur pas fonctionner, veuillez l'activer.!`
      );
    }
  );
}
