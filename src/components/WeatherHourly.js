import React from 'react'
import PropTypes from 'prop-types'
import WeatherHour from './WeatherHour'
import {Redirect} from "react-router-dom";

class WeatherHourly extends React.Component {
    state = {
        // hourly forecast data to be generated from the API
        weatherHourly: [],
        // target date to be extracted from the URI param
        targetDate: new Date()
    };
    // when component loaded get the passed day and get 3 hourly from the all API data
    componentDidMount() {
        // a temporary array to be assigned to the state variable at the end
        let weatherHourly = [];
        // UTC format date is passed as URI param match
        const targetDate = new Date(this.props.match.params.dt_txt + " UTC");
        // map each forecast data from the API weatherData
        this.props.weatherData.map((weatherData) => {
            // get the date and time of the weather data
            const date = new Date(weatherData.dt_txt + " UTC");
            // compare Date string of the target data and the data from the API
            if (date.toDateString() === targetDate.toDateString()) {
                // time - to be displayed in hourly forecast
                const time = date.toLocaleTimeString();
                weatherHourly.push({
                    time,
                    tempMin: parseInt(weatherData.main.temp_min),
                    tempMax: parseInt(weatherData.main.temp_max),
                    image: ("https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png")
                })
            }
            // nothing to return, render
            return ("");
        });
        this.setState({
            weatherHourly,
            targetDate
        });
    };
    render(){
        // in case of empty props from the caller redirect to the main page uri
        if (this.props.weatherData.length === 0 || (! this.props.match.params.dt_txt)){
            return (<Redirect to="/" />)
        }
        return (
            <div>
                <div style={this.headerStyle}>
                    {/* the date information */}
                    Weather Data for {this.state.targetDate.toLocaleDateString()}
                </div>
                <table style={this.tableStyle}>
                    <tbody>
                    {/* hourly data is to be mapped with weatherHour component, all params are required */}
                    {this.state.weatherHourly.map((weatherHour) => (
                        <WeatherHour
                            key={weatherHour.time}
                            time={weatherHour.time}
                            tempMin={weatherHour.tempMin}
                            tempMax={weatherHour.tempMax}
                            image={weatherHour.image}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
    // style for the header date part
    headerStyle = {
        padding: "10px",
        border: "1px #f0f0f0 dotted",
        margin: "auto",
        color: "#505050",
        textAlign: "center"
    };
    // style to align table to center horizontally
    tableStyle = {
        margin: "0 auto"
    };
}

//PropTypes
WeatherHourly.propTypes = {
    weatherData: PropTypes.array.isRequired
};

export default WeatherHourly;
