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

  const customerRole = 8; // 8 is for customer
  const adminRole = 7; // 7 is for admin
  const managerRole = 9; // 9 is for manager
  const waiterRole = 10; // 10 is for waiter

  const element = <FontAwesomeIcon icon={faUser} />;

  const navigate = useNavigate();

  useEffect(() => {
    // Get user from local storage
    if (isauthorized) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    user !== null // if user is logged in 
      ?
        <div className=" bg-primary ">
          <div className="container ">
            <div className="d-flex justify-content-between ">
              <div
                onClick={() => {
                  if (user.rolId === customerRole) { 
                    navigate("/");
                  } else if (user.rolId === adminRole) { 
                    navigate("/adminPanel");
                  } else if (user.rolId === managerRole){ 
                    navigate("/managerPanel");
                  } else if (user.rolId === waiterRole){ 
                    navigate("/WaiterPanel");
                  }
                  
                }}
              >
                <Logo fill="white" />
              </div>
            
              {user.rolId === adminRole ? 
                <div className="align-self-center">
                  <p className="text-light fs-3">Admin Panel</p>
                </div>
                :
                  null}

              {user.rolId === managerRole ? 
                <div className="align-self-center">
                  <p className="text-light fs-3">Manager Panel</p>
                </div>
                
                :
                  null}  

              {user.rolId === waiterRole ? 
                <div className="align-self-center">
                  <p className="text-light fs-3">Waiter Panel</p>
                </div>

                :
                  null}
                  
             
              <div className="align-self-center d-flex text-light">

                {user.rolId === customerRole ? 
                
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
                 }}>{element}<span className="ps-2">{ user !== null ? user.username : "User"}</span>
                </button>
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
        : // if user is not logged in
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
