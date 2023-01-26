import React from "react";
import { Container } from "react-bootstrap";
import ReviewCheckBox from "./ReviewCheckBox2";

function AddEditReview() {
  return (
    <Container className="mt-4 mb-4">
      <div>
        <h1 className="text-uppercase fs-1 text-uppercase text-center"> Review/Edit Review</h1>
      </div>
      <div className="col-lg-10 mt-4">
        <div className="text-center mb-4 p-4">
            How many stars would you like to give?&emsp;
            <input type="text" name="rating" id="rating"></input>⭐
        </div>
        <div className="text-center">
            What drove your decision?
        </div>
        <ReviewCheckBox />
        <div className="text-center mt-4">
            Other <textarea id="comments" name="comments" cols={20}>
          </textarea>
        </div>
        {/* <div className="col-lg-6">
            Quick Service <input type="checkbox" name="quickService" id="quickService"></input>
            Delicious Food <input type="checkbox" name="deliciousFood" id="deliciousFood"></input> <br />
            Polite Behavior <input type="checkbox" name="politebehaviour" id="politebehaviour"></input>
            Value For Money <input type="checkbox" name="valueForMoney" id="valueForMoney"></input><br />
            Other <textarea id="comments" name="comments" cols={80}>
            If any
          </textarea>
        </div> */}

      </div>
    </Container>
  );
}

export default AddEditReview;
