import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AttendanceA = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleString('en-US', { weekday: 'long' }));
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    axios.get("https://ems-imagine.onrender.com/employees")
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  useEffect(() => {
    const date = new Date(selectedYear, selectedMonth - 1, selectedDate);
    setSelectedDay(date.toLocaleString('en-US', { weekday: 'long' }));
  }, [selectedYear, selectedMonth, selectedDate]);

  const handleAttendanceChange = (uid, event) => {
    const { value } = event.target;
    setAttendance(prevAttendance => ({
      ...prevAttendance,
      [uid]: {
        uid: uid,
        present: false,
        absent: false,
        leave: false,
        [value]: true
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const attendanceData = {
      year: selectedYear,
      month: selectedMonth,
      date: selectedDate,
      day: selectedDay,
      data: attendance
    };

    if (isUpdate) {
      // Update existing attendance
      try {
        setLoading(true);
        await axios.put(`https://ems-imagine.onrender.com/attendance/${selectedYear}/${selectedMonth}/${selectedDate}`, attendanceData);
        alert(`Attendance updated successfully for ${selectedDay}, ${selectedDate}-${selectedMonth}-${selectedYear}`);
        navigate("/homea/manageempa");
      } catch (error) {
        console.error("Error updating attendance:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Check if attendance already exists for the selected date
      try {
        setLoading(true);
        const res = await axios.get(`https://ems-imagine.onrender.com/attendance/${selectedYear}/${selectedMonth}/${selectedDate}`);
        if (res.data.length > 0) {
          alert(`Attendance for ${selectedDay}, ${selectedDate}-${selectedMonth}-${selectedYear} already exists.`);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error checking existing attendance:", error);
        setLoading(false);
        return;
      }

      // Submit new attendance
      axios.post("https://ems-imagine.onrender.com/attendance", attendanceData)
        .then(response => {
          console.log(response.data);
          alert(`Attendance recorded successfully for ${selectedDay}, ${selectedDate}-${selectedMonth}-${selectedYear}`);
          navigate("/homea/manageempa");
        })
        .catch(error => {
          console.error("Error recording attendance:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleUpdate = async () => {
    // Fetch existing attendance for the selected date
    try {
      setLoading(true);
      const res = await axios.get(`https://ems-imagine.onrender.com/attendance/${selectedYear}/${selectedMonth}/${selectedDate}`);
      if (res.data.length > 0) {
        const existingAttendance = res.data[0].data;
        setAttendance(existingAttendance);
        setIsUpdate(true);
        alert(`Attendance data loaded for ${selectedDay}, ${selectedDate}-${selectedMonth}-${selectedYear}. You can now update the attendance.`);
      } else {
        alert(`No existing attendance data found for ${selectedDay}, ${selectedDate}-${selectedMonth}-${selectedYear}.`);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const years = Array.from(new Array(20), (_, index) => new Date().getFullYear() - 10 + index); // 10 years back and 10 years ahead
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = Array.from(new Array(31), (_, index) => index + 1);

  const calculateSummary = () => {
    let present = 0;
    let absent = 0;
    let onLeave = 0;

    Object.values(attendance).forEach(record => {
      if (record.present) present++;
      if (record.absent) absent++;
      if (record.leave) onLeave++;
    });

    return { present, absent, onLeave };
  };

  const summary = calculateSummary();

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
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

  const radioStyles = {
    cursor: 'pointer'
  };

  const selectStyles = {
    padding: '0.5rem',
    margin: '0 0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: 'white'
  };

  const dateContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  };

  const summaryCardStyles = {
    flex: '1',
    paddingTop: '12px',
    margin: '0 5px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  };

  const summaryContainerStyles = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
    width: '60%',
    maxWidth: '600px',
    flexWrap: 'wrap'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      margin: '20px',
    }}>
      <h2>ATTENDANCE</h2>
      <div style={summaryContainerStyles}>
        <div style={summaryCardStyles}>
          <h6>Total Present</h6>
          <p>{summary.present}</p>
        </div>
        <div style={summaryCardStyles}>
          <h6>Total Absent</h6>
          <p>{summary.absent}</p>
        </div>
        <div style={summaryCardStyles}>
          <h6>Total On Leave</h6>
          <p>{summary.onLeave}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <div style={dateContainerStyles}>
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={selectStyles}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <label htmlFor="month">Month:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={selectStyles}
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index + 1}>{month}</option>
            ))}
          </select>
          <label htmlFor="date">Date:</label>
          <select
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={selectStyles}
          >
            {days.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
          <label>Day: </label>
          <span style={selectStyles}>{selectedDay}</span>
        </div>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>UID</th>
              <th style={thStyles}>Name</th>
              <th style={thStyles}>Present</th>
              <th style={thStyles}>Absent</th>
              <th style={thStyles}>Leave</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.uid}>
                <td style={tdStyles}>{employee.uid}</td>
                <td style={tdStyles}>{employee.name}</td>
                <td style={tdStyles}>
                  <input
                    type="radio"
                    name={`attendance-${employee.uid}`}
                    value="present"
                    checked={attendance[employee.uid]?.present || false}
                    onChange={(e) => handleAttendanceChange(employee.uid, e)}
                    style={radioStyles}
                  />
                </td>
                <td style={tdStyles}>
                  <input
                    type="radio"
                    name={`attendance-${employee.uid}`}
                    value="absent"
                    checked={attendance[employee.uid]?.absent || false}
                    onChange={(e) => handleAttendanceChange(employee.uid, e)}
                    style={radioStyles}
                  />
                </td>
                <td style={tdStyles}>
                  <input
                    type="radio"
                    name={`attendance-${employee.uid}`}
                    value="leave"
                    checked={attendance[employee.uid]?.leave || false}
                    onChange={(e) => handleAttendanceChange(employee.uid, e)}
                    style={radioStyles}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="submit"
          style={{
            marginTop: '30px',
            padding: '5px 10px',
            backgroundColor: loading ? '#ddd' : '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          disabled={loading}
        >
          {loading ? 'Submitting...' : isUpdate ? 'Update' : 'Submit'}
        </button><br />
        {!isUpdate && (
          <button
            type="button"
            onClick={handleUpdate}
            style={{
              marginTop: '30px',
              padding: '5px 10px',
              backgroundColor: '#f39c12',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            disabled={loading}
          >
            Load for Update
          </button>
        )}
        <br />

        <button
          type="button"
          onClick={
            () => navigate("/homea/monthlyattendancea")
          }
          style={{
            marginTop: '30px',
            padding: '5px 10px',
            backgroundColor: '#337ab7',
            color: 'white',
            border: 'none',
            cursor: 'pointer',            
          }}
        >
          View Monthly Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceA;
