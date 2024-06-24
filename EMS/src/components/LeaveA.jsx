import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LeaveA = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("Pending");

  const currentUser = window.localStorage.getItem("uid");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("https://ems-imagine.onrender.com/leaves");
        setLeaves(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:8001/leaves/${id}/status`, { status });
      setLeaves(leaves.map(leave => leave._id === id ? { ...leave, status } : leave));
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  const handleSendToSecondLevel = async (id) => {
    try {
      await axios.patch(`http://localhost:8001/leaves/${id}/status`, { status: "SecondLevelPending" });
      setLeaves(leaves.map(leave => leave._id === id ? { ...leave, status: "SecondLevelPending" } : leave));
    } catch (error) {
      console.error("Error sending leave application to second level:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this leave application?");
    if (confirmDelete){
    try {
      await axios.delete(`http://localhost:8001/leaves/${id}`);
      setLeaves(leaves.filter(leave => leave._id !== id));
    } catch (error) {
      console.error("Error deleting leave:", error);
    }
  }
  };

  const filteredLeaves = leaves.filter(leave => {
    if (filter === "All") return true;
    if (filter === leave.status) return true;
    if (filter === "Pending" && currentUser === "A001" && leave.status === "Pending") return true;
    if (filter === "Pending" && currentUser === "A002" && leave.status === "SecondLevelPending") return true;
    return false;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tableContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  };

  const tableStyle = {
    fontSize: "0.875rem",
    width: '80%',
    borderCollapse: 'collapse',
  };

  const thStyles = {
    border: '1px solid #ddd',
    padding: '10px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center'
  };

  const tdStyles = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center'
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">LEAVE APPLICATIONS</h2>
      <div className="mb-4 text-center">
        <button className="btn btn-primary me-2" onClick={() => setFilter("Pending")}>Pending</button>
        <button className="btn btn-success me-2" onClick={() => setFilter("Approved")}>Approved</button>
        <button className="btn btn-danger me-2" onClick={() => setFilter("Rejected")}>Rejected</button>
        <button className="btn btn-secondary me-2" onClick={() => setFilter("SecondLevelPending")}>Second Level Pending</button>
        <button className="btn btn-info" onClick={() => setFilter("All")}>All</button>
      </div>
      <div style={tableContainerStyle}>
        {filteredLeaves.length > 0 ? (
          <table className="table table-bordered" style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyles}>UID</th>
                <th style={thStyles}>Name</th>
                <th style={thStyles}>Leave Type</th>
                <th style={thStyles}>Start Date</th>
                <th style={thStyles}>End Date</th>
                <th style={thStyles}>Reason</th>
                <th style={thStyles}>Status</th>
                <th style={thStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave) => (
                <tr key={leave._id}>
                  <td style={tdStyles}>{leave.uid}</td>
                  <td style={tdStyles}>{leave.name}</td>
                  <td style={tdStyles}>{leave.leaveType}</td>
                  <td style={tdStyles}>{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td style={tdStyles}>{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td style={tdStyles}>{leave.reason}</td>
                  <td style={tdStyles}>{leave.status}</td>
                  <td style={tdStyles}>
                    {leave.status === "Pending" && currentUser === "A001" && (
                      <>
                        <button className="btn btn-sm btn-success me-2" onClick={() => handleStatusChange(leave._id, "Approved")}>
                          Approve
                        </button>
                        <button className="btn btn-sm btn-danger me-2" onClick={() => handleStatusChange(leave._id, "Rejected")}>
                          Reject
                        </button>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => handleSendToSecondLevel(leave._id)}>
                          Send to Second Level
                        </button>
                      </>
                    )}
                    {leave.status === "SecondLevelPending" && currentUser === "A002" && (
                      <>
                        <button className="btn btn-sm btn-success me-2" onClick={() => handleStatusChange(leave._id, "Approved")}>
                          Approve
                        </button>
                        <button className="btn btn-sm btn-danger me-2" onClick={() => handleStatusChange(leave._id, "Rejected")}>
                          Reject
                        </button>
                      </>
                    )}
                    <button className="btn btn-sm btn-secondary" onClick={() => handleDelete(leave._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No leave applications found.</div>
        )}
      </div>
    </div>
  );
};

export default LeaveA;
