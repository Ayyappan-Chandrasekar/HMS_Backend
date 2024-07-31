// signup table
module.exports = (sequelize, DataTypes) => {
  const Sigup = sequelize.define('Sigup', { // Use capitalized model name for convention
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
        isEmail: true, // Built-in validator to check for general email format
        customValidator(value) {
          if (!value.endsWith('@gmail.com')) {
            throw new Error('Email address must end with @gmail.com');
          }
        },
      },
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
        },
      },
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING, // Store image URL or path
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
      type: DataTypes.STRING, // Store fingerprint data
      allowNull: true,
    },
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
    },
  }, {
    timestamps: false, // Disable automatic timestamp columns
  });

  return Sigup;
}


