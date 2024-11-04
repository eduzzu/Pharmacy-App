import Bill from "./bill/Bill";
import "./home.css";
import ProductsData from "./productsData/ProductsData";

const Home = () => {
  return (
    <div className="home">
    <ProductsData />
    <Bill />
    </div>
  )
}

export default Home;
