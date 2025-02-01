import "./Account.css";
import { useUser } from "../../Data/Users/Users";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function Account() {
  const { currentUser, logoutUser, getUserField } = useUser();
  const [userOrders, setUserOrders] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        try {
          const orders = await getUserField(currentUser.uid, "orders");
          
          if (orders && orders.length > 0) {
            let fetchedOrders = [];

            for (const orderId of orders) {
              const orderRef = doc(db, "orders", orderId);
              const orderData = await getDoc(orderRef);

              if (orderData.exists()) {
                fetchedOrders.push({
                  id: orderData.id,
                  ...orderData.data()
                });
              }
            }
            setUserOrders(fetchedOrders);
          } else {
            setUserOrders([]);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
          setUserOrders([]); 
        }
      }
    };

    fetchOrders();
    console.log(userOrders);
  }, []);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
  };


  return (
    <section id="account">
      <div id="account-wrapper">
        {currentUser ? (
          <>
            <h1>Hello {currentUser.email}!</h1>
            <button onClick={logoutUser}>Log out</button>
            {userOrders === null ? (
              <p className="text">Loading orders...</p>
            ) : userOrders.length > 0 ? (
              <div className="orders-section">
                <h2 className="text">Your Orders</h2>
                <div className="orders-list">
                  {userOrders.map((order) => (
                    <div key={order.id} className="order-item">
                      <p className="text">Order ID: {order.id}</p>
                      <p className="text">Total: {order.totalValue}</p>
                      <p className="text">Order date: {order.orderTime.toDate().toLocaleDateString()}</p>
                      <button onClick={() => showOrderDetails(order)}>Order details</button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text">You haven't placed any orders yet.</p>
            )}

            {/* Order Details Popup */}
            {selectedOrder && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <button className="close-button" onClick={() => setSelectedOrder(null)}>×</button>
                  <h2>Order Details</h2>
                  <div className="product-list">
                    {selectedOrder.products.map((product) => (
                      <div key={product.id} className="product-item-pop">
                        <img
                          src={product.imageURL}
                          alt={product.name}
                          className="product-image"
                        />
                        <div className="product-info">
                          <h3 className="product-text">{product.name}</h3>
                          <p className="product-text">{product.price.toFixed(2)}</p>
                          <p className="product-text">Quantity: {product.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-summary">
                    <p>Total: {selectedOrder.totalValue}</p>
                    <p>Order Date: {selectedOrder.orderTime.toDate().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <NavLink to={"/login"}>LOGIN</NavLink>
            <NavLink to={"/register"}>REGISTER</NavLink>
          </>
        )}
      </div>
    </section>
  );
}

export default Account;
