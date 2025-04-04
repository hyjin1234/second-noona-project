import React from 'react'

const WeatherBox = ({weather}) => {
    console.log("weather?",weather)
    let deg = weather?.main.temp;
    deg = (deg*1.8)+32;
    console.log("/////",deg)
  return (
    <div className="weather-box">
        <div>{weather?.name}</div>
        <h2>{weather?.main.temp}C / {deg}F</h2>
        <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox