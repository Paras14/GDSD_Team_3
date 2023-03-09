import React, { useState } from "react";
import { useEffect } from "react";

const ProfileComponent = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="container mt-4 mb-5">
      <div className=" rounded shadow" style={{ backgroundColor: "#AED0FF" }}>
        <p className="py-2 fs-1 fw-bold text-center">
          @{user.username} profile
        </p>
      </div>

      <div className="rounded shadow bg-white pb-4">
        <div className="row px-5 mx-5">
          <div className="col-md-4 pt-5">
            <div class="card">
              <div class="card-header fw-bold">First name</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{user.firstname}</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 pt-5">
            <div class="card">
              <div class="card-header fw-bold">Last name</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{user.lastname}</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 pt-5">
            <div class="card">
              <div class="card-header fw-bold">Username</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">@{user.username}</li>
              </ul>
            </div>
          </div>

          <div className="col-md-4 pt-5">
            <div class="card">
              <div class="card-header fw-bold">User id</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{user.id}</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 pt-5">
            <div class="card">
              <div class="card-header fw-bold">Email</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{user.email}</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 pt-5">
            <div class="card">
              <div class="card-header fw-bold">Password</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">******</li>
              </ul>
            </div>
          </div>

          <div className="col-md-6 pt-5">
            <div class="card">
              <div class="card-header fw-bold">City</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{user.city}</li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 pt-5">
            <div class="card">
              <div class="card-header fw-bold">State</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{user.state}</li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 pb-5 pt-5">
            <div class="card">
              <div class="card-header fw-bold">Zip Code</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{user.zip}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default ProfileComponent;
