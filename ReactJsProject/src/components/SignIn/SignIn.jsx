import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),

  terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
});

function SignIn() {
  const navigate = useNavigate();
  return (
    <Container>
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{
          email: "senoman.ali7383@gmail.com",
          password: "",
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
            <Form className="mb-3">
              <h1 className="text-center my-y py-4">Please Login Here!</h1>
              <Form.Group as={Col} md="12" controlId="validationFormik01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationFormik01">
                <Form.Label>Enter your Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" className="mt-4">
                Submit form
              </Button>
              <p className="text-end">
                <span>Yet not Register?</span>
                <Button
                  onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  Register
                </Button>
              </p>
            </Form>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default SignIn;
