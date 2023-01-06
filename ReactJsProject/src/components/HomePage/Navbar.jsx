import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className=" bg-primary">
      <div className="container">
        <div className="d-flex justify-content-between ">
          <div>
            <Logo fill="white" />
          </div>
          <div className="align-self-center">
            <SignIn />

            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
