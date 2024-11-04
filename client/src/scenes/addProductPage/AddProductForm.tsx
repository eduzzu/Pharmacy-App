import { Formik, FormikHelpers } from "formik";
import { object, string, number } from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./addProductForm.css";
import { useAppSelector } from "../../state/hooks";

interface AddProductFormValues {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  expirationDate: string;
}

const addProductSchema = object({
  name: string().required(),
  brand: string().required(),
  price: number().required(),
  quantity: number().required(),
  expirationDate: string().required(),
});

const initialFormValues = {
  name: "",
  brand: "",
  price: 1.0,
  quantity: 0,
  expirationDate: Date().toString().slice(0, 10),
};

const AddProductForm = () => {
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const addProduct = async (
    values: AddProductFormValues,
    onSubmitProps: FormikHelpers<AddProductFormValues>
  ) => {
    const formData = new FormData();
    (Object.keys(values) as Array<keyof AddProductFormValues>).forEach(
      (key) => {
        formData.append(key, values[key] as any);
      }
    );

    const savedProductResponse = await fetch(`${api}/products/add-product`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const savedProduct = await savedProductResponse.json();
    onSubmitProps.resetForm();

    if (savedProduct) navigate("/home");
  };

  const handleFormSubmit = async (
    values: AddProductFormValues,
    onSubmitProps: FormikHelpers<AddProductFormValues>
  ) => {
    await addProduct(
      values as AddProductFormValues,
      onSubmitProps as FormikHelpers<AddProductFormValues>
    );
  };

  return (
    <Formik 
        onSubmit={handleFormSubmit}
        initialValues={initialFormValues}
        validationSchema={addProductSchema}
    >{({ values, handleChange, handleBlur, handleSubmit, resetForm }) => (
      <div className="formContainer">
        <form onSubmit={handleSubmit} id="addProductForm">
          <p>Add a product!</p>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                />

                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  placeholder="Brand"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.brand}
                  name="brand"
                />

                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  name="price"
                />

                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  placeholder="Quantity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.quantity}
                  name="quantity"
                />

                <input
                  type="text"
                  className="form-control"
                  id="expirationDate"
                  placeholder="ExpirationDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.expirationDate}
                  name="expirationDate"
                />
          <button
            type="submit"
            className="btn btn-warning"
            style={{ color: "white" }}
            onClick={() => resetForm}
          >Add Product
          </button>
        </form>
        </div>
      )}

    </Formik>
  ) 
};
export default AddProductForm;