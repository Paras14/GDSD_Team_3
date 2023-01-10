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
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
