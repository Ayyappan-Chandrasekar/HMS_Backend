const db = require('../models');
const PersonalDetails = db.PersonalDetails;
const EmployeeDetails = db.EmployeeDetails;
const Services  = db.Services;
const sign = db.Sigup; 
const sigup = db.Sigup; 


const regJoin = async (req, res) => {
  const t = await db.sequelize.transaction(); // Start transaction

  try {
    // Extract data from the request body
    const { personalDetails, employeeDetails, services } = req.body;
    console.log(personalDetails,employeeDetails,services)

    // Create a new personal details entry
    const newPersonalDetails = await PersonalDetails.create(personalDetails, { transaction: t });
    // const newEmployeeDetails = await PersonalDetails.create(employeeDetails, { transaction: t });
    // const newServices = await PersonalDetails.create(services, { transaction: t });

    // Create associated employee details entry
    await EmployeeDetails.create({
      ...employeeDetails,
      personalDetailsId: newPersonalDetails.id // Associate with personalDetails
    }, { transaction: t });

    // Create associated services entry
    await Services.create({
      ...services,
      personalDetailsId: newPersonalDetails.id // Associate with personalDetails
    }, { transaction: t });

    // Commit the transaction
    await t.commit();
    res.status(201).json({ message: 'Registration successful' });
    console.log("Registration successful");
  } catch (error) {
    // Rollback the transaction on error
    await t.rollback();
    console.log("Registration error:", error.message);
    res.status(400).json({ error: error.message });
  }
};


const reg = async (req, res) => {
    try {
      const newSignup = await sigup.create(req.body);
      res.status(201).json(newSignup);
      console.log("Sigup sucess")
    } catch (error) {
        console.log("Sigup error")
      res.status(400).json({ error: error.message });
    }
  };

const login = async (req, res) => {
    try {
        const { emailAddress, mobileNumber, password } = req.body;

        // Ensure at least one identifier is provided
        if (!emailAddress && !mobileNumber) {
            return res.status(400).json({ error: 'Email address or mobile number is required' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        // Build the where condition based on provided parameters
        const whereCondition = {};
        if (emailAddress) {
            whereCondition.emailAddress = emailAddress;
        }
        if (mobileNumber) {
            whereCondition.mobileNumber = mobileNumber;
        }

        // Find the user by email or mobile number
        const user = await sign.findOne({ where: whereCondition });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email/mobile number' });
        }

        // Directly compare the provided password with the stored password
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Return a success message or token (if using JWT)
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log('Login error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports ={
    reg,
    login,
    regJoin,
}



//   const login = async (req, res) => {
//     try {
//         const { emailAddress, mobileNumber, password } = req.body;

//         // Ensure at least one identifier is provided
//         if (!emailAddress && !mobileNumber) {
//             return res.status(400).json({ error: 'Email address or mobile number is required' });
//         }

//         if (!password) {
//             return res.status(400).json({ error: 'Password is required' });
//         }

//         // Find the user by email or mobile number
//         const user = await sign.findOne({
//             where: {
//                 [Op.or]: [
//                     { emailAddress },
//                     { mobileNumber }
//                 ]
//             }
//         });

//         // Check if user exists and password matches
//         if (user && user.password === password) {
//             res.status(200).json({ message: 'Login successful' });
//         } else {
//             res.status(401).json({ error: 'Invalid email/mobile number or password' });
//         }
//     } catch (error) {
//         console.log('Login error:', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// const newEmployeeDetails = await PersonalDetails.create(employeeDetails, { transaction: t });
    // const newServices = await PersonalDetails.create(services, { transaction: t });