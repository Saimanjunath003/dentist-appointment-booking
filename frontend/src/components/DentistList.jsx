import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DentistList = () => {
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDentists();
  }, []);

  const fetchDentists = async () => {
    try {
      const response = await axios.get('/api/dentists');
      setDentists(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dentists:', error);
      setLoading(false);
    }
  };

  const handleBookAppointment = (dentistId) => {
    navigate(`/book/${dentistId}`);
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
      <h1 className="page-title">Find Your Dentist</h1>
      <div className="dentist-grid">
        {dentists.map((dentist) => (
          <div key={dentist.id} className="dentist-card">
            <img
              src={dentist.photo}
              alt={dentist.name}
              className="dentist-photo"
            />
            <div className="dentist-info">
              <h2 className="dentist-name">{dentist.name}</h2>
              <p className="dentist-qualification">{dentist.qualification}</p>
              <p className="dentist-experience">
                {dentist.yearsOfExperience} years of experience
              </p>
              <p className="dentist-clinic">{dentist.clinicName}</p>
              <p className="dentist-address">
                {dentist.address}, {dentist.location}
              </p>
              <button
                className="book-button"
                onClick={() => handleBookAppointment(dentist.id)}
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DentistList;
