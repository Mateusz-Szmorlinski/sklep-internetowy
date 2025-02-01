import React, { useEffect, useState } from "react";
import "./Home.css";
import Loading from "../../components/Loading/Loading";
import { useProducts } from "../../Data/Products/Products";
import Tile from "../../components/Product-tile/Tile";

function Home() {
  const { error, loading, fetchProducts } = useProducts();
  const [products, setProducts] = useState([]);

  if (error) {
    console.log(error);
  }

  async function fetchData() {
    let data = await fetchProducts();
    setProducts(data);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="home">
        <section id="welcome">
            <h1>Sklep z rybami tropikalnymi</h1>
        </section>
        <img
            src={process.env.PUBLIC_URL + "/images/home.jpeg"}
            alt="image of beautiful planted aquarium"
        />
        <section id="content">
            <section id="main">
                <div id="products">
                    {products && products.length > 0 ? (
                        products.map((product, index) => {
                            return (
                                <Tile
                                    key={index}
                                    product={product}
                                />
                            );
                        })
                    ) : (
                        <Loading />
                    )}
                </div>
            </section>
        </section>
    </section>
  );
}

export default Home;
