import { useSelector } from "react-redux"

import { State } from "../types/state"
import { WeatherState } from "../types/weather/state"
import { UserState } from "../types/user/state"

export const useWeatherSelector = (): WeatherState => useSelector((state: State): WeatherState => state.weatherReducer)
export const useUserSelector = (): UserState => useSelector((state: State): UserState => state.userReducer)