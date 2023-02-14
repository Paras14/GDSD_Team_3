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

          if (response.data.user.rolId === 8) {
            navigate("/");
          } else if (response.data.user.rolId === 7) {
            navigate("/adminPanel");
          } else if (response.data.user.rolId === 9){
            navigate("/managerPanel");
          } else if(response.data.user.rolId === 10){
            navigate("/WaiterPanel");
          }
          
          setMessage("You are successfully registered");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("ERROR: Invalid email or password");
      });
  };

  return (
    <div className="container mt-4">
      <div className=" rounded shadow" style={{backgroundColor : "#AED0FF"}}>
        <p className="py-2 fs-1 fw-bold text-center" >Log in</p>
      </div>

      <div className="rounded shadow bg-white">
        <div className="container">
          <br></br>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                {message !== "" && <div class="alert alert-danger" role="alert">{message}</div>}
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
              </div>
              <div className="col-3"></div>

              <div className="col-3"></div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
              </div>
              <div className="col-3"></div>


              <div className="col-3"></div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>
                <Button variant="primary" type="submit">
                  Log in
                </Button>
                <div className="my-4">
                  <p className="text-end">
                    <span className="mx-2">Not registered yet?</span>
                    <Button
                      onClick={() => {
                        navigate("/userType");
                      }}
                    >
                      Register
                    </Button>
            </p>
          </div>

              </div>
              <div className="col-3"></div>
            </div>
          </Form> 

        </div>
        
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default SignIn;
