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
                  if (user.rolId === 8) { // 8 is for customer           //JESUS: With the sintax x?y:z this piece of code could be simpler // REMARK: Rejected, I don't think it's a good idea to use a ternary operator for this case. It could be more confusing than the current code.
                    navigate("/");
                  } else if (user.rolId === 7) { // 7 is for admin       //JESUS: those numbers could be defined in const variables. // REMARK: Accepted
                    navigate("/adminPanel");
                  } else if(user.rolId === 9){ // 9 is for manager
                    navigate("/managerPanel");
                  }
                  
                }}
              >
                <Logo fill="white" />
              </div>
            
              {user.rolId === 7 ? // 7 is for admin
                <div className="align-self-center">
                  <p className="text-light fs-3">Admin Panel</p>
                </div>
                :
                  null}

              {user.rolId === 9 ? // 9 is for manager
                <div className="align-self-center">
                  <p className="text-light fs-3">Manager Panel</p>
                </div>
                
                :
                  null}  
             
              <div className="align-self-center d-flex text-light">

                {user.rolId === 8 ? // 8 is for customer
                
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
                    onClick={() => { //JESUS: this button could be a simpler component. That would allow us tu use it in other places. // REMARK: Accepted
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
