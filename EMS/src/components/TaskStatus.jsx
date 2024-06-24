// TaskStatus.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskStatus = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://ems-imagine.onrender.com/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const thStyle = {
    backgroundColor: "#f2f2f2",
  };

  return (
    <div style={containerStyle}>
      <h2>TASK STATUS</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...thStyle }}>Employee UID</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Task</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Deadline</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.uid}>
              <td style={thTdStyle}>{task.uid}</td>
              <td style={thTdStyle}>{task.task}</td>
              <td style={thTdStyle}>{task.deadline}</td>
              <td style={thTdStyle}>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskStatus;
