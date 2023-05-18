import React from 'react'

//Creates 5 different buttons to filter by country region
const FilterCountry = ({onSelect, onAll}) => {
    //When user clicks a button, selectHandler is called, which gets the value of the selected region and calls onSelect with the regionName
    const selectHandler = regionName => {
        //onSelect function filters the list of country objects based on the selected region, then displays the appropriate countries
        onSelect(regionName)
    }

    const allHandler = () => {
        onAll()
    }
    
    //The following 6 options are available (Africa, America, Asia, Europe, Oceania and All Regions to reset)
    return (
    <div>
        <button className="filter_but" onClick={() => allHandler("all")}>All</button>
        <button className="filter_but" onClick={() => selectHandler("Africa")}>Africa</button>
        <button className="filter_but" onClick={() => selectHandler("Americas")}>Americas</button>
        <button className="filter_but" onClick={() => selectHandler("Asia")}>Asia</button>
        <button className="filter_but" onClick={() => selectHandler("Europe")}>Europe</button>
        <button className="filter_but" onClick={() => selectHandler("Oceania")}>Oceania</button>


    </div>
    )
}

export default FilterCountry
