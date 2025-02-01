import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

const BasketContext = createContext();

export const useBasket = () => {
    return useContext(BasketContext);
};

export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Initialize basket from cookies on mount
    useEffect(() => {
        try {
            const savedBasket = Cookies.get('userBasket');
            if (savedBasket) {
                setBasket(JSON.parse(savedBasket));
            }
            setLoading(false);
        } catch (err) {
            setError("Error loading basket: " + err.message);
            setLoading(false);
        }
    }, []);

    // Save basket to cookies whenever it changes
    useEffect(() => {
        try {
            Cookies.set('userBasket', JSON.stringify(basket), { expires: 7 });
        } catch (err) {
            setError("Error saving basket: " + err.message);
        }
    }, [basket]);

    // Add new item to basket
    async function addToBasket(item) {
        try {
            const { id, name, price, quantity, imageURL } = item;
            const existingItem = basket.find(product => product.id === id);

            if (existingItem) {
                const updatedBasket = basket.map(product =>
                    product.id === id
                        ? { ...product, quantity: product.quantity + quantity }
                        : product
                );
                setBasket(updatedBasket);
            } else {
                setBasket([...basket, { id, name, price, quantity, imageURL }]);
            }
        } catch (err) {
            setError("Error adding to basket: " + err.message);
        }
    }

    // Update quantity of existing item
    async function updateQuantity(id, newQuantity) {
        try {
            if (newQuantity < 1) {
                removeFromBasket(id);
                return;
            }

            const updatedBasket = basket.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
            setBasket(updatedBasket);
        } catch (err) {
            setError("Error updating quantity: " + err.message);
        }
    }

    // Remove item from basket
    async function removeFromBasket(id) {
        try {
            const updatedBasket = basket.filter(item => item.id !== id);
            setBasket(updatedBasket);
        } catch (err) {
            setError("Error removing from basket: " + err.message);
        }
    }

    // Clear entire basket
    async function clearBasket() {
        try {
            setBasket([]);
            Cookies.remove('userBasket');
        } catch (err) {
            setError("Error clearing basket: " + err.message);
        }
    }

    // Get total price of basket
    function getBasketTotal() {
        return basket.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get total number of items in basket
    function getBasketCount() {
        return basket.reduce((total, item) => total + item.quantity, 0);
    }

    // Check if item exists in basket
    function isInBasket(id) {
        return basket.some(item => item.id === id);
    }

    return (
        <BasketContext.Provider 
            value={{ 
                basket,
                loading,
                error,
                addToBasket,
                updateQuantity,
                removeFromBasket,
                clearBasket,
                getBasketTotal,
                getBasketCount,
                isInBasket
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};