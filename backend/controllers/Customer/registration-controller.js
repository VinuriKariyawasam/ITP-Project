const {config} = require("dotenv")
const RegistrationModel = require("../../models/Customer/registrationModel")
const HttpError = require("../../models/http-error");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



class RegistartionController {
    //create registration controller function

    static async createCustomer(req, res, next){
        try{
            // Log the request body to see the uploaded data
            console.log("Request Body:", req.body);
            const {email , password} = req.body;
           
            let existingCustomer;
            try{
                existingCustomer = await RegistrationModel.findOne({ email:email });
            } catch (err) {
                const error = new HttpError(
                    "Customer Registration Fails.Try Again",
                    500,
                );
                return next(error);  
            }
            if (existingCustomer) {
                  const error = new HttpError(
                    "This Email is alredy in use.",
                    422
                  );
                  return next(error);  
              }

              //password convert to hashcode
              let hashedPassword;
                try {
                  hashedPassword = await bcrypt.hash(password, 12);
                } catch (err) {
                  const error = new HttpError(
                    "Could not create user, please try again.",
                    500
                  );
                  return next(error);
                }
              
        
//Generating unique customer Id
// const currentDate = new Date();
// const year = currentDate.getFullYear().toString().substring(2); // Get last two digits of the year
// const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Get month with leading zero if needed

//  // Construct the regular expression to match Customer Ids starting with CUSYYMM
//  const regexPattern = new RegExp(`^CUS${year}${month}`);

//  // Aggregation pipeline to count the number of employees with the given pattern
//  const customerCountPipeline = [
//     {
//       $match: {
//         id: {
//           $regex: regexPattern,
//         },
//       },
//     },
//     {
//       $count: "count",
//     },
//   ];

//   // Execute the aggregation pipeline
//   const countResult = await RegistrationModel.aggregate(
//     customerCountPipeline
//   );

//   // Extract the count from the aggregation result, or default to 0 if no result found
//   const count = countResult.length > 0 ? countResult[0].count : 0;


//  // Generate the next customer Id
//  const nextNumberString = (count + 1).toString().padStart(3, "0");
//  const customerId = `CUS${year}${month}${nextNumberString}`;


// Function to generate a unique customer ID
// Function to generate a unique customer ID
const generateCustomerId = () => {
  // Get the current date
  const currentDate = new Date();
  
  // Extract year and month components
  const year = currentDate.getFullYear().toString().substring(2); // Get last two digits of the year
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Get month with leading zero if needed
  
  // Generate a random number between 1 and 999 for the last three digits
  const randomNumber = Math.floor(Math.random() * 999) + 1;
  const randomDigits = randomNumber.toString().padStart(3, "0");
  
  // Construct the customer ID
  const customerId = `CUS${year}${month}${randomDigits}`;
  
  return customerId;
};

// Example usage
const customerId = generateCustomerId();
console.log(customerId); // Example output: CUS2404001




//Assign properties one by one to the new customer object
 const newCustomer = new RegistrationModel();
    newCustomer.cusId = customerId;
    newCustomer.Name = req.body.Name;
    newCustomer.contact = req.body.contact;
    newCustomer.email = req.body.email;
    newCustomer.password = hashedPassword;
    newCustomer.address = req.body.address;

    //save customer to DB
   const savedCustomer = await newCustomer
    .save()
    let token;
    try {
      token = jwt.sign(
        { userId: savedCustomer.cusId, email: savedCustomer.email},
        'super_secret_customer_key',
        { expiresIn: '1h' }
      );
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    res
    .status(201)
    .json({ userId: savedCustomer.cusId, email:savedCustomer.email,name: savedCustomer.name, token: token });
        }catch (error) {
            // Log the error for debugging purposes
            console.error("Error while fetching(sending) customer to db:", error);
            // Handle any errors that occur during employee creation
            const err = new HttpError(
              "Failed to create customer. Please try again.",
              500
            );
            return next(err);
    }
    
};

//Get customer by Id
static async getCustomerById(req, res){

  try{
    let cusId= req.params.id;
    const customer = await RegistrationModel.findOne({ cusId: cusId})
    if(!customer) {
        throw new HttpError("Customer not found", 404);
    }
    const customerData = {
            ...customer.toObject({ getters: true}),
        };
        res.status(200).json(customerData);
    }catch (error) {
        console.error("Error fetching customer data:", error);
        res.status(error.code || 500).json({error: error.message});
    }
}

//Update customer by Id
static async updateCustomerById(req, res, next){
    console.log("Request Body:", req.params.id);
    console.log("Request Body:", req.body);

    const {Name, contact, email, password, address} = req.body;
    const customerId = req.params.id;

    let customer;
    try{
        customer = await RegistrationModel.findOne({ cusId:customerId })
    }catch(err) {
        const error = new HttpError(
            "Something went wrong, could not find customer.",
            404
          );
          return next(error);
    }
    if(!customer){
        const error = new HttpError("Customer not found", 404);
      return next(error); 
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new HttpError(
        "Error Updating Password.",
        500
      );
      return next(error);
    }

    //update customer fields with values from req.body
    customer.Name = Name;
    customer.contact = contact;
    customer.email = email;
    //customer.password = hashedPassword;
    customer.address = address;

    //save the updated details
    try{
        const updatedCustomer = await customer.save();
        res.status(200).json(updatedCustomer)
    }catch (err) {
        const error = new HttpError(
          "Something went wrong, could not update customer.",
          500
        );
        return next(error);
      }
}

//delete customer by Id
static async deleteCustomerById(req, res){
    try{
       // Find and delete the employee from the original table
       let cusId= req.params.id;
       const deletedCustomer = await RegistrationModel.findOneAndDelete(
        {cusId:cusId})
        .then(() => {
            res.json("Customer deleted from DB");
            
        })
       
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

//customer login
static async loginCustomer(req, res){
  console.log("Request Body:", req.body);
  const { email, password } = req.body;

  try {
    let user;

    // Check if the username matches the email format
    if (/^\S+@\S+\.\S+$/.test(email)) {
      user = await RegistrationModel.findOne({ email: email });
    } else {
      return res.status(404).json({ message: "Not an email format" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.cusId, email: user.email },
      'super_secret_customer_key',
      { expiresIn: "1h" }
    );

    res.json({
      userId: user.cusId,
      email: user.email,
      name: user.Name,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
}

module.exports = RegistartionController;
