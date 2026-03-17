import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments');
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`/api/appointments/${appointmentId}`);
        setAppointments(appointments.filter(app => app.id !== appointmentId));
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Failed to delete appointment. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Admin Panel - Appointments</h1>
      
      {appointments.length === 0 ? (
        <div className="no-appointments">
          <h2>No Appointments Yet</h2>
          <p>Appointments will appear here once patients book them.</p>
        </div>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Appointment Date</th>
                <th>Dentist Name</th>
                <th>Clinic Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.age}</td>
                  <td>{appointment.gender}</td>
                  <td>{formatDate(appointment.appointmentDate)}</td>
                  <td>{appointment.dentistName}</td>
                  <td>{appointment.clinicName}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
