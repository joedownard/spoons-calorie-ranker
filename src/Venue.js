import React, { useState } from 'react';
import {
    useParams
} from "react-router-dom";

export function Venue() {
    const { id } = useParams();

const [spoonsMenuData, setSpoonsMenuData] = useState(0);


    if (spoonsMenuData === 0) {
        fetch("https://cors-anywhere.herokuapp.com/https://static.wsstack.nn4maws.net/content/v2/menus/"+ id +".json")
            .then((response) => response.json())
            .then((responseJson) => {
                setSpoonsMenuData(responseJson);
                console.log(responseJson.menus);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div>
            <h3>ID: {id}</h3>
        </div>
    );
}