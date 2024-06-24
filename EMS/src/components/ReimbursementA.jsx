import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ReimbursementA = () => {
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("Pending");

  const adminId = window.localStorage.getItem("uid");

  useEffect(() => {
    const fetchReimbursements = async () => {
      try {
        const response = await axios.get("https://ems-imagine.onrender.com/reimbursements");
        setReimbursements(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchReimbursements();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:8001/reimbursements/${id}/status`, { status });
      setReimbursements(reimbursements.map(reimbursement =>
        reimbursement._id === id ? { ...reimbursement, status } : reimbursement
      ));
    } catch (error) {
      console.error("Error updating reimbursement status:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this reimbursement application?");
    if (confirmDelete) {
    try {
      await axios.delete(`http://localhost:8001/reimbursement/${id}`);
      setReimbursements(reimbursements.filter(reimbursement => reimbursement._id !== id));
    } catch (error) {
      console.error("Error deleting reimbursement:", error);
    }}
  };

  const filteredReimbursements = reimbursements.filter(reimbursement => {
    if (filter === "All") return true;
    if (filter === reimbursement.status) return true;
    if (filter === "Pending" && adminId === "A001" && reimbursement.status === "Pending") return true;
    if (filter === "Pending" && adminId === "A002" && reimbursement.status === "Second Level Pending") return true;
    if (filter === "Pending" && adminId === "A003" && reimbursement.status === "Third Level Pending") return true;
    

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
      <h2 className="text-center mb-4">REIMBURSEMENT APPLICATIONS</h2>
      <div className="mb-4 text-center">
        <button className="btn btn-primary me-2" onClick={() => setFilter("Pending")}>Pending</button>
        <button className="btn btn-warning me-2" onClick={() => setFilter("Second Level Pending")}>Second Level Pending</button>
        <button className="btn btn-info me-2" onClick={() => setFilter("Third Level Pending")}>Third Level Pending</button>
        <button className="btn btn-success me-2" onClick={() => setFilter("Approved")}>Approved</button>
        <button className="btn btn-danger me-2" onClick={() => setFilter("Rejected")}>Rejected</button>
        <button className="btn btn-secondary" onClick={() => setFilter("All")}>All</button>
      </div>
      <div style={tableContainerStyle}>
        {filteredReimbursements.length > 0 ? (
          <table className="table table-bordered" style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyles}>UID</th>
                <th style={thStyles}>Employee Name</th>
                <th style={thStyles}>Expense Type</th>
                <th style={thStyles}>Vehicle Type</th>
                <th style={thStyles}>Total Kms</th>
                <th style={thStyles}>Description</th>
                <th style={thStyles}>Start Date</th>
                <th style={thStyles}>End Date</th>
                <th style={thStyles}>Total Expense</th>
                <th style={thStyles}>Uploaded Proofs</th>
                <th style={thStyles}>Status</th>
                <th style={thStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReimbursements.map((reimbursement) => (
                <tr key={reimbursement._id}>
                  <td style={tdStyles}>{reimbursement.uid}</td>
                  <td style={tdStyles}>{reimbursement.employeeName}</td>
                  <td style={tdStyles}>{reimbursement.expenseType}</td>
                  <td style={tdStyles}>{reimbursement.vehicleType || '-'}</td>
                  <td style={tdStyles}>{reimbursement.totalKms || '-'}</td>
                  <td style={tdStyles}>{reimbursement.description}</td>
                  <td style={tdStyles}>{new Date(reimbursement.startDate).toLocaleDateString()}</td>
                  <td style={tdStyles}>{new Date(reimbursement.endDate).toLocaleDateString()}</td>
                  <td style={tdStyles}>{reimbursement.totalExpense}</td>
                  <td style={tdStyles}>
                    {reimbursement.proofs && reimbursement.proofs.length > 0 ? (
                      reimbursement.proofs.map((proof, index) => (
                        <div key={index}>
                          <a href={`http://localhost:8001/${proof}`} target="_blank" rel="noopener noreferrer">
                            View Proof {index + 1}
                          </a>
                        </div>
                      ))
                    ) : (
                      "No Proof Uploaded"
                    )}
                  </td>
                  <td style={tdStyles}>{reimbursement.status}</td>
                  <td style={tdStyles}>
                    {reimbursement.status === "Pending" && adminId === "A001" && (
                      <>
                        <button
                          className="btn btn-sm btn-warning mb-2"
                          onClick={() => handleStatusChange(reimbursement._id, "Second Level Pending")}
                        >
                          Send to Second Level
                        </button>
                        <button
                          className="btn btn-sm btn-danger mb-2"
                          onClick={() => handleStatusChange(reimbursement._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {reimbursement.status === "Second Level Pending" && adminId === "A002" && (
                      <>
                        <button
                          className="btn btn-sm btn-warning mb-2"
                          onClick={() => handleStatusChange(reimbursement._id, "Third Level Pending")}
                        >
                          Send to Third Level
                        </button>
                        <button
                          className="btn btn-sm btn-danger mb-2"
                          onClick={() => handleStatusChange(reimbursement._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {reimbursement.status === "Third Level Pending" && adminId === "A003" && (
                      <>
                        <button
                          className="btn btn-sm btn-success mb-2"
                          onClick={() => handleStatusChange(reimbursement._id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger mb-2"
                          onClick={() => handleStatusChange(reimbursement._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleDelete(reimbursement._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No reimbursement applications found.</div>
        )}
      </div>
    </div>
  );
};

export default ReimbursementA;
