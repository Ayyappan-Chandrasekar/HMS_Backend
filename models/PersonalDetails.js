// models/PersonalDetails.js
module.exports = (sequelize, DataTypes) => {
    const PersonalDetails = sequelize.define('PersonalDetails', {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Ensure general email format
          customValidator(value) {
            if (!value.endsWith('@gmail.com')) {
              throw new Error('Email address must end with @gmail.com');
            }
          }
        }
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: false,
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [10, 10],
            msg: 'Mobile number must be exactly 10 digits long',
          },
          isNumeric: {
            msg: 'Mobile number must contain only digits',
          }
        }
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      }
    });
  
    return PersonalDetails;
  };