import {
  WeatherTransformedData,
  WeatherApiPayload,
} from "../../../types/weather/weather";
import { transformWeatherApiPayload } from "../../utils/weather/transformWeatherApiPayload/transformWeatherApiPayload";

export const getWeatherFromWeatherApi = async (
  city: string
): Promise<WeatherTransformedData> => {
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const API_URL: string = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=2&aqi=no&alerts=no`;

  try {
    const response: Response = await fetch(API_URL);
    const data: WeatherApiPayload = await response.json();

    return transformWeatherApiPayload(data, city);
  } catch (error: any) {
    throw new Error(`City not found. Please enter correct city name`);
  }
};
