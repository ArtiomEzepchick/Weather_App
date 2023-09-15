import { ForecastData } from "../../../../../../types/weather/weather";
import {
  FORECAST_LABELS,
  ICONS_SRC,
} from "../../../../../constants/weather/weather";

export const mockData = {
  id: "q1lQ-EX1WngTF3-xwwJpT",
  city: "Hrodna, BY",
  chosenWeatherApi: "openWeatherApi",
  description: "Moderate rain",
  lastUpdate: new Date(),
  icon: "https://openweathermap.org/img/wn/10n@2x.png",
  iconId: "10n",
  timezone: 10800,
  temp: "15",
  humidity: 67,
  feelsLike: "15",
  pressure: 1017,
  wind: "3",
  visibility: 10000,
  list: [],
};

export const expectedData: ForecastData[] = [
  {
    label: FORECAST_LABELS.FEELS_LIKE,
    icon: `${ICONS_SRC}thermometer.png`,
    forecast: "15",
  },
  {
    label: FORECAST_LABELS.HUMIDITY,
    icon: `${ICONS_SRC}humidity.png`,
    forecast: 67,
  },
  {
    label: FORECAST_LABELS.PRESSURE,
    icon: `${ICONS_SRC}pressure.png`,
    forecast: 1017,
  },
  {
    label: FORECAST_LABELS.VISIBILITY,
    icon: `${ICONS_SRC}visibility.png`,
    forecast: 10000,
  },
  {
    label: FORECAST_LABELS.WIND,
    icon: `${ICONS_SRC}wind.png`,
    forecast: "3",
  },
];
