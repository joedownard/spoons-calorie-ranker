import React, { useState } from 'react';
import {
    useParams,
} from "react-router-dom";

function FoodListItem(props) {
    const itemStyle = {
        width: "300px",
        border: "5px solid green",
        margin: "20px"
    };

    return <div style={itemStyle}> 
    <p>{props.name}</p>
    <p>{"Calories: ".concat(props.calories)} </p>
    <p>{"Price: ".concat(props.price)} </p>
    <p>{"Calories per £1: ".concat(props.caloriesPerPound.toFixed(0))}  </p>
    </div>;
}

function FoodList(props) {
    const listItems = props.data.map((item) =>
        <FoodListItem key={item.iOrderDisplayId} name={item.displayName} calories={item.calories} price={item.priceValue} caloriesPerPound={item.caloriesPerPound} />
    );

    return (
        <ul>
            {listItems}
        </ul>
    );
}

export function Venue() {
    const { id } = useParams();

    const [spoonsMenuData, setSpoonsMenuData] = useState(0);


    if (spoonsMenuData === 0) {
        fetch("https://cors-anywhere.herokuapp.com/https://static.wsstack.nn4maws.net/content/v2/menus/" + id + ".json")
            .then((response) => response.json())
            .then((responseJson) => {
                setSpoonsMenuData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    if (spoonsMenuData !== 0) {
        let arrayData = []
        spoonsMenuData.menus.forEach(menu => {
            menu.subMenu.forEach(subMenu => {
                subMenu.productGroups.forEach(productGroup => {
                    productGroup.products.forEach(product => {
                        product["caloriesPerPound"] = (product.calories / product.priceValue);
                        var found = false;
                        arrayData.forEach(item => {
                            if (item.iOrderDisplayId === product.iOrderDisplayId) {
                                found = true;
                            }
                        });
                        if (product.calories !== 0 && product.priceValue !== 0 && found === false) {
                            arrayData.push(product);
                        }
                    });
                });
            });
        });
        arrayData.sort(function (a, b) {
            if (a.caloriesPerPound > b.caloriesPerPound) { return -1 };
            if (a.caloriesPerPound > b.caloriesPerPound) { return 1 };
            return 0;
        });
        return (<div className="App">
            <p>
                <FoodList data={arrayData} />
            </p>
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
