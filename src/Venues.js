import React, { useState } from 'react';
import {
    Link
} from "react-router-dom";
import './App.css';

function VenueListItem(props) {
    const linkContainer = {
        marginBottom: '1%',
    }

    return <div style={linkContainer}><Link to={"/venue/".concat(props.id)}> {props.name.concat(" (").concat(props.town).concat(")")} </Link></div>;
}

function VenueList(props) {
    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState(props.data);

    const updateSearch = (event) => {
        setSearchValue(event.target.value);
        filterArray(event.target.value);
    };

    const filterArray = (text) => {
        const searchedStocks = [];
        for (const key in props.data) {
            if (props.data.hasOwnProperty(key)) {
                if (props.data[key].name.toLowerCase().includes(text.toLowerCase())) {
                    searchedStocks.push(props.data[key])
                }
            }
        }
        setData(searchedStocks);
    }

    const listItems = data.map((item) =>
        <VenueListItem key={item.venueId} id={item.venueId} name={item.name} town={item.town} />
    );

    return (
        <div>
            <input type="text" name="Search" value={searchValue} onChange={updateSearch} />
            {listItems}
        </div>

    );
}

export function Venues() {
    const [spoonsVenueData, setSpoonsVenueData] = useState(0);

    if (spoonsVenueData === 0) {
        fetch('https://cors-anywhere.herokuapp.com/https://static.wsstack.nn4maws.net/v1/venues/en_gb/venues.json')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                setSpoonsVenueData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    if (spoonsVenueData !== 0) {
        return (
            <div className="App">
                <VenueList data={spoonsVenueData.venues} />
            </div>
        );
    } else {
        return (
            <div className="App">
                <p>
                    Loading data!
        </p>
            </div>
        );
    }
}
