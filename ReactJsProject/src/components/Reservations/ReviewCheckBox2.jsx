import { Container, Row, Button } from "react-bootstrap";

function ReviewCheckBox() {
  return (
    <Container>
      <Row className="d-flex text-center">
        <div md="6" className="mt-4">
          <input type="checkbox" className="mx-2 quick-service-bool" checked />
          <label>Quick Service</label>
          {/* {props.quickService = document.querySelector('.quick-service-bool').checked} */}
        </div>
        <div md="6" className="mt-4">
          <input type="checkbox" className="mx-2 delicious-food-bool" checked />
          <label>Delicious Food</label>
          {/* {props.deliciousFood = document.querySelector('.delicious-food').checked} */}
        </div>
        <div md="6" className="mt-4">
          <input type="checkbox" className="mx-2 polite-behaviour-bool" checked />
          <label>Polite Behaviour</label>
          {/* {props.politeBehavior = document.querySelector('.polite-behaviour-bool').checked} */}
        </div>
        <div md="6" className="mt-4">
          <input type="checkbox" className="mx-2 value-for-money" />
          <label>Value For Money</label>
          {/* {props.valueForMoney = document.querySelector('.value-for-money').checked} */}
        </div>
      </Row>
    </Container>
  );
}

export default ReviewCheckBox;
