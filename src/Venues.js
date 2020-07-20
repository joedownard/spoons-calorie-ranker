import React, { useState } from 'react';
import {
    Link
} from "react-router-dom";

function VenueListItem(props) {
    const linkContainer = {
        marginBottom: '1%',
    }

    return <div style={linkContainer}><Link to={"/venue/".concat(props.id)}> {props.name} </Link></div>;
}

function VenueList(props) {
    const container = {
        backgroundImage: 'url(https://www.jdwetherspoon.com/~/media/images/news/carpets/the-golden-lionjpg.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
    }

    const listItems = props.data.map((item) =>
        <VenueListItem key={item.venueId} id={item.venueId} name={item.name} />
    );

    return (
            <div style={container}>
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
