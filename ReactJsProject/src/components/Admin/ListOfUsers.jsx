import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Global } from '../../helpers/Global.js';


function ListOfUsers() {
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);
  const baseUrl = Global.baseUrl;
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email from local storage
    const email = localStorage.getItem("useremail");
    setEmail(email);
  }, []);

  useEffect(() => {
    if (email !== "") {
      axios
      .get(baseUrl+"users/", {params: {email: email}})
      .then((res) => {
        setPendingUsers(res.data);
        if (res.data.length === 0) {
          console.log("There is no users");
          setMessage(<p>There is no users</p>);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [email]);
  //   const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  // const pendingData = [
  //   { name: "User 1", email: "user1@gmail.com" },
  //   { name: "User 2", email: "user2@gmail.com" },
  //   { name: "User 3", email: "user3@gmail.com" },
  //   { name: "User 4", email: "user4@gmail.com" },
  //   { name: "User 5", email: "user5@gmail.com" },
  //   { name: "User 6", email: "user6@gmail.com" },
  //   { name: "User 4", email: "user4@gmail.com" },
  //   { name: "User 5", email: "user5@gmail.com" },
  //   { name: "User 6", email: "user6@gmail.com" },
  //   { name: "User 4", email: "user4@gmail.com" },
  //   { name: "User 5", email: "user5@gmail.com" },
  //   { name: "User 6", email: "user6@gmail.com" },
  //   { name: "User 4", email: "user4@gmail.com" },
  //   { name: "User 5", email: "user5@gmail.com" },
  //   { name: "User 6", email: "user6@gmail.com" },
  //   { name: "User 4", email: "user4@gmail.com" },
  //   { name: "User 5", email: "user5@gmail.com" },
  //   { name: "User 6", email: "user6@gmail.com" },
  //   { name: "User 4", email: "user4@gmail.com" },
  //   { name: "User 5", email: "user5@gmail.com" },
  //   { name: "User 6", email: "user6@gmail.com" },
  //   { name: "User 4", email: "user4@gmail.com" },
  //   { name: "User 5", email: "user5@gmail.com" },
  //   { name: "User 6", email: "user6@gmail.com" },
  //   { name: "User 4", email: "user4@gmail.com" },
  //   { name: "User 5", email: "user5@gmail.com" },
  //   { name: "User 6", email: "user6@gmail.com" },
  //   { name: "User 4", email: "user4@gmail.com" },
  //   { name: "User 5", email: "user5@gmail.com" },
  //   { name: "User 6", email: "user6@gmail.com" },
  // ];
  return (
    <Container>
      <div>
        <p className="text-uppercase text-center m-4 p-2 fs-1">List of Users</p>
        <div style={{ overflow: "scroll", maxHeight: "25rem" }}>
          {message}
          {pendingUsers.length !== 0 && pendingUsers.map((data) => {
            return (
              <div className="d-flex justify-content-between mb-2 p-3 m-2 bg-light rounded">
                <p className="fs-4 fw-bold">{data.name}</p>
                <p className="fs-4 fw-bold">{data.email}</p>
                <Button
                  onClick={() => {
                    // Ban user: delete user from database
                    axios
                      .delete(baseUrl+"users/" + data.id)
                      .then((res) => {
                        console.log(res);
                        console.log("User deleted");
                        // Reload page
                        window.location.reload();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    
                  }}
                >
                  Ban User
                </Button>
              </div>
            );
          })}
        </div>
        <div className="m-4 text-center">
          <Button
            onClick={() => {
              navigate("/adminPanel");
            }}
          >
            Back to Main Menu
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default ListOfUsers;
