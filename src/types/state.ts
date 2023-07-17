import { UserState } from "./user/state";
import { WeatherState } from "./weather/state";

export interface State {
  weatherReducer: WeatherState;
  userReducer: UserState;
}
