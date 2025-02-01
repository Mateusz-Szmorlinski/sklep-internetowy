import React, { useEffect, useState } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import { useProducts } from "../../Data/Products/Products";
import NotFound from "../NotFound/NotFound";
import Loading from "../../components/Loading/Loading";
import { useBasket } from "../../Data/Basket/Basket";

function Product() {
    const [productData, setProductData] = useState(null);
    const { productTitle } = useParams();
    const { fetchOneProduct } = useProducts();
    const { addToBasket } = useBasket();

    const item = {}

    async function addItem() {
        await addToBasket(item);
    }

    async function fetchProductData() {
        try {
            let data = await fetchOneProduct("name", productTitle.replace(/%20/g, " "));
            setProductData(data);
            item = {
                id: productData.id,
                name: productData.name,
                price: productData.price,
                quantity: 1,
                imageURL: productData.imageURL
            }
        } catch (err) {
            console.error('Error fetching product:', err);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    if (productData !== null) {
        return (
            <section id="product">
                <div id="main">
                    {productData.imageURL ? <img src={productData.imageURL} alt="Blog Product" /> : <Loading />}
                    {productData && <h1>{productData.name}</h1>}
                </div>
                {productData && productData.stock > 0 ?(
                    <>
                        <p style={{width: "80%"}}>{productData.description}</p>
                        <p>price: {productData.price}</p>
                        <button onClick={addItem}>Add to cart</button>
                    </>
                ) :(
                    <p>Out of stock!</p>
                )
                }

                {!productData && <Loading />}
            </section>
        );
    } else {
        return <NotFound />
    }

    
}

export default Product;