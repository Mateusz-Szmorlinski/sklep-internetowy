import React, { useState, useEffect } from "react";
import "./Tile.css";
import { NavLink } from "react-router-dom";
import { useBasket } from "../../Data/Basket/Basket";

function Tile(props) {
    const { addToBasket } = useBasket();
    const item = {
        id: props.product.id,
        name: props.product.name,
        price: props.product.price,
        quantity: 1,
        imageURL: props.product.imageURL
    }

    async function addItem() {
        await addToBasket(item);
    }

    return (
        <div className="tile">
            <div className="image-wrapper">
                <NavLink to={"/product/" + props.product.name}><img src={props.product.imageURL}/></NavLink>
            </div>
            <div className="text-wrapper">
                <h3><NavLink to={"/product/" + props.product.name}>{props.product.name}</NavLink></h3>
                <p>Price: {props.product.price}</p>
                {props.product.stock > 0 ? (
                    <>
                    <NavLink to={"/product/" + props.product.name}><button>BUY NOW</button></NavLink>
                    <button onClick={addItem}>add to cart</button>
                    </>
                ) : (
                    <p>Out of stock!</p>
                )}
                
            </div>
        </div>
    );
}

export default Tile;