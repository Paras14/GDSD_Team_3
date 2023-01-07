import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function SignIn() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1 className="text-center my-4 py-4">Please Login Here!</h1>
      <Form>
        <Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
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
    </Container>
  );
}

export default SignIn;
