import React from 'react'
import PropTypes from 'prop-types'
import './WeatherDay.css'
import {Link} from "react-router-dom";

class WeatherDay extends React.Component {
    render(){
        // pull-out some necessary props
        const {dt_txt, day, date, image, tempDay, tempNight} = this.props;
        return (
          //  Link to get hourly forecast data for the selected day
          <Link to={"/hourly/" + dt_txt}>
              <div className={"day"} >
                  <div>{day}</div>
                  <div><small>{date}</small></div>
                  <img src={image} alt="..." />
                  <div>
                      {/* Get only integer part of the given temp of float type */}
                      <b>{parseInt(tempDay)}°C</b> {parseInt(tempNight)}°C
                  </div>
              </div>
          </Link>
        );
    };
}

//PropTypes and constraints
WeatherDay.propTypes = {
    dt_txt: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tempDay: PropTypes.number.isRequired,
    tempNight: PropTypes.number.isRequired,
};

export default WeatherDay
