import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import '../styles/TaskE.css'; // Import the new CSS file

const TaskE = () => {
  const { uid } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://ems-imagine.onrender.com/tasks/${uid}`);
        setTasks(response.data.tasks); // Assuming the response has a 'tasks' field containing an array of tasks
      } catch (err) {
        setError("Error fetching tasks");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [uid]);

  const handleStatusChange = async (taskId) => {
    try {
      await axios.post(`https://ems-imagine.onrender.com/tasks/${taskId}/status`, { status: "Done" });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: "Done" } : task
        )
      );
    } catch (err) {
      console.error("Error updating task status:", err);
      alert("Error updating task status.");
    }
  };

  return (
    <div className="container">
      <h2 className="heading">TASKS</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p>{error}</p>
      ) : tasks.length ? (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.task}</td>
                <td>{new Date(task.deadline).toLocaleDateString()}</td>
                <td>{task.status}</td>
                <td>
                  {task.status !== "Done" && (
                    <button
                      className="status-button"
                      onClick={() => handleStatusChange(task._id)}
                    >
                      Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        
        <p className="text-center"><br />No tasks assigned.</p>
      )}
    </div>
  );
};

export default TaskE;
