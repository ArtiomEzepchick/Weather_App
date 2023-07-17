import { SearchOption } from "../../../types/weather/weather";

export const filterSearchOptions = (payload: SearchOption[]): string[] => {
  const filteredOptions: string[] = [];

  payload.forEach((item: SearchOption) => {
    const city = `${item.name}, ${item.country}`;

    if (!filteredOptions.includes(city)) filteredOptions.push(city);
  });

  return filteredOptions;
};
