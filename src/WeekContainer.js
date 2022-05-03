import React, { useState, Component, useEffect } from 'react';
import { render } from "react-dom"
import apiConfig from "./apiKeys"
// import axios from 'axios';  

import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function WeekContainer() {
    const apiKey = '21bf93aadb83bf70aaef1b782b6095a0';

    const [apiForData, setForApiData] = useState({})


    // const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=51.5073&lon=-0.1277&appid=21bf93aadb83bf70aaef1b782b6095a0';
    const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely&appid=21bf93aadb83bf70aaef1b782b6095a0'
    
    // const [apiForData, setForApiData] = useState({})

    useEffect(() => {
        fetch(forecastApiUrl)
            .then((res) => res.json())
            .then((data) => setForApiData(data))
    }, [forecastApiUrl])

    const [apiData, setApiData] = useState({})
    const [getState, setGetState] = useState('orem')
    const [state, setState] = useState('orem')

    // const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setApiData(data))
    }, [apiUrl])

    const inputHandler = (event) => {
        setGetState(event.target.value);
    };

    const submitHandler = () => {
        setState(getState);
    };
    const kelvinToCelcius = (k) => {
      return (Math.round((k-273.15) * 1.8))
    }

    const kelvinToFarenheit = (k) => {
        // return ((k - 273.15) * 1.8 + 32).toFixed(2)
        return (Math.round((k - 273.15) * 1.8 + 32))
        // return (k - 273.15).toFixed(2);
    };

    // const formatDayCards = () => {
    //     return apiData.
    // }

    return (
        <div className="App">
          <header className="d-flex justify-content-center align-items-center">
            <h2>React Weather App</h2>
          </header>
          <div className="container">
            <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
              <div class="col-auto">
                <label for="location-name" class="col-form-label">
                  Enter Location :
                </label>
              </div>
              <div class="col-auto">
                <input
                  type="text"
                  id="location-name"
                  class="form-control"
                  onChange={inputHandler}
                  value={getState}
                />
              </div>
              <button className="btn btn-primary mt-2" onClick={submitHandler}>
                Search
              </button>
            </div>
    
            {/* <div className="card mt-3 mx-auto" style={{ width: '60vw' }}> */}
            <div className="card mt-3 mx-auto">
              {apiData.main ? (
                <div class="card-body text-center">
                  <img
                    src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                    alt="weather status icon"
                    className="weather-icon"
                  />
    
                  <p className="h2">
                    {/* {apiData.main.temp} */}
                    {kelvinToFarenheit(apiData.main.temp)}&deg; F / {kelvinToCelcius(apiData.main.temp)}&deg; C
                  </p>
    
                  <p className="h5">
                    <i className="fas fa-map-marker-alt"></i>{' '}
                    <strong>{apiData.name}</strong>
                  </p>
    
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <p>
                        <i class="fas fa-temperature-low "></i>{' '}
                        <strong>
                          Low: 
                          {kelvinToFarenheit(apiData.main.temp_min)}&deg; F
                        </strong>
                      </p>
                      <p>
                        <i className="fas fa-temperature-high"></i>{' '}
                        <strong>
                          High: 
                          {kelvinToFarenheit(apiData.main.temp_max)}&deg; F
                        </strong>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        {' '}
                        <strong>{apiData.weather[0].main}</strong>
                      </p>
                      <p>
                        <strong>
                          {' '}
                          {countries.getName(apiData.sys.country, 'en', {
                            select: 'official',
                          })}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <h1>Loading</h1>
              )}
              {/* {console.log(apiForData.daily.slice(0,5).map(d => (
                d.temp.max
              )))} */}
            </div>
          </div>


          {/* <div className='weatherForecasting'> */}
              {/* {console.log(apiForData.daily.temp.day)} */}
              {console.log(apiForData.daily)}
              {apiForData.current ? (
                  <div className='forecast card'>
                      {/* <p>{apiForData.current.temp}</p>
                      <p>{kelvinToFarenheit(apiForData.current.temp)}</p> */}
                      {/* <p>{apiForData.temp}</p> */}
                      <strong>{apiForData.daily.id}</strong>
                      {/* <strong>{apiForData.current.temp}test</strong> */}
                  </div>
              ) : (
                  <h1>Loading Forecast</h1>
              )}


              {/* <div>
                {apiForData.daily.slice(0,5).(d => (
                  <div>{d.temp}</div>
                ))}
              </div> */}

              {/* {apiForData.daily.temp((weekly) => {
                console.log(weekly)
                return (
                  <div>{weekly}</div>
                )
              })} */}

              {/* <div>{apiForData.main.temp}test</div> */}

          {/* </div> */}

        </div>
    );
}


export default WeekContainer;