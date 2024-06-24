import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/LeaveApp.css';

function LeaveApplicationE() {
  const [leaves, setLeaves] = useState([]);
  const userId = localStorage.getItem("uid"); // Assuming you store the user ID in local storage

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`https://ems-imagine.onrender.com/leaves/${userId}`);
        setLeaves(response.data);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
      }
    };

    fetchLeaves();
  }, [userId]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this leave application?");
    if (confirmDelete) {
    try {
      await axios.delete(`http://localhost:8001/leaves/${id}`);
      // Update the state to remove the deleted leave application
      setLeaves(leaves.filter(leave => leave._id !== id));
    } catch (error) {
      console.error("Error deleting leave application:", error);
    }}
  };

  return (
    <div className="container">
      <h2 className="heading">LEAVE APPLICATIONS</h2>
      
      {leaves.length > 0 ? (
        <table className="leave-table">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.leaveType}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(leave._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center"><br />No leave applications found.</p>
      )}
    </div>
  );
}

export default LeaveApplicationE;
