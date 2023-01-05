import Logo from "./Logo";
import "./LogoCss.css";

const Navbar = () => {
  return (
    <div className=" bg-primary">
      <div className="container">
        <div className="d-flex justify-content-between ">
          <div>
            <Logo fill="white" />
          </div>
          <div className="align-self-center">
            <button className="btn btn-light mx-2 fs-5">SignIn</button>
            <button className="btn btn-light fs-5">SignUp</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
