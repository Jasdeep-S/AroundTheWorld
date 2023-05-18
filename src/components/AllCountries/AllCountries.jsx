import React, {useState, useEffect} from 'react'
import {apiURL} from '../utils/api'
import SearchInput from '../Search/SearchInput'
import FilterCountry from '../FilterCountry/FilterCountry'
import { Link } from 'react-router-dom'

const AllCountries = () => {

    //Create an empty array that will store country objects
    const [countries, setCountries] = useState([])
    //Create a loading variable to check when program is loading
    const [isLoading, setIsLoading] = useState(true)
    
    //Displays all countries initally
    const getAllCountries = async() =>{
        //Make a request to fetch the API's 'all' endpoint
        const res = await fetch(`${apiURL}/all`)

        //If res is not ok, then throw an error
        if (!res.ok) throw new Error('Something went wrong!');
        
        //Set data is loaded with the appropriate data
        const data = await res.json();

        //Update countries array with the data retrived from the API (creating an array of country objects)
        setCountries(data);
        
        //Program is no longer loading 
        setIsLoading(false);  
    };

    //Allows user to search country by name
    const getCountryByName = async(countryName)=>{
        //Make a request to fetch the API's 'name/countryName' endpoint
        const res = await fetch(`${apiURL}/name/${countryName}`)

        //If the country does not exist, then throw an error
        if (!res.ok) throw new Error('No country with the following criteria exists')

        //Set data is loaded with the appropriate data
        const data = await res.json()
        
        //Update countries array with the data retrived from API (creating an array of country objects with a specific country name)
        setCountries(data)
        
        //Program is no longer loading
        setIsLoading(false)
    }

    //Allows user to filter countries by region
    const getCountryByRegion = async(regionName)=> {
        //Make a request to fetch the API's '/region/regionName' endpoint
        const res = await fetch(`${apiURL}/region/${regionName}`)

        if(!res.ok) throw new Error('Failed...')

        const data = await res.json()

        setIsLoading(false)
        setCountries(data)

    };

    //When allCountries is rendered, run the useEffect function once, which will then call getAllCountries ([] ensures one run)
    useEffect(()=>{
        getAllCountries();
    },[])

    
    //UI component for AllCountries.jsx

    return (
    //country_top includes search and filter menu
    <div className='all_country_wrapper'>
        <div className='country_top'>        
            <div className="search">
                <SearchInput onSearch={getCountryByName}/>
            </div>

            <div className="filter">
                <FilterCountry onSelect={getCountryByRegion} onAll={getAllCountries}/>
            </div>
        </div>
    
        <div className='country_bottom'>
            {isLoading && <h4>Loading....</h4>}

            {
                countries?.map(country=>(
                    <Link to={`/country/${country.name.common}`}>
                        <div className='country_card'>
                        <div className="country_img">
                            <img src={country.flags.png} alt=''></img>
                        </div>

                        <div className="country_data">
                            <h3>{country.name.common}</h3>
                            <h6>Capital: {country.capital}</h6>
                            <h6>Region: {country.region}</h6>
                            <h6>Sub-Region: {country.subregion}</h6>
                            <h6>Population: {country.population}</h6>
                            
                        </div>
                    </div>
                    </Link>
                ))
            }

        </div>
    </div>   
    )
}

export default AllCountries