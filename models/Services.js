// models/Services.js
module.exports = (sequelize, DataTypes) => {
    const Services = sequelize.define('Services', {
      selectServices: {
        type: DataTypes.ENUM('Home', 'Patient', 'Employees', 'Asset', 'Slots'),
        allowNull: false,
      },
      assessLevel: {
        type: DataTypes.ENUM('Home', 'Patient', 'Employees', 'Asset', 'Slots'),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // Add validation for password strength if needed
      }
    });
  
    return Services;
  };