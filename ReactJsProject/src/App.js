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
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/userType" element={<UserType />} />
          <Route path="/customerSignUp" element={<CustomerSignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
