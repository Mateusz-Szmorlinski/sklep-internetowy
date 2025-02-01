// src/contexts/ProductsContext.js
import React, { createContext, useContext, useState } from "react";
import { collection, getDocs, getDoc, limit, where, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase/firebase.js";

const ProductsContext = createContext();

export const useProducts = () => {
    return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchProducts() {
        setLoading(true);
        try {
            const q = await getDocs(query(collection(db, "products"), limit(20)));
            const productsData = q.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLoading(false);
            return productsData;
        } catch (err) {
            setError("Error fetching products: " + err);
            setLoading(false);
        }
    };

    async function fetchSearchProducts(field, value) {
        setLoading(true);
        try {
            const q = await getDocs(collection(db, "products"));
            console.log(q);
            const productsData = q.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).filter(product => product[field].toLowerCase().includes(value.toLowerCase()));
            setLoading(false);
            return productsData;
        } catch (err) {
            setError("Error fetching products: " + err);
            setLoading(false);
        }
    };

    async function fetchOneProduct(field, value) {
        setLoading(true);
        try {
            let q = query(collection(db, "products"), where(field, "==", value));
            let querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                setLoading(false);
                return null;
            }
    
            let doc = querySnapshot.docs[0];
            let productData = { id: doc.id, ...doc.data() };
            
            setLoading(false);
            return productData;
        } catch (err) {
            setLoading(false);
            setError("Error fetching product: " + err.message);
            return null;
        }
    }

    return (
        <ProductsContext.Provider value={{ error, loading, fetchOneProduct, fetchProducts, fetchSearchProducts}}>
            {children}
        </ProductsContext.Provider>
    );
};
