// models/EmployeeDetails.js
module.exports = (sequelize, DataTypes) => {
    const EmployeeDetails = sequelize.define('EmployeeDetails', {
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      idEmployees: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      department: {
        type: DataTypes.ENUM('HR', 'IT', 'Finance', 'Marketing'),
        allowNull: false,
      },
      designation: {
        type: DataTypes.ENUM('Manager', 'Developer', 'Analyst', 'Tester'),
        allowNull: false,
      },
      branch: {
        type: DataTypes.ENUM('Headquarters', 'Branch1', 'Branch2'),
        allowNull: false,
      },
      fingerPrint: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
  
    return EmployeeDetails;
  };