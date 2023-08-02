import { filterWeatherDays } from "../filterWeatherDays";
import { mockData } from "./mockData";

describe("filterWeatherDays", () => {
  it("should filter and return the correct weather data", () => {
    const filteredData = filterWeatherDays(mockData);

    expect(filteredData).toEqual([
      {
        id: "2i_F1AXhO5HXDcacLti0U",
        day: "Thursday",
        calendarDay: "Aug 3",
        description: "Light rain",
        icon: "https://openweathermap.org/img/wn/10d@2x.png",
        temp: "21",
        tempMin: "16",
      },
      {
        id: "2mxtEkItaeZiCtnM9MouY",
        day: "Friday",
        calendarDay: "Aug 4",
        description: "Overcast clouds",
        icon: "https://openweathermap.org/img/wn/04d@2x.png",
        temp: "27",
        tempMin: "16",
      },
      {
        id: "6lNJUsgX9Np3z_ehY6nxN",
        day: "Saturday",
        calendarDay: "Aug 5",
        description: "Light rain",
        icon: "https://openweathermap.org/img/wn/10d@2x.png",
        temp: "22",
        tempMin: "20",
      },
      {
        id: "euYNlLWjMb0Oo6y8oZ4bl",
        day: "Sunday",
        calendarDay: "Aug 6",
        description: "Broken clouds",
        icon: "https://openweathermap.org/img/wn/04d@2x.png",
        temp: "20",
        tempMin: "15",
      },
    ]);
  });
});
