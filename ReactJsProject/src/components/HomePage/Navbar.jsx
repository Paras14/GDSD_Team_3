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
    if (isauthorized) {
      console.log("isauthorized");
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    user !== null 
      ?
        <div className=" bg-primary ">
          <div className="container ">
            <div className="d-flex justify-content-between ">
              <div
                onClick={() => {
                  if (user.rolId === 8) {
                    navigate("/");
                  } else if (user.rolId === 7) {
                    navigate("/adminPanel");
                  }
                  
                }}
              >
                <Logo fill="white" />
              </div>
            
              {user.rolId === 7 ?
              <div className="align-self-center">
                <p className="text-light fs-3">Admin Panel</p>
              </div>
              :
                null}
             
              <div className="align-self-center d-flex text-light">

                {user.rolId === 8 ?
                
                <button
                className="btn btn-outline-light me-2"
                onClick={() => {
                  navigate("/reservations");
                }}
              >
                Reservations
              </button>
              :
              null
                }
                

                    <button class="btn btn-outline-light me-2" type="button" onClick={() => {
                      navigate("/profile");
                    }}>{element}<span className="ps-2">{ user !== null ? user.username : "User"}</span></button>
            <div className="bg-light rounded">
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </div>
              <a href="/about" className="btn btn-secondary ms-2">
                  About us
              </a>
            
            </div>
            </div>
            </div>
          </div>
              :
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
                  className="btn btn-outline-light mx-2"
                  onClick={() => {
                    navigate("/signIn");
                  }}
                >
                  Log in
                </button>
                <button
                  className="btn btn-light me-2"
                  onClick={() => {
                    navigate("/userType");
                  }}
                >
                  Register
                </button>
                <a href="/about" className="btn btn-secondary">
                  About us
                </a>
            </div>
            </div>
      </div>
    </div>
          
  );
};

export default Navbar;
