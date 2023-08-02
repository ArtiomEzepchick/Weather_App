import { WEATHER_CODES } from "../../constants/weather/weather";

export const useBackgroundIconId = (url: string): string | null => {
  const result: string[] = [];

  Object.entries(WEATHER_CODES).forEach(([_, source]) =>
    source.forEach((code) =>
      url.includes(code) ? result.push(source[0]) : null
    )
  );

  console.log(result[0]);

  return result[0];
};
