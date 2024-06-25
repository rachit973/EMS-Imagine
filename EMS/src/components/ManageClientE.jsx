import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/ManageClient.css"; // Import custom CSS for styling

function ManageClientE() {
  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("isLoggedIn");

    // Fetch clients from the backend
    axios
      .get("https://ems-imagine.onrender.com/clients")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredClients = clients.filter(
    (client) => filter === "" || client.clientType === filter
  );

  return (
    <>
      <div id="manage-client-container">
        <div className="button-container">
          <Link to="/homee/addcliente" className="manage-button">
            <i className="bi bi-person-plus-fill"></i>
            Add Clients
          </Link>
        </div>
        <br />

        <h2 className="text-center">CLIENT LIST</h2>
        <br />

        <div className="card">
          <div className="card-body">
            <div className="form-group d-flex align-items-center">
              <label htmlFor="clientTypeFilter" className="mr-2">
                Client Type:
              </label>
              <select
                id="clientTypeFilter"
                value={filter}
                onChange={handleFilterChange}
                className="form-control w-auto"
              >
                <option value="">All</option>
                <option value="Retail">Retail</option>
                <option value="Commercial">Commercial</option>
                <option value="Government">Government</option>
              </select>
            </div>
          </div>
        </div>
        <br />

        <div className="table-container">
          <table className="table table-bordered client-table">
            <thead>
              <tr>
                <th>#</th>
                <th>UID</th>
                <th>Name</th>
                <th>Client Type</th>
                <th>Phone</th>                
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <tr key={client.uid}>
                  <td>{index + 1}</td>
                  <td>{client.uid}</td>
                  <td>{client.name}</td>
                  <td>{client.clientType}</td>
                  <td>{client.phone}</td>
                  <td>
                        <Link to={`/homee/editcliente/${client.uid}`} className="btn btn-primary btn-sm">View</Link>
                      </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ManageClientE;
