import { Container, Form, Button } from "react-bootstrap";
const SearchBar = () => {
  return (
    <Container>
      <Form.Group
        className="mb-3 d-flex justify-content-center mt-4"
        controlId="formBasicEmail"
      >
        <Form.Control
          type="text"
          placeholder="Search There"
          size="lg"
          className="mx-4"
        />
        <Button variant="primary" size="lg">
          Search
        </Button>
      </Form.Group>
    </Container>
  );
};

export default SearchBar;
