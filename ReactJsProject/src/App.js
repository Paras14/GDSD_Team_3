import "./App.css";
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
import PendingRestaurantReg from "./components/Admin/PendingRestaurantReg";
import PendingRestaurantForm from "./components/Admin/PendingRestaurantForm";
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
import EditReservationDetails from "./components/HomePage/Reservation/EditReservationDetails";
import { DeviceSsd } from "react-bootstrap-icons";
import { Manager } from "socket.io-client";
import ManagerPanel from "./components/Manager/ManagerPanel";
import ManagerPanelNavbar from "./components/Manager/ManagerPanelNavbar";
import TableReservation from "./components/Manager/TableReservations";
import GuestReservationList from "./components/Manager/GuestReservationList";
import OtherProfile from "./components/profile/OtherUserProfile";
import CreateFood from "./components/CreateFood";
import EditRestaurantDetails from "./components/EditRestaurantDetails";
import WaiterNavbar from "./components/Waiter/WaiterNavbar";
import OrderList from "./components/Waiter/OrderList";
import WaiterRegister from "./components/Manager/WaiterRegister";
import TableMap from "./components/Manager/TableMap";
import WaiterPanel from "./components/Waiter/WaiterPanel";

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
                <Navbar />
                <AdminPanel />
                <Footer />
              </div>
            }
          />
          <Route
            path="/pendingRestaurantRegistration"
            element={
              <div>
                <Navbar />
                <PendingRestaurantReg />
                <Footer />
              </div>
            }
          />
          <Route
            path="/pendingRestaurantForm/:restaurantId"
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
                <Reservations />
                <Footer />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div>
                <Navbar />
                <AboutComponent />
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
            path="/AddReview/:restaurantId"
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
          <Route
            path="/EditReservation/:reservationId"
            element={
              <div>
                <Navbar />
                <EditReservationDetails />
                <Footer />
              </div>
            }
          />
          <Route
            path="/managerPanel"
            element={
              <div>
                <Navbar />
                <ManagerPanel />
                <Footer />
              </div>
            }
          />
          <Route
            path="/guestReservationList"
            element={
              <div>
                <Navbar />
                <GuestReservationList />
                <Footer />
              </div>
            }
          />
          <Route
            path="/tableReservations"
            element={
              <div>
                <Navbar />
                <TableReservation />
                <Footer />
              </div>
            }
          />
          <Route
            path="/otherProfile/:userId"
            element={
              <div>
                <Navbar />
                <OtherProfile />
                <Footer />
              </div>
            }
          />
          <Route
            path="/createFood/:restaurantId"
            element={
              <div>
                <Navbar />
                <CreateFood />
                <Footer />
              </div>
            }
          />
          <Route
            path="/EditRestaurantDetails/:restaurantId"
            element={
              <div>
                <Navbar />
                <EditRestaurantDetails />
                <Footer />
              </div>
            }
          />
          <Route
            path="/WaiterPanel"
            element={
              <div>
                <WaiterNavbar />
                <WaiterPanel />
              </div>
            }
          />
          <Route
            path="/WaiterReservationList"
            element={
              <div>
                <WaiterNavbar />
                <GuestReservationList />
              </div>
            }
          />
          <Route
            path="/WaiterOrder/:id"
            element={
              <div>
                <WaiterNavbar />
                <OrderList />
              </div>
            }
          />

          <Route
            path="/WaiterRegister/:restaurantId"
            element={
              <div>
                <Navbar />
                <WaiterRegister />
                <Footer />
              </div>
            }
          />

          <Route
            path="/TableMap"
            element={
              <div>
                <Navbar />
                <TableMap />
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
