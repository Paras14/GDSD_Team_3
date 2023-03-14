import { Container, Row, Button } from "react-bootstrap";

function ReviewCheckBox(props) {
  return (
    <Container>
      <Row className="d-flex text-center">
        <div md="6" className="mt-4">
          <input type="checkbox" className="mx-2 quick-service-bool" checked={props.quickService} 
            onChange = {//Hassan; This code can be briefly explain - Rejected
              () => props.setQuickService(!props.quickService)
            }
          />
          <label>Quick Service</label>
        </div>
        <div md="6" className="mt-4">
          <input type="checkbox" className="mx-2 delicious-food-bool" checked={props.deliciousFood}
            onChange = {
              () => props.setDeliciousFood(!props.deliciousFood)
            }
          />
          <label>Delicious Food</label>
        </div>
        <div md="6" className="mt-4">
          <input type="checkbox" className="mx-2 polite-behaviour-bool" checked={props.politeBehavior}
            onChange = {
              () => props.setPoliteBehavior(!props.politeBehavior)
            }
          />
          <label>Polite Behaviour</label>
        </div>
        <div md="6" className="mt-4">
          <input type="checkbox" className="mx-2 value-for-money" checked={props.valueForMoney}
            onChange = {
              () => props.setValueForMoney(!props.valueForMoney)
            }
          />
          <label>Value For Money</label>
        </div>
        <div className="text-center">What drove your decision?</div>
        <div className="text-center mt-4">
            Other <textarea id="comments" name="comments" cols={20} value={props.other}
            onChange={
              (e) => props.setOther(e.target.value)
            }>
          </textarea>
        </div>
      </Row>
    </Container>
  );
}

export default ReviewCheckBox;
