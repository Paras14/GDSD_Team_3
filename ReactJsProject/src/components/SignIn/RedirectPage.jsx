import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "../HomePage/navbarIndex.css";
import Logo from "../HomePage/Logo";
import { Button } from "react-bootstrap";
import { isAuthorized } from "../../helpers/isAuthorized";
import { useState } from "react";
import { useEffect } from "react";

const RedirectPage = () => {
  const isauthorized = isAuthorized();
  const [user, setUser] = useState(null);

  const element = <FontAwesomeIcon icon={faUser} />;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isauthorized) {
      navigate("/signIn");
    } else {
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

          <div className="align-self-center d-flex text-light">
            <p className="fs-4"> {element}</p>
            <p className="ms-2 fs-4">{ user !== null ? user.username : "User" }</p>
            <button
              className="btn btn-light ms-4 fw-light text-uppercase"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectPage;
