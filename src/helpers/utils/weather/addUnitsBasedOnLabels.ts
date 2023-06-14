import { FORECAST_LABELS, DEGREE_SYMBOL } from "../../constants/weather/weather"

export const addUnitsBasedOnLabels = (label: string): string | JSX.Element => {
  switch (label) {
    case FORECAST_LABELS.FEELS_LIKE: return DEGREE_SYMBOL
    case FORECAST_LABELS.HUMIDITY: return '%'
    case FORECAST_LABELS.PRESSURE: return ' hPa'
    case FORECAST_LABELS.VISIBILITY: return ' m'
    case FORECAST_LABELS.WIND: return ' km/h'

    default: return ''
  }
}