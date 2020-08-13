import React, { useState, useEffect } from 'react';
import {
    useParams,
} from "react-router-dom";
import './Venue.css';
import './App.css';

function FoodListItem(props) {

    return <div className="itemStyle">
    <p className="productText" >{props.name}</p>
    <p className="suppText"> {props.calories.toString().concat(" kcal")} </p>
    <p sclassName="suppText"> {"£".concat(props.price)} </p>
    <p className="calText" >{"cal/£: ".concat(props.caloriesPerPound.toFixed(0))}  </p>
    </div>;
}

function FoodList (props) {
    const [calorieBound, setCalorieBound] = useState(0);
    const [priceBound, setPriceBound] = useState(0);
    useEffect(() => {
            const filteredItems = [];
            for (const key in props.data) {
                if (props.data.hasOwnProperty(key)) {
                    if (props.data[key].priceValue > priceBound && props.data[key].calories > calorieBound) {
                        filteredItems.push(props.data[key])
                    }
                }
            }
            setData(filteredItems);
    }, [calorieBound, priceBound, props.data]);

    const [data, setData] = useState(props.data);

    const listItems = data.map((item) =>
        <FoodListItem key={item.iOrderDisplayId} name={item.displayName} calories={item.calories} price={item.priceValue} caloriesPerPound={item.caloriesPerPound} />
    );

    return (
        <div className="divStyle">
            <div>
                <label>Min Calories: </label>
                <input type="number" name="Calories Bound" value={calorieBound} onChange={(event) => setCalorieBound(event.target.value)} />
            </div>

            <div>
                <label>Min Price: </label>
                <input type="number" name="Price Bound" value={priceBound} onChange={(event) => setPriceBound(event.target.value)} />
            </div>

            {listItems}
        </div>
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
                <FoodList data={arrayData} />
        </div>
        );
    } else {
        return (
            <div className="App">
                <div>
                    Loading data!
                </div>
            </div>
        );
    }
}
