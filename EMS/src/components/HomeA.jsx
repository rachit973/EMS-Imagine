import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "../styles/HomeC.css"; // Import your custom CSS

function HomeA() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      setUserId(uid);
    }
  }, []);

  const handleLogout = () => {
    axios.get("https://ems-imagine.onrender.com").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("uid");
        window.location.href = "/login"; // Redirect to login page
      }
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark sidebar d-none d-md-block">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
              <Link
                to="/homea"
                className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-orange text-decoration-none"
              >
                <span className="fs-5 fw-bolder d-none d-sm-inline">
                  {userId}
                </span>
              </Link>

              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="w-100">
                  <Link
                    to="/homea"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-person ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">Profile</span>
                  </Link>
                </li>

                <li className="w-100">
                  <Link
                    to="/homea/manageempa"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-people ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Manage Employees
                    </span>
                  </Link>
                </li>

                <li className="w-100">
                  <Link
                    to="/homea/manageclienta"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-people ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Manage Clients
                    </span>
                  </Link>
                </li>

                <li className="w-100">
                  <Link
                    to="/homea/manageinventorya"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-columns ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Manage Inventory
                    </span>
                  </Link>
                </li>

                <li className="w-100" onClick={handleLogout}>
                  <Link
                    to="/login"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-power ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline"> Logout </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center align-items-center shadow header">
              <img src="../Images/mainlogo.png" alt="Logo" className="logo" />
            </div>

            <div className="bg-dark navv-bar d-md-none">
              <ul className="nav nav-pills nav-fill text-white">
                <li className="nav-item">
                  <Link to="/homea" className="nav-link text-white">
                    <i className="bi bi-person"></i> Profile
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/homea/manageempa"
                    className="nav-link text-white"
                  >
                    <i className="bi bi-people"></i>
                    
                      Manage Employees
                    
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/homea/manageclienta"
                    className="nav-link text-white"
                  >
                    <i className="bi bi-people"></i>
                    
                      Manage Clients
                    
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link
                    to="/homea/manageinventorya"
                    className="nav-link text-white"
                  >
                    <i className="bi bi-columns"></i>
                    
                      Manage Inventory
                    
                  </Link>
                </li>
                <li className="nav-item" onClick={handleLogout}>
                  <Link to="/login" className="nav-link text-white">
                    <i className="bi bi-power"></i> Logout
                  </Link>
                </li>
              </ul>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeA;
