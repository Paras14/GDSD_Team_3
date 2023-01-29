import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ListOfUsers() {
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://admin/petitions/review/all/")
      .then((res) => {
        setPendingUsers(res.data);
        if (res.data.name === "" && res.data.email === "") {
          return <p>There is no Users for review</p>;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
          {pendingUsers.map((data) => {
            return (
              <div className="d-flex justify-content-between mb-2 p-3 m-2 bg-light rounded">
                <p className="fs-4 fw-bold">{data.name}</p>
                <p className="fs-4 fw-bold">{data.email}</p>
                <Button
                  onClick={() => {
                    navigate("/");
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
