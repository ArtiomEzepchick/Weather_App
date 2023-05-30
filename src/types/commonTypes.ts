import { UserState } from "./user/states"
import { WeatherState } from "./weather/states"

export interface State {
    weatherReducer: WeatherState;
    userReducer: UserState;
}

export interface StringValuesOnly {
    [label: string]: string;
}  