import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "../HomePage/navbarIndex.css";
import Logo from "./Logo";
import { isAuthorized } from "../../helpers/isAuthorized";
import { useState, useEffect } from "react";

const Navbar = () => {
  const isauthorized = isAuthorized();
  const [user, setUser] = useState(null);

  const element = <FontAwesomeIcon icon={faUser} />;

  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect");
    if (isauthorized) {
      console.log("isauthorized");
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

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
            
            { user !== null 
              ? 
              <div className="align-self-center d-flex text-light">
              <p className="fs-4"> {element}</p>
            <p className="ms-2 fs-4">{ user !== null ? user.username : "User" }</p>
            <button
              className="btn btn-light ms-4 fw-light text-uppercase"
              onClick={() => {
                localStorage.clear();
                navigate("/");
                window.location.reload();
              }}
            >
              Logout
            </button>
            </div>
              :
              <div className="align-self-center">
              <button
              className="btn btn-light mx-2"
              onClick={() => {
                navigate("/signIn");
              }}
            >
              Log in
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
            }
            
        </div>
      </div>
    </div>
  );
};

export default Navbar;
