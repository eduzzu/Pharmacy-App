import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./scenes/loginAndRegisterPage/auth/Auth";
import { useAppSelector } from "./state/hooks";
import Home from "./scenes/homePage/Home";
import AddProductForm from "./scenes/addProductPage/AddProductForm";

function App() {
  const isAuth = Boolean(useAppSelector((state) => state.auth.token));

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
          <Route path="/products/add-product" element={isAuth ? <AddProductForm /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
