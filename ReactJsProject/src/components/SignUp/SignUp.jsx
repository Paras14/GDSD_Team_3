import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  restaurentname: Yup.string().required(),
  managername: Yup.string().required(),
  username: Yup.string().required(),
  managermail: Yup.string().required(),
  password: Yup.string().required(),
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
  telefonenumber: Yup.string().required(),
  file: Yup.mixed().required(),
  restaurenttype: Yup.mixed().required(),
  terms: Yup.bool().required().oneOf([true], "terms must be accepted"),
});

function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      // Make the API call
      const response = await fetch("http://localhost:8080/users/", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      // Parse the response to JSON
      const data = await response.json();
      if (response.ok) {
        navigate("/restaurentRegistration");
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
    <Container>
      <h1 className="text-center my-4 py-4  text-uppercase">
        Register YourSelf As a Restaurent!
      </h1>
      <Formik
        method="POST"
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          restaurentname: "Chinese Restaurent",
          managername: "Ali",
          username: "",
          managermail: "",
          password: "",
          reenterpassword: "",
          city: "",
          state: "",
          zip: "",
          telefonenumber: "",
          file: null,
          restaurenttype: "",
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
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="4"
                controlId="validationFormik101"
                className="position-relative"
              >
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="restaurentname"
                  value={values.restaurentname}
                  onChange={handleChange}
                  isValid={touched.restaurentname && !errors.restaurentname}
                />
                <Form.Control.Feedback tooltip>
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                controlId="validationFormik102"
                className="position-relative"
              >
                <Form.Label>Manager Name</Form.Label>
                <Form.Control
                  type="text"
                  name="managername"
                  value={values.managername}
                  onChange={handleChange}
                  isValid={touched.managername && !errors.managername}
                />

                <Form.Control.Feedback tooltip>
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
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
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="4"
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
              <Form.Group
                as={Col}
                md="4"
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
              <Form.Group
                as={Col}
                md="4"
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
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="6"
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
              <Form.Group
                as={Col}
                md="6"
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
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="4"
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
              <Form.Group
                as={Col}
                md="4"
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

              <Form.Group
                as={Col}
                md="4"
                controlId="validationFormik105"
                className="position-relative"
              >
                <Form.Label>Restaurant Type</Form.Label>
                {
                  <Form.Control
                    type="text"
                    placeholder="Enter Restaurent Type"
                    name="restaurenttype"
                    value={values.restaurenttype}
                    onChange={handleChange}
                    isInvalid={!!errors.restaurenttype}
                  />
                }

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.restaurenttype}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>File</Form.Label>
              <Form.Control
                type="file"
                required
                name="file"
                onChange={handleChange}
                isInvalid={!!errors.file}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.file}
              </Form.Control.Feedback>
            </Form.Group>
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

            <Button
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
            >
              Submit form
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default SignUp;
