import "./Cart.css";
import { useUser } from "../../Data/Users/Users";
import { NavLink } from "react-router-dom";
import { useBasket } from "../../Data/Basket/Basket";
import { useEffect, useState } from "react";
import { db } from "../../Firebase/firebase.js";
import { addDoc, Timestamp, collection, doc, increment, updateDoc, getDoc } from "firebase/firestore";

function Cart() {
  const { currentUser, addUserOrder } = useUser();
  const { basket, updateQuantity, clearBasket } = useBasket();
  const [total, setTotal] = useState(0);
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    let totalItems = basket.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setTotal(totalItems);
  }, basket);

  async function buy() {
    let order = {
      products: basket,
      totalValue: total,
      orderTime: Timestamp.now(),
    };

    let docRef = await addDoc(collection(db, "orders"), order);
    await addUserOrder(docRef.id);
    for (let product of basket) {
      let productRef = doc(db, "products", product.id);
      let stock = await getDoc(productRef);
      if (stock.stock <= 0) {
        return alert("Product is no longer available!")        
      }
      await updateDoc(productRef, {
          stock: increment(-product.quantity)
      });
  }
    await clearBasket();
    setOrderCompleted(true);
  }

  return (
    <section id="cart">
      <div id="cart-wrapper">
        {orderCompleted ? (
          <h1>Your order has been completed successfully!</h1>
        ) : (
          <>
            {basket.length === 0 ? (
              <h1>Your cart is empty!</h1>
            ) : (
              <>
                <div className="product-list">
                  {basket.map((product) => (
                    <div key={product.id} className="product-item">
                      <img
                        src={product.imageURL}
                        alt={product.name}
                        className="product-image"
                      />

                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">
                          {product.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, product.quantity - 1)
                          }
                          className="quantity-button"
                        >
                          -
                        </button>

                        <span className="quantity-display">
                          {product.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(product.id, product.quantity + 1)
                          }
                          className="quantity-button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {total && <h1>TOTAL: {total.toFixed(2)}</h1>}
                {currentUser ? (
                  <button onClick={buy}>BUY</button>
                ) : (
                  <NavLink to={"/account"}>
                    You have to login or register before buying!
                  </NavLink>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
