import { useEffect, useState } from "react";
import { useAppSelector } from "../../../state/hooks";
import IProduct from "../../../interfaces/IProduct";
import "./productsData.css";
import { useNavigate } from "react-router-dom";

const ProductsData = () => {
  const [products, setProducts] = useState([]);
  const api = import.meta.env.VITE_API;
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const productsResponse = await fetch(`${api}/products/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const productsData = await productsResponse.json();
      setProducts(productsData);
    };
    getProducts();
  }, []);

  if (!products) return null;

  const handleSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    if(evt.target.value === "addProduct"){
      navigate(`/products/add-product`);
    }
  }

  return (
    <div className="homePageProducts">
      <select
        className="form-select form-select-sm"
        aria-label="Small select example"
        onChange={handleSelectChange}
      >
        <option defaultValue="default">Select a product...</option>
        {products.map((prod: IProduct) => {
          return (
            <option>
              {prod.name}, {prod.brand}, {prod.price} RON
            </option>
          );
        })}
        <option value="addProduct">Add a Product...</option>
      </select>
      <div className="productsTableData">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Brand</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod: IProduct) => {
              return (
                <tr>
                  <td>{prod.name}</td>
                  <td>{prod.brand}</td>
                  <td>{prod.price.toFixed(2)}</td>
                  <td>{prod.quantity}</td>
                  <td>{prod.expirationDate.toString().slice(0, 10)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsData;
