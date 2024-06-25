import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import "../styles/EditClient.css"; // Import custom CSS for additional styling if needed

function EditClientE() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(`https://ems-imagine.onrender.com/clients/${uid}`);
        setClient(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchClient();
  }, [uid]);

  if (!client) {
    return <div>Loading...</div>;
  }

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`https://ems-imagine.onrender.com/clients/${uid}`, client);
      if (res.status === 200) {
        alert("Client details updated successfully!");
        navigate("/homee/managecliente");
      } else {
        alert("Failed to update client details.");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while updating client details.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    if (confirmDelete) {
    try {
      const res = await axios.delete(`https://ems-imagine.onrender.com/clients/${uid}`);
      if (res.status === 200) {
        navigate("/homee/managecliente");
      } else {
        alert("Failed to delete client.");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while deleting the client.");
    }
  }
  };

  const handleShowDocuments = () => {
    navigate(`/homee/clientdocs/${uid}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center">
              <h2>CLIENT DETAILS</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Unique Id:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={client.uid} readOnly />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Password:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={client.password} readOnly />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Name:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Phone:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Client Type:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={client.clientType} onChange={(e) => setClient({ ...client, clientType: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Address:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Location Link:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={client.locationLink} onChange={(e) => setClient({ ...client, locationLink: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary mt-3" style={{ marginRight: '20px' }} onClick={handleUpdate}>Update</button>
                    <button type="button" className="btn btn-success mt-3" style={{ marginLeft: '20px',marginRight: '20px' }} onClick={handleShowDocuments}>Show Documents</button>
                    <button type="button" className="btn btn-danger mt-3" style={{ marginLeft: '20px' }} onClick={handleDelete}>Delete</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditClientE;
