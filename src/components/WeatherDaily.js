
/*
 * Copyright (c) 2019, Abdulbosid Khamidov.
 * MIT License (Fully Open Source)
 */

import React from 'react'
import PropTypes from 'prop-types'
import WeatherDay from "./WeatherDay";

class WeatherDaily extends React.Component {
    render(){
        return (
            // daily forecast table
            <table style={this.tableStyle}>
                <tbody>
                <tr>
                {/*    Generate daily weather content with WeatherDay component*/}
                {this.props.weatherDaily.map( (weatherDay) => {
                    return (
                        // dt_txt - UTC date text
                        <td key={weatherDay.dt_txt}>
                            <WeatherDay
                                dt_txt={weatherDay.dt_txt}
                                day={weatherDay.day}
                                date={weatherDay.date}
                                tempDay={weatherDay.tempDay}
                                tempNight={weatherDay.tempNight}
                                image={weatherDay.image}
                            />
                        </td>
                    )
                })}
                </tr>
                </tbody>
            </table>
        );
    }
    // style to align table to center horizontally
    tableStyle = {
        margin: "0 auto"
    };
}

//PropTypes
WeatherDaily.propTypes = {
    weatherDaily: PropTypes.array.isRequired
};

export default WeatherDaily
