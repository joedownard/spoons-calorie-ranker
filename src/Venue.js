import React, { useState } from 'react';
import {
    useParams,
} from "react-router-dom";

function FoodListItem(props) {
    const itemStyle = {
        width: '100%',
        maxWidth: '500px',
        border: "5px solid #279AF1",
        borderRadius: '10px',
        margin: '1%',
        backgroundColor: '#F7F7FF'
    };

    const productText = {
        marginLeft: '2%',
        marginRight: '2%',
        fontWeight: 'bold',
        fontSize: '24px',
        color: '#131112',
    };

    const suppText = {
        color: '#60656F',
    }

    return <div style={itemStyle}>
    <p style={productText}>{props.name}</p>
    <p style={suppText}>{"Calories: ".concat(props.calories)} </p>
    <p style={suppText}>{"Price: ".concat(props.price)} </p>
    <p style={suppText}>{"cal/£: ".concat(props.caloriesPerPound.toFixed(0))}  </p>
    </div>;
}

function FoodList(props) {
    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundImage: 'url(https://www.jdwetherspoon.com/~/media/images/news/carpets/the-golden-lionjpg.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
    };
    const listItems = props.data.map((item) =>
        <FoodListItem key={item.iOrderDisplayId} name={item.displayName} calories={item.calories} price={item.priceValue} caloriesPerPound={item.caloriesPerPound} />
    );

    return (
        <div style={divStyle}>
            {listItems}
        </div>
    );
}

export function Venue() {
    const background = {
        backgroundImage: 'url(https://www.jdwetherspoon.com/~/media/images/news/carpets/the-golden-lionjpg.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
    }
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
                <div style={background}>
                    Loading data!
                </div>
            </div>
        );
    }
}
