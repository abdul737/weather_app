import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import WeatherDaily from '../components/WeatherDaily'

describe('WeatherDaily Component Test', () => {

    beforeAll(() => {
        // initialize enzyme adapter
        Enzyme.configure({ adapter: new Adapter() })
    });
    // unit test for the weatherDaily component
    it('renders correctly', () => {
        // enzyme's isolated component test mode with shallow
        const component = shallow(<WeatherDaily weatherDaily={weatherDaily} />);
        // test with the snapshot
        expect(component).toMatchSnapshot()
    });

    // hardcoded fake data for test
    var weatherDaily = [
        {
            dt_txt: "2019-05-26 00:00:00",
            // week day name
            day: "Sat",
            date: "5/26",
            tempDay: 25.6,
            tempNight: 20.4,
            // image icon name is given in the API data
            image: ("cloudy.png")
        },
        {
            dt_txt: "2019-05-27 00:00:00",
            // week day name
            day: "Sun",
            date: "5/27",
            tempDay: 27.6,
            tempNight: 23.4,
            // image icon name is given in the API data
            image: ("sunny.png")
        }
    ];
});
