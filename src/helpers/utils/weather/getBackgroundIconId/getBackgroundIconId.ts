import { WEATHER_CODES } from "../../../constants/weather/weather";

export const getBackgroundIconId = (iconId: string): string | null => {
  const result: string[] = [];

  Object.entries(WEATHER_CODES).forEach(([_, source]) =>
    source.forEach((code) =>
      iconId.includes(code) ? result.push(source[0]) : null
    )
  );

  return result[0] || null;
};
