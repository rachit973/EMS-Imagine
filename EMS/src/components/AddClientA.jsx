import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddClientA = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uid: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    locationLink: "",
    clientType: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://ems-imagine.onrender.com/addclient", formData)
      .then(response => {
        console.log(response.data);
        alert("Client added successfully");
        setFormData({
          uid: "",
          password: "",
          name: "",
          phone: "",
          address: "",
          locationLink: "",
          clientType: ""
        });
        navigate("/homea/manageclienta");
      })
      .catch(error => {
        console.error("Error adding client:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center">
              <h2>ADD NEW CLIENT</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="uid">Client Unique Id:</label>
                  <input
                    type="text"
                    id="uid"
                    name="uid"
                    value={formData.uid}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="clientType">Client Type:</label>
                  <select
                    id="clientType"
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="" disabled>Select Client Type</option>
                    <option value="Retail">Retail</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Government">Government</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="address">Address:</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="locationLink">Google Map Location Link:</label>
                  <input
                    type="url"
                    id="locationLink"
                    name="locationLink"
                    value={formData.locationLink}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary">Add Client</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientA;
