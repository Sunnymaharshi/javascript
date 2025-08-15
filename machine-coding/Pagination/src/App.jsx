import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
const PAGE_SIZE = 10;
function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=300");
    const json = await data.json();
    console.log(json);
    setProducts(json.products);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  if (!products.length) {
    return <h1>No products found!</h1>;
  }
  return (
    <div className="app">
      <h1>Pagination</h1>
      <div className="page-numbers">
        {[...Array(noOfPages)].map((_, i) => {
          return (
            <div
              className={`page-number ${currentPage === i ? "active" : ""}`}
              key={i}
              onClick={() => {
                setCurrentPage(i);
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      <div className="product-list">
        {products.slice(start, end).map((p) => {
          return <ProductCard key={p.id} title={p.title} img={p.images[0]} />;
        })}
      </div>
    </div>
  );
}

export default App;
