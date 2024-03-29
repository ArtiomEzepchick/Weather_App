export const WEATHER_ICON_URL: string = "https://openweathermap.org/img/wn/";
export const WEATHER_IMAGES_SRC: string = `${process.env.PUBLIC_URL}/assets/weatherImages/`;
export const ICONS_SRC: string = `${process.env.PUBLIC_URL}/assets/icons/`;
export const DEGREE_SYMBOL: string = "\u00B0";

export const WEATHER_CODES: {
  [code: string]: string[];
} = {
  "01d": ["01d", "day/113"],
  "01n": ["01n", "night/113"],
  "02d": ["02d", "day/116"],
  "02n": ["02n", "night/116"],
  "03d": ["03d", "day/119"],
  "03n": ["03n", "night/119"],
  "04d": ["04d", "day/122"],
  "04n": ["04n", "night/122"],
  "09d": [
    "09d",
    "day/185",
    "day/263",
    "day/266",
    "day/281",
    "day/284",
    "day/296",
    "day/302",
    "day/308",
    "day/311",
    "day/314",
  ],
  "09n": [
    "09n",
    "night/185",
    "night/263",
    "night/266",
    "night/281",
    "night/284",
    "night/296",
    "night/302",
    "night/308",
    "night/311",
    "night/314",
  ],
  "10d": [
    "10d",
    "day/176",
    "day/182",
    "day/293",
    "day/299",
    "day/305",
    "day/353",
    "day/356",
    "day/359",
    "day/362",
    "day/365",
  ],
  "10n": [
    "10n",
    "night/176",
    "night/182",
    "night/293",
    "night/299",
    "night/305",
    "night/353",
    "night/356",
    "night/359",
    "night/362",
    "night/365",
  ],
  "11d": ["11d", "day/200", "day/386", "day/389", "day/392", "day/395"],
  "11n": [
    "11n",
    "night/200",
    "night/386",
    "night/389",
    "night/392",
    "night/395",
  ],
  "13d": [
    "13d",
    "day/179",
    "day/227",
    "day/230",
    "day/317",
    "day/320",
    "day/323",
    "day/326",
    "day/329",
    "day/332",
    "day/335",
    "day/338",
    "day/350",
    "day/368",
    "day/371",
    "day/374",
    "day/377",
  ],
  "13n": [
    "13n",
    "night/179",
    "night/227",
    "night/230",
    "night/317",
    "night/320",
    "night/323",
    "night/326",
    "night/329",
    "night/332",
    "night/335",
    "night/338",
    "night/350",
    "night/368",
    "night/371",
    "night/374",
    "night/377",
  ],
  "50d": ["50d", "day/143", "day/248", "day/260"],
  "50n": ["50n", "night/143", "night/248", "night/260"],
};

export const API_NAMES = {
  OPEN_WEATHER_API: "openWeatherApi",
  WEATHER_API: "weatherApi",
};

export const FORECAST_LABELS = {
  FEELS_LIKE: "Feels like",
  HUMIDITY: "Humidity",
  PRESSURE: "Pressure",
  VISIBILITY: "Visibility",
  WIND: "Wind",
};
