import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap-icons/font/bootstrap-icons.css";

const TaskA = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [taskDetails, setTaskDetails] = useState({ task: "", deadline: "" });
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://ems-imagine.onrender.com/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleTaskChange = (field, value) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const task = {
        uid: selectedEmployee,
        ...taskDetails,
        status: "Pending",
      };

      await axios.post("https://ems-imagine.onrender.com/tasks", { tasks: [task] });
      alert("Task assigned successfully!");
      setTaskDetails({ task: "", deadline: "" });
      fetchPendingTasks(); // Fetch and update pending tasks immediately after assigning
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Error assigning task.");
    }
  };

  const fetchPendingTasks = async () => {
    try {
      const response = await axios.get("https://ems-imagine.onrender.com/tasks?status=Pending");
      setPendingTasks(response.data);
      setShowPending(true);
      setShowCompleted(false);
    } catch (error) {
      console.error("Error fetching pending tasks:", error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get("https://ems-imagine.onrender.com/tasks?status=Done");
      setCompletedTasks(response.data);
      setShowPending(false);
      setShowCompleted(true);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
    try {
      await axios.delete(`https://ems-imagine.onrender.com/tasks/${taskId}`);
      setPendingTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
      setCompletedTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task.");
    }
  }
  };

  const containerStyle = {
    width: "70%",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  };

  const tableStyle = {
    width: "80%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    margin: "35px auto",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
  };

  const thStyle = {
    backgroundColor: "#f9f9f9",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    boxSizing: "border-box",
    borderRadius: "5px",
    border: "1px solid #ccc",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px 10px",
    transition: "background-color 0.3s ease",
    display: "flex",
    justifyContent: "center",
  };

  const buttonStyleDelete = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
  };
  const buttonStylePending = {
    ...buttonStyle,
    backgroundColor: "orange",
  };
  const buttonStyleComplete = {
    ...buttonStyle,
    backgroundColor: "green",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  const headingCardStyle = {
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    margin: "40px auto",
    width: "80%",
    color: "black",
  };

  return (
    <>
      <div style={containerStyle}>
        <h2 className="text-center">TASK ASSIGNMENT</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Employee:</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              style={inputStyle}
            >
              <option value="" disabled>
                Select an employee
              </option>
              {employees.map((employee) => (
                <option key={employee.uid} value={employee.uid}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Task:</label>
            <input
              type="text"
              style={inputStyle}
              value={taskDetails.task}
              onChange={(e) => handleTaskChange("task", e.target.value)}
              placeholder="Enter task details"
            />
          </div>
          <div>
            <label>Deadline:</label>
            <input
              type="date"
              style={inputStyle}
              value={taskDetails.deadline}
              onChange={(e) => handleTaskChange("deadline", e.target.value)}
            />
          </div>
          <div style={buttonContainerStyle}>
            <button type="submit" style={buttonStyle}>
              Assign Task
            </button>
          </div>
        </form>
      </div>
      <div style={buttonContainerStyle}>
        <button onClick={fetchPendingTasks} style={buttonStylePending}>
          Show All Pending Tasks
        </button>
        <button onClick={fetchCompletedTasks} style={buttonStyleComplete}>
          Show All Completed Tasks
        </button>
      </div>
      {showPending && (
        <div>
          <div style={headingCardStyle}>
            <h3>PENDING TASKS</h3>
          </div>
          {pendingTasks.length === 0 ? (
            <p style={{ textAlign: "center" }}>No pending tasks found.</p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={{ ...thTdStyle, ...thStyle }}>Task</th>
                  <th style={{ ...thTdStyle, ...thStyle }}>Employee Name</th>
                  <th style={{ ...thTdStyle, ...thStyle }}>Deadline</th>
                  <th style={{ ...thTdStyle, ...thStyle }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingTasks.map((task) => (
                  <tr key={task._id}>
                    <td style={thTdStyle}>{task.task}</td>
                    <td style={thTdStyle}>{employees.find(e => e.uid === task.uid)?.name}</td>
                    <td style={thTdStyle}>{new Date(task.deadline).toLocaleDateString()}</td>
                    <td style={thTdStyle}>
                      <button style={buttonStyleDelete} onClick={() => handleDeleteTask(task._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      {showCompleted && (
        <div>
          <div style={headingCardStyle}>
            <h3>COMPLETED TASKS</h3>
          </div>
          {completedTasks.length === 0 ? (
            <p style={{ textAlign: "center" }}>No completed tasks found.</p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={{ ...thTdStyle, ...thStyle }}>Task</th>
                  <th style={{ ...thTdStyle, ...thStyle }}>Employee Name</th>
                  <th style={{ ...thTdStyle, ...thStyle }}>Deadline</th>
                  <th style={{ ...thTdStyle, ...thStyle }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {completedTasks.map((task) => (
                  <tr key={task._id}>
                    <td style={thTdStyle}>{task.task}</td>
                    <td style={thTdStyle}>{employees.find(e => e.uid === task.uid)?.name}</td>
                    <td style={thTdStyle}>{new Date(task.deadline).toLocaleDateString()}</td>
                    <td style={thTdStyle}>
                      <button style={buttonStyleDelete} onClick={() => handleDeleteTask(task._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default TaskA;
