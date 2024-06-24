import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ViewReimbE.css"; // Import the CSS file

function ViewReimbE() {
  const [reimbursements, setReimbursements] = useState([]);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchReimbursements = async () => {
      try {
        const response = await axios.get(`https://ems-imagine.onrender.com/reimbursement/${uid}`);
        setReimbursements(response.data);
      } catch (error) {
        console.error("Error fetching reimbursements:", error);
      }
    };

    if (uid) {
      fetchReimbursements();
    }
  }, [uid]);

  const deleteReimbursement = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this reimbursement application?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`https://ems-imagine.onrender.com/reimbursement/${id}`);
        setReimbursements(reimbursements.filter((reimbursement) => reimbursement._id !== id));
      } catch (error) {
        console.error("Error deleting reimbursement:", error);
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error("Error response data:", error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error("Error request data:", error.request);
        } else {
          // Something else happened in setting up the request
          console.error("Error message:", error.message);
        }
      }
    }
  };

  return (
    <>
      <br />
      <br />
      <h2 className="text-center">REIMBURSEMENT APPLICATIONS</h2>
      <div className="table-container">
        {reimbursements.length === 0 ? (
          <p style={{ textAlign: "center" }}>No applications found.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Expense Type</th>
                <th>Vehicle Type</th>
                <th>Total Kms</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Expense</th>
                <th>Uploaded Proofs</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reimbursements.map((reimbursement) => (
                <tr key={reimbursement._id}>
                  <td>{reimbursement.expenseType}</td>
                  <td>{reimbursement.vehicleType || "-"}</td>
                  <td>{reimbursement.totalKms || "-"}</td>
                  <td>{reimbursement.description}</td>
                  <td>{new Date(reimbursement.startDate).toLocaleDateString()}</td>
                  <td>{new Date(reimbursement.endDate).toLocaleDateString()}</td>
                  <td>{reimbursement.totalExpense}</td>
                  <td>
                    {reimbursement.proofs && reimbursement.proofs.length > 0 ? (
                      reimbursement.proofs.map((proof, index) => (
                        <div key={index}>
                          <a
                            href={`http://localhost:8001/${proof}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Proof {index + 1}
                          </a>
                        </div>
                      ))
                    ) : (
                      "No Proof Uploaded"
                    )}
                  </td>
                  <td>{reimbursement.status}</td>
                  <td>
                    <button
                      className="btnrap btnrap-danger"
                      onClick={() => deleteReimbursement(reimbursement._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ViewReimbE;
