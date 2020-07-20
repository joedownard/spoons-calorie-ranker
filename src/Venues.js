import React, { useState } from 'react';
import {
    Link
} from "react-router-dom";

function VenueListItem(props) {
    return <p> <Link to={"/venue/".concat(props.id)}> {props.name} </Link></p>;
}

function VenueList(props) {
    const listItems = props.data.map((item) =>
        <VenueListItem key={item.venueId} id={item.venueId} name={item.name} />
    );

    return (
        <ul>
            {listItems}
        </ul>
    );
}

export function Venues() {
    const [spoonsVenueData, setSpoonsVenueData] = useState(0);

    if (spoonsVenueData === 0) {
        fetch('https://cors-anywhere.herokuapp.com/https://static.wsstack.nn4maws.net/v1/venues/en_gb/venues.json')
            .then((response) => response.json())
            .then((responseJson) => {
                setSpoonsVenueData(responseJson);
                console.log(responseJson.venues);
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