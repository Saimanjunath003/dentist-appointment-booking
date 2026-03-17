import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const BookAppointment = () => {
  const { dentistId } = useParams();
  const navigate = useNavigate();
  const [dentist, setDentist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    appointmentDate: ''
  });

  useEffect(() => {
    fetchDentist();
  }, [dentistId]);

  const fetchDentist = async () => {
    try {
      const response = await axios.get(`/api/dentists/${dentistId}`);
      setDentist(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dentist:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post('/api/appointments', {
        ...formData,
        dentistId
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container">
        <div className="booking-container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Appointment Booked Successfully!</h2>
            <p>
              Your appointment with {dentist.name} has been confirmed.
              Please arrive 15 minutes before your scheduled time.
            </p>
            <button className="submit-button" onClick={handleGoHome}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="back-button">
        ← Back to Dentist List
      </Link>
      <div className="booking-container">
        <h1 className="page-title">Book Appointment</h1>
        
        {dentist && (
          <div className="dentist-preview">
            <h3>{dentist.name}</h3>
            <p>{dentist.qualification}</p>
            <p>{dentist.clinicName} - {dentist.location}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              placeholder="Enter patient name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              max="150"
              placeholder="Enter age"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={submitting}
          >
            {submitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
