import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { apiURL } from '../utils/api';
import { Link } from 'react-router-dom';

const CountryInfo = () => {
    
    //Create an empty array that will store country objects
    const [country, setCountry] = useState([])
    //Create a loading variable to check when program is loading
    const [isLoading, setIsLoading] = useState(true)

    //Extracting countryName parameter from URL
    const {countryName} = useParams()

    const getCountryByName = async()=>{
        //Make a request to fetch the API's 'name/countryName' endpoint (where countryName is a parameter)
        const res = await fetch(`${apiURL}/name/${countryName}`)

        if(!res.ok) throw new Error('Could not Find!')

        const data = await res.json()

        setCountry(data)
        setIsLoading(false)
    }
    
    //When allCountries is rendered, run the useEffect function, which will then call getCountryByName (The dependency array ([countryName]) re-runs effect when countryName changes)
    useEffect(()=>{
        getCountryByName()
    },[countryName])
    

    //UI component for CountryInfo.jsx

    return (  
    <div className='country_info_wrapper'>
        <button><Link to='/'>Back</Link></button>
        {
            country?.map((country,index)=>(
            <div className='country_info_container' key={index}>
                <div className='country_info-img'>
                    <img src={country.flags.png} alt="" />
                </div>

                <div className="country_info">

                    <h3>{country.name.common}</h3>

                    <div className="country_info-left">
                        <h5>Population: <span>{country.population}</span></h5>
                        <h5>Region: <span>{country.region}</span></h5>
                        <h5>Capital: <span>{country.capital}</span></h5>
                        <h5>Sub-Region: <span>{country.subregion}</span></h5>

                    </div>
                </div>
            </div>
            ))
        }
    </div>
    )   

};

export default CountryInfo