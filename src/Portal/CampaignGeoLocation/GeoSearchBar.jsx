import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { openSearchCityByName } from '../../User/UserActions';

const { Option } = Select;

// Sample data for countries and cities
const countries = [
  'UK',

];

function GeoSearchBar(props) {
  const { handleChange } = props;
  const [selectedCountry, setSelectedCountry] = useState('UK');
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setSelectedCity(null);
  };

  //   const debouncedFetchCities = useCallback(
  //    debounce(async (query) => {
  //      try {
  //        const filter = {
  //         LAD21NM:
  //          {matchPhrasePrefix: query}
  //         }
  //         console.log("filter",filter)
  //        const response = await openSearchCityBysName(filter);

  //        console.log("response",response)
  //        setCities(response);
  //      } catch (error) {
  //        console.error('Error fetching cities:', error);
  //      }
  //    }, 300), // Adjust the debounce delay (in milliseconds) as needed
  //    []
  //  );

  //   const handleCitySearch = (value) => {
  //    setSearchQuery(value);
  //    debouncedFetchCities(value);
  //  };

  const handleCityChange = (value) => {
    handleChange(value);
    setSelectedCity(value);
  };

  //   useEffect(() => {
  //    return () => {
  //      debouncedFetchCities.cancel();
  //    };
  //  }, [debouncedFetchCities]);

  const fetchAllCity = async () => {
    const response = await openSearchCityByName();
    setCities(response?.items);
  };

  useEffect(() => {
    fetchAllCity();
  }, []);

  return (
    <div
      className="flex"
      style={{
        gap: '20px',
        flexDirection: 'column',
        position: 'absolute',
        top: '88px',
        left: '26px',
        background: 'white',
        zIndex: 2,
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid white',
      }}
    >
      <Select
        showSearch
        style={{ width: 400 }}
        placeholder="Select a country"
        value="UK"
        optionFilterProp="children"
        onChange={handleCountryChange}
        filterOption={(input, option) => option.children
          .toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {countries.map((country) => (
          <Option key={country} value={country}>
            {country}
          </Option>
        ))}
      </Select>

      <Select
        showSearch
        mode="multiple"
        style={{ width: 400 }}
        placeholder="Select cities"
        optionFilterProp="children"
        onChange={handleCityChange}
        filterOption={(input, option) => option.children
          .toLowerCase().includes(input.toLowerCase())}
        disabled={!selectedCountry}
      >
        {selectedCountry && cities?.length
          && cities.map((city) => (
            <Option key={city?.NAME_3} value={city?.NAME_3}>
              {city.NAME_3}
            </Option>
          ))}
      </Select>
    </div>
  );
}

export default GeoSearchBar;
