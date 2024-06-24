import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LeaveE.css"; // Import the CSS file

const LeaveE = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uid: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      setFormData((prevFormData) => ({ ...prevFormData, uid }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      uid: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ems-imagine.onrender.com/submit-leave",
        formData
      );
      alert("Form submitted successfully");
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2>LEAVE APPLICATION FORM</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="uid">Employee Unique Id:</label>
                  <input
                    type="text"
                    id="uid"
                    name="uid"
                    value={formData.uid}
                    onChange={handleChange}
                    required
                    readOnly
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="leaveType">Leave Type:</label>
                  <select
                    id="leaveType"
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="sick">Sick Leave</option>
                    <option value="vacation">Vacation Leave</option>
                    <option value="personal">Personal Leave</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="reason">Reason for Leave:</label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group text-center">
                  <button type="submit" className="btnlee btnlee-primary">
                    Submit
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <button
                  className="btnlee btnlee-success"
                  onClick={() => navigate("/homee/leaveapplication")}
                >
                  Leave Applications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveE;
