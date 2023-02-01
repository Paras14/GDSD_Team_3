import React from "react";
import { Container } from "react-bootstrap";
import Logo from "./../HomePage/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { isAuthorized } from "../../helpers/isAuthorized";
import { useState, useEffect } from "react";

function AdminPanelNavbar() {
  const navigate = useNavigate();
  const element = <FontAwesomeIcon icon={faUser} />;
  const isauthorized = isAuthorized();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isauthorized) {
      console.log("isauthorized");
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <div className=" bg-primary ">
      <Container>
        <div className="d-flex justify-content-between ">
          <div
          onClick={() => {
                        navigate("/adminPanel");
                    }}
          >
            <Logo fill="white" />
          </div>

          <div className="align-self-center">
            <p className="text-light fs-3">Admin Panel</p>
          </div>
          <div className="align-self-center d-flex text-light">
          </div>  
          { user !== null 
              ? 
              <div className="align-self-center d-flex text-light">

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
              :
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
            }
        </div>
      </Container>
    </div>
  );
}

export default AdminPanelNavbar;
