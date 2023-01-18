import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/HomePage/Navbar";
import Cards from "./components/HomePage/Cards";
// import SearchBar from "./components/HomePage/SearchBar";
import ErrorPage from "./components/ErrorPage";
import RestaurentDetails from "./components/HomePage/RestaurentDetails/RestaurentDetails";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import UserType from "./components/SignUp/UserType";
import CustomerSignUp from "./components/SignUp/CustomerSignUp";
import RestaurentRegistration from "./components/SignUp/RestaurentRegistration";
import AdminPanel from "./components/Admin/AdminPanel";
import AdminPanelNavbar from "./components/Admin/AdminPanelNavbar";
import PendingRestaurentReg from "./components/Admin/PendingRestaurentReg";
import PendingRestaurentForm from "./components/Admin/PendingRestaurentForm";
import ListOfUsers from "./components/Admin/ListOfUsers";
import PendingReviews from "./components/Admin/PendingReviews";
import PendingReviewPost from "./components/Admin/PostReviews/PendingReviewPost";
import ReviewCheckBox from "./components/Admin/PostReviews/ReviewCheckBox";
import ListOfRestaurants from "./components/Admin/ListOfRestaurants";
import { Chat } from "./components/Chat/Chat";
import CustomerAfterRegister from "./components/SignUp/CustomerAfterRegister";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar />
                {/* <SearchBar /> */}
                <Cards />
              </div>
            }
          />
          <Route path="/restaurentDetails" element={<RestaurentDetails />} />
          <Route
            path="/signIn"
            element={
              <div>
                <Navbar />
                <SignIn />
              </div>
            }
          />
          <Route
            path="/signUp"
            element={
              <div>
                <Navbar />
                <SignUp />
              </div>
            }
          />
          <Route
            path="/userType"
            element={
              <div>
                <Navbar />
                <UserType />
              </div>
            }
          />
          <Route
            path="/customerSignUp"
            element={
              <div>
                <Navbar />
                <CustomerSignUp />
              </div>
            }
          />
          <Route
            path="/restaurentRegistration"
            element={
              <div>
                <Navbar />
                <RestaurentRegistration />
              </div>
            }
          />
          <Route
            path="/adminPanel"
            element={
              <div>
                <AdminPanelNavbar />
                <AdminPanel />
              </div>
            }
          />
          <Route
            path="/pendingRestaurentRegistration"
            element={
              <div>
                <AdminPanelNavbar />
                <PendingRestaurentReg />
              </div>
            }
          />
          <Route
            path="/pendingRestaurentForm"
            element={
              <div>
                <AdminPanelNavbar />
                <PendingRestaurentForm />
              </div>
            }
          />
          <Route
            path="/ListOfUsers"
            element={
              <div>
                <AdminPanelNavbar />
                <ListOfUsers />
              </div>
            }
          />
          <Route
            path="/PendingReviews"
            element={
              <div>
                <AdminPanelNavbar />
                <PendingReviews />
              </div>
            }
          />
          <Route
            path="/PendingReviewPost"
            element={
              <div>
                <AdminPanelNavbar />
                <PendingReviewPost />
              </div>
            }
          />
          <Route
            path="/ReviewCheckBox"
            element={
              <div>
                <AdminPanelNavbar />
                <ReviewCheckBox />
              </div>
            }
          />
          <Route
            path="/listOfUsers"
            element={
              <div>
                <AdminPanel />
                <ListOfUsers />
              </div>
            }
          />
          <Route
            path="/ListOfRestaurants"
            element={
              <div>
                <AdminPanelNavbar />
                <ListOfRestaurants />
              </div>
            }
          />
          <Route
            path="/chat"
            element={
              <div>
                <Navbar />
                <Chat />
              </div>
            }
          />
          <Route
            path="/chat/:receptorActual"
            element={
              <div>
                <Navbar />
                <Chat />
              </div>
            }
          />
          <Route
            path="/customerAfterRegister"
            element={
              <div>
                <Navbar />
                <CustomerAfterRegister />
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
