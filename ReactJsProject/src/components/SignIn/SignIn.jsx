import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import axios from "axios";
import { Global } from "../../helpers/Global.js";

function SignIn() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseUrl = Global.baseUrl;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    axios
      .post(baseUrl + "users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.message === "Login successful") {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("useremail", email);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/");
          setMessage("You are successfully registered");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <h1 className="text-center my-4 py-4">Please Login Here!</h1>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleEmailChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <div className="my-4">
            <p className="text-end">
              <span className="mx-2">Yet not Register?</span>
              <Button
                onClick={() => {
                  navigate("/userType");
                }}
              >
                Register
              </Button>
            </p>
          </div>
        </Row>
      </Form>
      {message !== "" && <div>{message}</div>}
    </Container>
  );
}

export default SignIn;
