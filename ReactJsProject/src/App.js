import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/HomePage/Navbar";
import Cards from "./components/HomePage/Cards";
// import SearchBar from "./components/HomePage/SearchBar";
import ErrorPage from "./components/ErrorPage";
import RestaurantDetails from "./components/RestaurantDetails";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import UserType from "./components/SignUp/UserType";
import CustomerSignUp from "./components/SignUp/CustomerSignUp";
import RestaurentRegistration from "./components/SignUp/RestaurentRegistration";
import AdminPanel from "./components/Admin/AdminPanel";
import AdminPanelNavbar from "./components/Admin/AdminPanelNavbar";
import PendingRestaurentReg from "./components/Admin/PendingRestaurentReg";
import PendingRestaurantForm from "./components/Admin/PendingRestaurentForm";
import ListOfUsers from "./components/Admin/ListOfUsers";
import PendingReviews from "./components/Admin/PendingReviews";
import PendingReviewPost from "./components/Admin/PostReviews/PendingReviewPost";
import ReviewCheckBox from "./components/Admin/PostReviews/ReviewCheckBox";
import ListOfRestaurants from "./components/Admin/ListOfRestaurants";
import { Chat } from "./components/Chat/Chat";
import CustomerAfterRegister from "./components/SignUp/CustomerAfterRegister";
import RedirectPage from "./components/SignIn/RedirectPage";
import RestaurantUpperDetail from "./components/RestaurantUpperDetail";
import RestaurantTabDetails from "./components/RestaurantTabDetails";
import Footer from "./components/HomePage/Footer/Footer";
import ReservationDetails from "./components/HomePage/Reservation/ReservationDetails";
import TableSelection from "./components/HomePage/Reservation/TableSelection";
import FoodSelection from "./components/HomePage/Reservation/FoodSelection";
import ParkingSelection from "./components/HomePage/Reservation/ParkingSelection";
import ProfileComponent from "./components/profile/userprofile";
import Reservations from "./components/Reservations/Reservations";
import AddEditReview from "./components/Reservations/AddEditReview";
import AboutComponent from "./components/about/about";
import TestGetAllReservations from "./components/TestGetallReservations";

const App = () => {
  return (
    <div className="bg-light">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar />
                {/* <SearchBar /> */}
                <Cards />
                <Footer />
              </div>
            }
          />
          <Route path="/restaurantDetails" element={<RestaurantDetails />} />
          <Route
            path="/signIn"
            element={
              <div>
                <Navbar />
                <SignIn />
                <Footer />
              </div>
            }
          />
          <Route
            path="/signUp"
            element={
              <div>
                <Navbar />
                <SignUp />
                <Footer />
              </div>
            }
          />
          <Route
            path="/userType"
            element={
              <div>
                <Navbar />
                <UserType />
                <Footer />
              </div>
            }
          />
          <Route
            path="/customerSignUp"
            element={
              <div>
                <Navbar />
                <CustomerSignUp />
                <Footer />
              </div>
            }
          />
          <Route
            path="/restaurentRegistration"
            element={
              <div>
                <Navbar />
                <RestaurentRegistration />
                <Footer />
              </div>
            }
          />
          <Route
            path="/adminPanel"
            element={
              <div>
                <AdminPanelNavbar />
                <AdminPanel />
                <Footer />
              </div>
            }
          />
          <Route
            path="/pendingRestaurentRegistration"
            element={
              <div>
                <AdminPanelNavbar />
                <PendingRestaurentReg />
                <Footer />
              </div>
            }
          />
          <Route
            path="/pendingRestaurantForm"
            element={
              <div>
                <AdminPanelNavbar />
                <PendingRestaurantForm />
                <Footer />
              </div>
            }
          />
          <Route
            path="/ListOfUsers"
            element={
              <div>
                <AdminPanelNavbar />
                <ListOfUsers />
                <Footer />
              </div>
            }
          />
          <Route
            path="/PendingReviews"
            element={
              <div>
                <AdminPanelNavbar />
                <PendingReviews />
                <Footer />
              </div>
            }
          />
          <Route
            path="/PendingReviewPost"
            element={
              <div>
                <AdminPanelNavbar />
                <PendingReviewPost />
                <Footer />
              </div>
            }
          />
          <Route
            path="/ReviewCheckBox"
            element={
              <div>
                <AdminPanelNavbar />
                <ReviewCheckBox />
                <Footer />
              </div>
            }
          />
          <Route
            path="/listOfUsers"
            element={
              <div>
                <AdminPanel />
                <ListOfUsers />
                <Footer />
              </div>
            }
          />
          <Route
            path="/ListOfRestaurants"
            element={
              <div>
                <AdminPanelNavbar />
                <ListOfRestaurants />
                <Footer />
              </div>
            }
          />
          <Route
            path="/chat"
            element={
              <div>
                <Navbar />
                <Chat />
                <Footer />
              </div>
            }
          />
          <Route
            path="/chat/:receptorActual"
            element={
              <div>
                <Navbar />
                <Chat />
                <Footer />
              </div>
            }
          />
          <Route
            path="/customerAfterRegister"
            element={
              <div>
                <Navbar />
                <CustomerAfterRegister />
                <Footer />
              </div>
            }
          />
          <Route
            path="/redirectPage"
            element={
              <div>
                <RedirectPage />
                <Cards />
                <Footer />
              </div>
            }
          />
          <Route
            path="/RestaurantDetails/:restaurantId"
            element={
              <div>
                <Navbar />
                <RestaurantDetails />
                <Footer />
              </div>
            }
          />
          <Route
            path="/ReservationDetails/:restaurantId"
            element={
              <div>
                <Navbar />
                <ReservationDetails />
                <Footer />
              </div>
            }
          />
          <Route
            path="/TableSelection"
            element={
              <div>
                <Navbar />
                <TableSelection />
                <Footer />
              </div>
            }
          />
          <Route
            path="/FoodSelection"
            element={
              <div>
                <Navbar />
                <FoodSelection />
                <Footer />
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div>
                <Navbar />
                <ProfileComponent />
                <Footer />
              </div>
            }
          />
          <Route
            path="/reservations"
            element={
              <div>
                <Navbar />
                <Reservations/>
                <Footer />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div>
                <Navbar />
                <AboutComponent/>
                <Footer />
              </div>
            }
          />
          <Route
            path="/ParkingSelection"
            element={
              <div>
                <Navbar />
                <ParkingSelection />
                <Footer />
              </div>
            }
          />
          <Route
            path="/AddEditReview"
            element={
              <div>
                <Navbar />
                <AddEditReview />
                <Footer />
              </div>
            }
          />
          <Route
            path="/TestGetAllReservations/:reservationId"
            element={
              <div>
                <Navbar />
                <TestGetAllReservations />
                <Footer />
              </div>
            }
          />
          <Route path="*" element={<ErrorPage />} />
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;
