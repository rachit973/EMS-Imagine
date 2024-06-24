import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AttendanceE.css";  // Import the CSS file

const AttendanceE = () => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);

  const years = Array.from(new Array(20), (_, index) => new Date().getFullYear() - 10 + index); // 10 years back and 10 years ahead
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    if (uid) {
      fetchAttendanceData();
    }
  }, [selectedYear, selectedMonth, uid]);

  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://ems-imagine.onrender.com/attendance/${selectedYear}/${selectedMonth}/employee/${uid}`);
      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching monthly attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const calculateTotals = (attendanceData) => {
    let totals = { present: 0, absent: 0, leave: 0 };

    attendanceData.forEach(record => {
      if (record.status.present) totals.present++;
      if (record.status.absent) totals.absent++;
      if (record.status.leave) totals.leave++;
    });

    return totals;
  };

  const totals = calculateTotals(attendanceData);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center">
              <h2 className="text-white">MONTHLY ATTENDANCE</h2>
            </div>
            <div className="card-body">
              <div className="date-container">
                <label htmlFor="year">Year:</label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="select-style"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <label htmlFor="month">Month:</label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="select-style"
                >
                  {monthNames.map((month, index) => (
                    <option key={index} value={index + 1}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="card-container">
                <div className="card-style present-card">
                  <h5>Present</h5>
                  <p>{totals.present}</p>
                </div>
                <div className="card-style absent-card">
                  <h5>Absent</h5>
                  <p>{totals.absent}</p>
                </div>
                <div className="card-style leave-card">
                  <h5>Leave</h5>
                  <p>{totals.leave}</p>
                </div>
              </div>
              {attendanceData.length > 0 ? (
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Day</th>
                      <th>Present</th>
                      <th>Absent</th>
                      <th>Leave</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map(record => (
                      <tr key={record.date}>
                        <td>{record.date}</td>
                        <td>{record.day}</td>
                        <td>{record.status.present ? 'Yes' : '-'}</td>
                        <td>{record.status.absent ? 'Yes' : '-'}</td>
                        <td>{record.status.leave ? 'Yes' : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center"><br />No attendance records found for the selected month.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceE;
