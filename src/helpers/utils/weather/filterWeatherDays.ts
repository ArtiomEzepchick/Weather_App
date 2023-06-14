import { WeatherList } from "../../../types/weather/weather"

export const filterWeatherDays = (list: WeatherList[]): WeatherList[] => {
    let currentDay: string = list[0].day ? list[0].day : ''
    let count: number = 0
    let index: number = 0
    const filteredData: WeatherList[] = []

    for (let item of list) {
        if (item.day && item.day !== currentDay) {
            ++count

            if (count === 5) {
                filteredData.push(item)
            }

            if (count === 8) {
                currentDay = item.day
            }

            if (count === 9) {
                filteredData[index] = {
                    ...filteredData[index],
                    tempMin: item.tempMin
                }

                count = 1
                ++index

                if (filteredData.length === 4) break
            }
        }
    }

    return filteredData
}