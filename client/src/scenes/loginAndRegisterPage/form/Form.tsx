import { Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch } from "../../../state/hooks";
import { setLogin } from "../../../state/authSlice";
import "./form.css";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  cnp: string;
  phoneNumber: string;
  [key: string]: string;
}

interface LoginFormValues {
  cnp: string;
  password: string;
}

const registerSchema = object({
  name: string().required("Name is required."),
  email: string().email().required("Email is required."),
  password: string().required("Password is required."),
  cnp: string().required("CNP is required."),
  phoneNumber: string(),
});

const loginSchema = object({
  cnp: string().required("CNP is required."),
  password: string().required("Password is required."),
});

const initialRegisterValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  cnp: "",
  phoneNumber: "",
};

const initialLoginValues: LoginFormValues = {
  cnp: "",
  password: "",
};

const Form = () => {
  const api = import.meta.env.VITE_API;
  const [page, setPage] = useState("login");
  const navigate = useNavigate();
  const isLogin = page === "login";
  const isRegister = page === "register";
  const dispatch = useAppDispatch();

  const register = async (
    values: RegisterFormValues,
    onSubmitProps: FormikHelpers<RegisterFormValues>
  ) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    const savedUserResponse = await fetch(`${api}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) setPage("login");
  };

  const login = async (
    values: LoginFormValues,
    onSubmitProps: FormikHelpers<LoginFormValues>
  ) => {
    const loggedInResponse = await fetch(`${api}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };
  const handleFormSubmit = async (
    values: RegisterFormValues | LoginFormValues,
    onSubmitProps: FormikHelpers<RegisterFormValues | LoginFormValues>
  ) => {
    if (isLogin) {
      await login(
        values as LoginFormValues,
        onSubmitProps as FormikHelpers<LoginFormValues>
      );
    } else {
      await register(
        values as RegisterFormValues,
        onSubmitProps as FormikHelpers<RegisterFormValues>
      );
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialLoginValues : initialRegisterValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({ values, handleChange, handleBlur, handleSubmit, resetForm }) => (
        <form onSubmit={handleSubmit}>
          <div id="form">
            {isRegister && (
              <div className="register">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).name}
                  name="name"
                />

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).email}
                  name="email"
                />

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                />

                <input
                  type="text"
                  className="form-control"
                  id="cnp"
                  placeholder="CNP"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cnp}
                  name="cnp"
                />

                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).phoneNumber}
                  name="phoneNumber"
                />
              </div>
            )}
            {isLogin && (
              <div className="login">
                <input
                  type="text"
                  className="form-control"
                  id="cnp"
                  placeholder="CNP"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cnp}
                  name="cnp"
                />

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-warning"
            style={{ color: "white" }}
          >
            {isLogin ? "LOGIN" : "REGISTER"}
          </button>

          <p
            onClick={() => {
              setPage(isLogin ? "register" : "login");
              resetForm();
            }}
          >
            {isLogin ? "Register here!" : "Login here!"}
          </p>
        </form>
      )}
    </Formik>
  );
};

export default Form;
