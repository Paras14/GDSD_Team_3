import { useNavigate } from "react-router-dom";

import "../HomePage/navbarIndex.css";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-primary ">
      <div className="container ">
        <div className="d-flex justify-content-between ">
          <div 
          onClick={() => {
                        navigate("/");
                    }}
          >
            <Logo fill="white" />
          </div>
          <div className="align-self-center">
            <button
              className="btn btn-light mx-2"
              onClick={() => {
                navigate("/signIn");
              }}
            >
              SignIn
            </button>
            <button
              className="btn btn-light"
              onClick={() => {
                navigate("/userType");
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
