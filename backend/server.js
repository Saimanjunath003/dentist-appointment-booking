const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const dentistRoutes = require('./routes/dentistRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite Database Connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// Define Dentist Model
const Dentist = sequelize.define('Dentist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: false
  },
  yearsOfExperience: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  clinicName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    defaultValue: 'https://via.placeholder.com/150'
  }
});

// Define Appointment Model
const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dentistId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dentistName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clinicName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Make models available to routes
app.set('Dentist', Dentist);
app.set('Appointment', Appointment);

// Seed sample data
const seedData = async () => {
  const count = await Dentist.count();
  if (count === 0) {
    const sampleDentists = [
      {
        name: 'Dr. Sarah Johnson',
        qualification: 'BDS, MDS',
        yearsOfExperience: 10,
        clinicName: 'Smile Dental Care',
        address: '123 Main Street, Downtown',
        location: 'New York',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        name: 'Dr. Michael Chen',
        qualification: 'BDS, FICOI',
        yearsOfExperience: 8,
        clinicName: 'Perfect Smile Clinic',
        address: '456 Oak Avenue',
        location: 'Los Angeles',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      {
        name: 'Dr. Emily Williams',
        qualification: 'BDS, DMD',
        yearsOfExperience: 15,
        clinicName: 'Bright Teeth Dental',
        address: '789 Pine Road',
        location: 'Chicago',
        photo: 'https://randomuser.me/api/portraits/women/68.jpg'
      },
      {
        name: 'Dr. James Brown',
        qualification: 'BDS, MSc',
        yearsOfExperience: 12,
        clinicName: 'Family Dental Center',
        address: '321 Elm Street',
        location: 'Houston',
        photo: 'https://randomuser.me/api/portraits/men/52.jpg'
      },
      {
        name: 'Dr. Lisa Anderson',
        qualification: 'BDS, PhD',
        yearsOfExperience: 20,
        clinicName: 'Advanced Dental Solutions',
        address: '654 Maple Drive',
        location: 'Phoenix',
        photo: 'https://randomuser.me/api/portraits/women/90.jpg'
      },
      {
        name: 'Dr. Robert Taylor',
        qualification: 'BDS, DICOI',
        yearsOfExperience: 7,
        clinicName: 'Gentle Care Dental',
        address: '987 Cedar Lane',
        location: 'Philadelphia',
        photo: 'https://randomuser.me/api/portraits/men/75.jpg'
      }
    ];
    await Dentist.bulkCreate(sampleDentists);
    console.log('Sample dentists seeded');
  }
};

// Initialize database and start server
sequelize.sync({ force: false })
  .then(async () => {
    console.log('Database connected');
    await seedData();
    
    // Routes
    app.use('/api/dentists', dentistRoutes);
    app.use('/api/appointments', appointmentRoutes);

    // Root route
    app.get('/', (req, res) => {
      res.json({ message: 'Dentist Appointment API is running' });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to database:', err);
  });
