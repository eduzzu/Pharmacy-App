import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./scenes/loginAndRegisterPage/auth/Auth";
import { useAppSelector } from "./state/hooks";
import Home from "./scenes/homePage/Home";

function App() {
  const isAuth = Boolean(useAppSelector((state) => state.auth.token));

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
