import {
  WeatherTransformedData,
  OpenWeatherDaysPayload,
  OpenWeatherCurrentDayPayload,
  OpenWeatherCombinedPayload,
} from "../../../types/weather/weather";
import { transformOpenWeatherAPIPayload } from "../../utils/weather/transformWeatherPayload";

export const getWeatherFromOpenWeatherApi = async (
  city: string
): Promise<WeatherTransformedData> => {
  const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const DAYS_FORECAST_URL: string = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  const CURRENT_FORECAST_URL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`;

  try {
    const daysResponse: Response = await fetch(DAYS_FORECAST_URL);
    const daysData: OpenWeatherDaysPayload = await daysResponse.json();

    const currentDayResponse: Response = await fetch(CURRENT_FORECAST_URL);
    const currentDayData: OpenWeatherCurrentDayPayload =
      await currentDayResponse.json();

    const combinedData: OpenWeatherCombinedPayload = {
      ...daysData,
      description: currentDayData.weather[0].description,
      icon: currentDayData.weather[0].icon,
      temp: currentDayData.main.temp,
      humidity: currentDayData.main.humidity,
      feels_like: currentDayData.main.feels_like,
      pressure: currentDayData.main.pressure,
      wind: currentDayData.wind.speed,
      visibility: currentDayData.visibility,
    };

    return transformOpenWeatherAPIPayload(combinedData);
  } catch (error: any) {
    throw new Error(`City not found. Please enter correct city name`);
  }
};
