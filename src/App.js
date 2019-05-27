/*
 * Copyright (c) 2019, Abdulbosid Khamidov.
 * MIT License (Fully Open Source)
 */

import React from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import axios from 'axios';
import './App.css';
import WeatherDaily from "./components/WeatherDaily";
import WeatherHourly from "./components/WeatherHourly"
import Header from "./components/layouts/Header";
import About from "./components/pages/About";
import Page404 from "./components/pages/Page404";

class App extends React.Component{
    state = {
        // all the list weather data to be stored in array weatherData
        weatherData: [],
        // array key is the day of the month
        weatherDaily: [],
        // week day names
        weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    };

    // When App is mounted all weather data is downloaded once
    componentDidMount() {
        // Get weather data in JSON for the city Tashkent, UZ (id: 1512569) with the API call
        // 5 day - 3 hourly weather forecast
        // API server data is updated every 3 hours
        axios.get('https://api.openweathermap.org/data/2.5/forecast?id=1512569&units=metric&appid=479e2073bec71a262fcce951f4c4debf')
            .then((res) => {
                // get weather data list
                this.setState({weatherData: res.data.list});
                // a temporary array to set to the state var
                let weatherDaily = [];
                // for each list item as weatherData
                res.data.list.map((weatherData) => {
                    // (date text) converted from UTC to local Date format
                    const date = new Date(weatherData.dt_txt + " UTC");
                    // array key is the day of the month to be sorted further
                    if (weatherDaily[date.getDate()]){
                        // detect from hourly data day or night time temperature
                        if (date.getHours() < 17){
                            // for day time temperature
                            weatherDaily[date.getDate()].tempDay = weatherData.main.temp;
                        }else{
                            // for night time temperature
                            weatherDaily[date.getDate()].tempNight = weatherData.main.temp;
                        }
                    }else{
                        // weather data is assigned by the day of the month
                        weatherDaily[date.getDate()] = {
                            dt_txt: weatherData.dt_txt,
                            // week day name
                            day: this.state.weekDays[date.getDay()],
                            date: ((date.getMonth() + 1) + "/" + date.getDate()),
                            tempDay: weatherData.main.temp,
                            tempNight: weatherData.main.temp,
                            // image icon name is given in the API data
                            image: ("https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png")
                        };
                    }
                    // nothing to return here, render
                    return ("");
                });
                // setState weatherDaily to temporary array weatherDaily
                this.setState({weatherDaily});
            })
            // in case of any error an alert message is to be shown
            .catch((err) => alert(err.message));
    }

    render(){
        return (
            <Router>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route exact path={"/"} render={(props) => (
                            <React.Fragment>
                                <WeatherDaily weatherDaily={this.state.weatherDaily}/>
                            </React.Fragment>
                        )} />
                        {/* the local date for hourly data to be passed instead of dt_txt */}
                        <Route path={"/hourly/:dt_txt"} render={(props) => (
                            <WeatherHourly {...props} weatherData={this.state.weatherData} />
                        )} />
                        <Route path="/about" component={About}/>
                        <Route component={Page404} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
