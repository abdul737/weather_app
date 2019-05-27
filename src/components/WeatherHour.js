/*
 * Copyright (c) 2019, Abdulbosid Khamidov.
 * MIT License (Fully Open Source)
 */

import React from 'react'
import PropTypes from 'prop-types'

class WeatherHour extends React.Component {
    render(){
        return (
            // display hourly temperature as a table row
            <tr>
                <td>{this.props.time}</td>
                <td><img src={this.props.image} alt={"..."}/></td>
                <td><b style={this.tempMaxStyle}>{this.props.tempMin}°C</b></td>
                <td><i style={this.tempMinStyle}>{this.props.tempMax}°C</i></td>
            </tr>
        )
    }
    // special box styling for hourly  temperatures
    tempMaxStyle = {
        background: "#505050",
        color: "#f0f0f0",
        borderRadius: "3px",
        padding: "2px 5px",
        border: "1px #050505 solid"
    };
    tempMinStyle = {
        background: "#f0f0f0",
        color: "#050505",
        borderRadius: "3px",
        padding: "2px 5px",
        border: "1px #0f0f0f solid"
    };
}

//PropTypes and constraints
WeatherHour.propTypes = {
    time: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tempMin: PropTypes.number.isRequired,
    tempMax: PropTypes.number.isRequired,
};

export default WeatherHour;
