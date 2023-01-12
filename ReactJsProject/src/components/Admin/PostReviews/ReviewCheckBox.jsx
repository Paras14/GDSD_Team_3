import { Container, Row, Button } from "react-bootstrap";

function ReviewCheckBox() {
  return (
    <Container>
      <Row className="d-flex text-center">
        <div md="6" className="mt-4">
          <input type="checkbox" className="mx-2" checked />
          <label>Quick Service</label>
        </div>
        <div md="6" className="mt-4">
          <input type="checkbox" className="mx-2" checked />
          <label>Delicious Food</label>
        </div>
        <div md="6" className="mt-4">
          <input type="checkbox" className="mx-2" checked />
          <label>Polite Behaviour</label>
        </div>
        <div md="6" className="mt-4">
          <input type="checkbox" className="mx-2" />
          <label>Value For Money</label>
        </div>
      </Row>
      <Row className="mt-4">
        <Button className="mb-3">Accept</Button>
        <Button>Decline</Button>
      </Row>
    </Container>
  );
}

export default ReviewCheckBox;
