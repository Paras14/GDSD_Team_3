import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Global } from "../../helpers/Global.js";
import { useState } from "react";
import { useEffect } from "react";

const baseUrl = Global.baseUrl;
const strongPasswordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const schema = Yup.object().shape({
  restaurentname: Yup.string().required(),
  managerfirstname: Yup.string().required(),
  managerlastname: Yup.string().required(),
  username: Yup.string().required(),
  managermail: Yup.string().required(),
  password: Yup.string()
    .required("Please Enter Your Password")
    .matches(
      strongPasswordRegex,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  reenterpassword: Yup.string()
    .required()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
  city: Yup.string().required(),
  state: Yup.string().required(),
  address: Yup.string().required(),
  zip: Yup.string().required(),
  telefonenumber: Yup.string().required(),
  file: Yup.mixed().required(),
  restaurenttype: Yup.mixed().required(),
  description: Yup.string().required(),
  terms: Yup.bool().required().oneOf([true], "terms must be accepted"),
});

function SignUp() {
  const navigate = useNavigate();
  const [restaurantCategories, setRestaurantCategories] = useState([]);
  const [restaurenttype, setRestaurenttype] = useState("");

  useEffect(() => {
    async function getRestaurantCategories() {
      const response = await axios.get(baseUrl + "restaurantCategories");
      setRestaurantCategories(response.data);
    }

    getRestaurantCategories();
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const user = {
        username: values.username,
        firstname: values.managerfirstname,
        lastname: values.managerlastname,
        email: values.managermail,
        password: values.password,
        city: values.city,
        state: values.state,
        zip: values.zip,
        description: "",
        image: "",
        rolId: "9",
      };

      const restaurant = {
        name: values.restaurentname,
        address: values.address,
        city: values.city,
        state: values.state,
        zip: values.zip,
        telephone: values.telefonenumber,
        description: values.description,
        image: values.file,
        restaurantCategoryId: values.restaurenttype,
        userId: "",
      };

      setSubmitting(true);
      console.log("User is: " + JSON.stringify(user));
      axios
        .post(baseUrl + "users/", user)
        .then(function (response) {
          console.log("Reached Restaurant save part: " + response.data.id);
          restaurant.userId = response.data.id;
          console.log("Restaurant is: " + JSON.stringify(restaurant));
          axios
            .post(baseUrl + "restaurants/", restaurant)
            .then(function (response) {
              navigate("/restaurentRegistration");
              setSubmitting(false);
            })
            .catch(function (error) {
              axios.delete(baseUrl + "users/" + response.data.id);
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
      // Make the API call
      // const response = await fetch("http://localhost:8080/users/", {
      //   method: "POST",
      //   body: JSON.stringify(values),
      //   headers: { "Content-Type": "application/json" },
      // });
      // Parse the response to JSON
      // const data = await response.json();
      // if (response.ok) {
      //   navigate("/restaurentRegistration");
      //   setSubmitting(false);
      // } else {
      //   // Set errors if the response is not successful
      //   setErrors({ submit: data.message });
      //   setSubmitting(false);
      // }
    } catch (error) {
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
    console.log(values);
  };

  const handleRestaurentTypeChange = (e) => {
    setRestaurenttype(e.target.value);
  };

  return (
    <div className="container mt-4 mb-5">
      <div className=" rounded shadow" style={{ backgroundColor: "#AED0FF" }}>
        <p className="py-2 fs-1 fw-bold text-center">Restaurant registration</p>
      </div>

      <div className="rounded shadow bg-white pb-4">
        <Formik
          method="POST"
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            restaurentname: "",
            managerfirstname: "",
            managerlastname: "",
            username: "",
            managermail: "",
            password: "",
            reenterpassword: "",
            city: "",
            state: "",
            address: "",
            zip: "",
            telefonenumber: "",
            file: null,
            restaurenttype: "",
            checked: [],

            description: "",
            terms: false,
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <div className="container">
              <br></br>
              <Form noValidate onSubmit={handleSubmit}>
                <div className="row px-5 mx-5">
                  <div className="col-md-3 py-3">
                    <Form.Group
                      controlId="validationFormik101"
                      className="position-relative"
                    >
                      <Form.Label>Restaurant Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="restaurentname"
                        value={values.restaurentname}
                        onChange={handleChange}
                        isValid={
                          touched.restaurentname && !errors.restaurentname
                        }
                      />
                      <Form.Control.Feedback tooltip>
                        Looks good!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-3 py-3">
                    <Form.Group
                      controlId="validationFormik102"
                      className="position-relative"
                    >
                      <Form.Label>Manager First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="managerfirstname"
                        value={values.managerfirstname}
                        onChange={handleChange}
                        isValid={
                          touched.managerfirstname && !errors.managerfirstname
                        }
                      />

                      <Form.Control.Feedback tooltip>
                        Looks good!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-3 py-3">
                    <Form.Group
                      controlId="validationFormik102"
                      className="position-relative"
                    >
                      <Form.Label>Manager Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="managerlastname"
                        value={values.managerlastname}
                        onChange={handleChange}
                        isValid={
                          touched.managerlastname && !errors.managerlastname
                        }
                      />

                      <Form.Control.Feedback tooltip>
                        Looks good!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-3 py-3">
                    <Form.Group controlId="validationFormikUsername2">
                      <Form.Label>Username</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">
                          @
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          aria-describedby="inputGroupPrepend"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.username}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </div>

                  <div className="col-md-4 py-3">
                    <Form.Group
                      controlId="validationFormik110"
                      className="position-relative"
                    >
                      <Form.Label>Manager Email</Form.Label>
                      <Form.Control
                        type="mail"
                        placeholder="Enter Email"
                        name="managermail"
                        value={values.managermail}
                        onChange={handleChange}
                        isInvalid={!!errors.managermail}
                      />

                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.managermail}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-4 py-3">
                    <Form.Group
                      controlId="validationFormik110"
                      className="position-relative"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />

                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-4 py-3">
                    <Form.Group
                      controlId="validationFormik111"
                      className="position-relative"
                    >
                      <Form.Label>Re-Enter Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Re-Enter Password"
                        name="reenterpassword"
                        value={values.reenterpassword}
                        onChange={handleChange}
                        isInvalid={!!errors.reenterpassword}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.reenterpassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className="col-md-4 py-3">
                    <Form.Group
                      controlId="validationFormik103"
                      className="position-relative"
                    >
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                      />

                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-4 py-3">
                    <Form.Group
                      controlId="validationFormik104"
                      className="position-relative"
                    >
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="State"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        isInvalid={!!errors.state}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-4 py-3">
                    <Form.Group
                      controlId="validationFormik108"
                      className="position-relative"
                    >
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className="col-md-4 py-3">
                    <Form.Group
                      controlId="validationFormik105"
                      className="position-relative"
                    >
                      <Form.Label>Restaurant Telephone</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Number"
                        name="telefonenumber"
                        value={values.telefonenumber}
                        onChange={handleChange}
                        isInvalid={!!errors.telefonenumber}
                      />

                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.telefonenumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-4 py-3">
                    <Form.Group
                      controlId="validationFormik105"
                      className="position-relative"
                    >
                      <Form.Label>ZipCode</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Zip"
                        name="zip"
                        value={values.zip}
                        onChange={handleChange}
                        isInvalid={!!errors.zip}
                      />

                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.zip}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-4 py-3">
                    {/* <Form.Group
                      controlId="validationFormik105"
                      className="position-relative"
                    >
                      <Form.Label>Restaurant Type</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Restaurent Type"
                        name="restaurenttype"
                        value={values.restaurenttype}
                        onChange={handleChange}
                        isInvalid={!!errors.restaurenttype}
                      />

                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.restaurenttype}
                      </Form.Control.Feedback>
                    </Form.Group> */}
                    {/* <label>
                      <Field type="checkbox" name="toggle" />
                      {`${values.toggle}`}
                    </label> */}

                    {/*<div id="checkbox-group" className="fw-bold mt-4">
                      Restaurant Type
                    </div>
                    <div role="group" aria-labelledby="checkbox-group">
                      <label className="ms-2">
                        <Field type="checkbox" name="checked" value="chinese" />
                        Chinese
                      </label>
                      <label>
                        <Field type="checkbox" name="checked" value="russian" />
                        Russian
                      </label>
                      <label>
                        <Field type="checkbox" name="checked" value="indian" />
                        Indian
                      </label>
                    </div>*/}
                    <Form.Label>Restaurant Type</Form.Label>
                    {/* We create a dropdown to select the type of restaurant, using the Form */}
                    <Form>
                      {restaurantCategories.length > 0 && (
                        <Form.Select
                          name="restaurenttype"
                          value={values.restaurenttype}
                          onChange={handleChange}
                          isInvalid={!!errors.restaurenttype}
                        >
                          <option value="">Select Restaurant Type</option>
                          {restaurantCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </Form.Select>
                      )}
                    </Form>
                  </div>

                  <div className="col-md-12 py-3">
                    <Form.Group className="position-relative mb-3">
                      <Form.Label>Upload image Url</Form.Label>
                      <Form.Control
                        type="url"
                        required
                        name="file"
                        onChange={handleChange}
                        isInvalid={!!errors.file}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.file}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-12 pb-3">
                    <Form.Group className="position-relative mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        required
                        name="description"
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className="col-md-12">
                    <Form.Group className="position-relative mb-3">
                      <Form.Check
                        required
                        name="terms"
                        label="Agree to terms and conditions"
                        onChange={handleChange}
                        isInvalid={!!errors.terms}
                        feedback={errors.terms}
                        feedbackType="invalid"
                        id="validationFormik106"
                        feedbackTooltip
                      />
                    </Form.Group>
                  </div>

                  <Row className="fw-bold py-3">
                    <Button
                      className="fw-bold col-4"
                      type="submit"
                      disabled={
                        (values.restaurentname === "",
                        values.managername === "",
                        values.username === "",
                        values.managermail === "",
                        values.password === "",
                        values.reenterpassword === "",
                        values.city === "",
                        values.state === "",
                        values.telefonenumber === "",
                        values.zip === "",
                        values.restaurenttype === "",
                        values.file === null,
                        values.terms === false)
                      }
                      onClick={handleSubmit}
                    >
                      Register
                    </Button>
                  </Row>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
