import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global.js";

const baseUrl = Global.baseUrl;
const strongPasswordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const schema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  username: Yup.string().required(),
  customeremail: Yup.string().required(),
  password: Yup.string()
    .required("Please enter your password")
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
  zip: Yup.string().required(),
  terms: Yup.bool().required().oneOf([true], "terms must be accepted"),
});

function CustomerSignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const user = {
        username: values.username,
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.customeremail,
        password: values.password,
        city: values.city,
        state: values.state,
        zip: values.zip,
        description: "",
        image: "",
        rolId: 8,
      };

      setSubmitting(true);
      // Make the API call
      const response = await fetch(baseUrl + "users/", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      // Parse the response to JSON
      const data = await response.json();
      if (response.ok) {
        navigate("/customerAfterRegister");
        setSubmitting(false);
      } else {
        // Set errors if the response is not successful
        setErrors({ submit: data.message });
        setSubmitting(false);
      }
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

  return (
    <div className="container mt-4 mb-5">
      <div className=" rounded shadow" style={{ backgroundColor: "#AED0FF" }}>
        <p className="py-2 fs-1 fw-bold text-center">Customer registration</p>
      </div>

      <div className="rounded shadow bg-white pb-4">
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            customeremail: "",
            password: "",
            reenterpassword: "",
            city: "",
            state: "",
            zip: "",

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
                  <div className="col-md-4 py-3">
                    <Form.Group
                      controlId="validationFormik101"
                      className="position-relative"
                    >
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        onBlur={handleBlur}
                        value={values.firstName}
                        onChange={handleChange}
                        isValid={touched.firstName && !errors.firstName}
                      />
                      <Form.Control.Feedback tooltip>
                        Looks good!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-4 py-3">
                    <Form.Group
                      controlId="validationFormik102"
                      className="position-relative"
                    >
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        onBlur={handleBlur}
                        value={values.lastName}
                        onChange={handleChange}
                        isValid={touched.lastName && !errors.lastName}
                      />

                      <Form.Control.Feedback tooltip>
                        Looks good!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-4 py-3">
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
                          onBlur={handleBlur}
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
                      <Form.Label>Customer Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Your Email"
                        name="customeremail"
                        value={values.customeremail}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={!!errors.customeremail}
                      />

                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.customeremail}
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
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={!!errors.reenterpassword}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.reenterpassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-6 py-3">
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
                        onBlur={handleBlur}
                        isInvalid={!!errors.city}
                      />

                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-3 py-3">
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={!!errors.state}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-3 py-3">
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={!!errors.zip}
                      />

                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.zip}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-7 py-3">
                    <Form.Group className="position-relative mb-3">
                      <Form.Check
                        required
                        name="terms"
                        label="Agree to terms and conditions"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.terms}
                        feedback={errors.terms}
                        feedbackType="invalid"
                        id="validationFormik106"
                        feedbackTooltip
                      />
                    </Form.Group>
                  </div>

                  <Row>
                    <Button type="submit" className="fw-bold col-4">
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

export default CustomerSignUp;
