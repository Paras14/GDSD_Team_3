import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RestaurantDetails = () => {
  const navigate = useNavigate();
  return (
    <Container className="mb-4">
      <div>
        <span className="fs-1 text-uppercase border-bottom border-4 border-primary ">
          our Concept
        </span>
        <h6 className="my-4">
          The restaurant is located in the quiet streets of the historic old
          town of Fulda. A special experience: The cozy restaurant, in summer
          with a wonderful street terrace, friendly staff and delicious dishes
          from regional and Mediterranean cuisine.
        </h6>
        <p>
          Our restaurant was opened in 1981 as a "Dachsbau" grill restaurant
          with bistro. In 1987 it was changed into a specialty restaurant with
          70 seats, a small, cozy bistro with approx. 15 seats and, in summer, a
          terrace café with 60 seats. In 2000 the name was changed from
          "Dachsbau" to "Alte Pfandhausstube" and in November 2014 to today's
          "Breuers Restaurant & Weinstube". Our popular specialties include: the
          classic, traditional, cooked breast of ox with Hessian green sauce,
          fresh market vegetables and steaming parsley potatoes. Or for the meat
          lover: rump steak or the delicious sliced ​​veal liver with apples,
          onions and herb butter with salad and fried potatoes. Alternatively,
          fresh fish: from Rhön trout to monkfish, prepared in a Mediterranean
          style, is always a pleasure.
        </p>

        <ul>
          <p>
            Our varied menu is supplemented monthly with seasonal dishes such as
            asparagus, mushrooms, game, geese, fish and fresh salads.
            Furthermore, our restaurant is characterized by:
          </p>
          <li>cozy interior</li>
          <li>seasonal fresh cuisine</li>
          <li>seasonal menus</li>
          <li>Inexpensive lunch menus that change daily</li>
          <li>Menu tasting</li>
          <li>Wines to go with the kitchen</li>
        </ul>

        <div>
          <span className="border-bottom border-4 border-primary fs-4 mb-4">
            Specialities:
          </span>
          <ol className="mt-4">
            <li>Our premises are also suitable for larger celebrations.</li>
            <li>
              It's worth a visit! If only because of the extensive white and red
              wine menu at reasonable prices.
            </li>
            <li>
              The good Fulda "Hochstift beer" is served in the bar in the
              restaurant
            </li>
            <li>
              But you can also enjoy our specialties outside of our guest rooms.
              We offer you a professional party service suitable for every
              occasion from company parties to family celebrations and
              anniversaries - also with our high-quality seasonal offer.
            </li>
          </ol>
          <h4>We are looking forward to your visit</h4>
          <h6>Your team from Breuers Restaurant & Weinstube</h6>
        </div>
      </div>
      <div className="bg-light mt-4 p-4 fs-3 fw-bold ">
        <p>
          <span className="border-bottom border-4 border-primary pe-2">
            OUR
          </span>
          CURRENT LUNCH MENU
        </p>
        <span className="fs-5">APPETIZERS</span>
        <div className="fs-6">House cocktail</div>
        <p>
          <span className="fs-6 italic">ROSATO RAMAZZOTTI</span>
          <ul className="fs-6">
            <li>Sparkling wine</li>
            <li>tonic water</li>
            <li>rosato</li>
            <li> iced raspberries 5.50</li>
          </ul>
        </p>
        <Button
          size="lg"
          className="text-center"
          onClick={() => {
            navigate("/signIn");
          }}
        >
          Book Now
        </Button>
      </div>
      <Button
        className="position-fixed top-50 start-1 translate-middle"
        variant="primary"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Restaurent list
      </Button>
    </Container>
  );
};
export default RestaurantDetails;
