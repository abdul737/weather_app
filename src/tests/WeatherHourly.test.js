/*
 * Copyright (c) 2019, Abdulbosid Khamidov.
 * MIT License (Fully Open Source)
 */

import React from 'react'
import Enzyme, {mount, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import axios from "axios";
import WeatherHourly from '../components/WeatherHourly'
import App from '../App'

describe("WeatherHourly Component Test", () => {
    let weatherData;
    beforeAll(async () => {
        // initialize enzyme adapter
        Enzyme.configure({ adapter: new Adapter() })
        const app = shallow(<App />);
        const result = await axios.get(app.state().apiUrl);
        weatherData = result.data.list;
    });

    // unit test for the render of the weatherHourly
    it('renders correctly', () => {
        // enzyme's isolated component test mode with shallow
        const component = shallow(<WeatherHourly
            match={{params: {dt_txt: weatherData[0].dt_txt}}}
            weatherData={weatherData}/>
            );
        // test with the snapshot
        expect(component).toMatchSnapshot(0);
    });
    // integration test to display table rows in WeatherHourly correctly
    // including WeatherHour component inside
    it('displays table rows correctly', () => {
        // enzyme's full component test mode with mount
        const component = mount(<WeatherHourly
            match={{params: {dt_txt: weatherData[0].dt_txt}}}
            weatherData={weatherData}/>
            );
        // get all the table row elements from the component body
        const links = component.find("tr");
        // expect to get at least one result
        expect(links.length).toBeGreaterThan(0);
    });
});
