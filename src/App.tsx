import React from 'react';
import HomePage from './pages/Home/HomePage';

const App = (): JSX.Element => {
  const getWeatherData = async () => {
    const req = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&units=metric&appid=bd7c6680cf9b3464fbe15e598b134888')
    return await req.json()
  }

  console.log(getWeatherData())

  return (
    <HomePage />
  )
}

export default App