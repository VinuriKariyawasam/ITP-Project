import React, { useState, useEffect } from "react";
import { useForm, Controller, getValues } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../HrUtil/ImageUpload";
import FileUpload from "../HrUtil/FileUpload";
import { BsArrowLeft } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { differenceInYears, isBefore, isAfter, format } from "date-fns";
import { BiCheckCircle, BiHide, BiShow } from "react-icons/bi";

function AddEmp({ toggleLoading }) {
  const cusfrontendurl = `${process.env.React_App_Frontend_URL}/customer`;
  const stafffrontendurl = `${process.env.React_App_Frontend_URL}/staff/login`;
  const [errorMessage, setErrorMessage] = useState("");
  const [designations, setDesignations] = useState([]);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  //to redirect after success
  const navigate = useNavigate();
  // State to track selected position
  const [selectedPosition, setSelectedPosition] = useState("");
  //for date picker
  const [selectedDate, setSelectedDate] = useState(new Date());

  //get designations
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/designations`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch designations");
        }
        const data = await response.json();
        setDesignations(data); // Assuming the response data is an array of designations
      } catch (error) {
        console.error("Error fetching designations:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };

    fetchDesignations();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //validation and submit
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
    getValues,
    trigger,
  } = useForm();

  //Submit function
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      // The passwords do not match
      // Display an error message and prevent form submission
      setErrorMessage("The passwords do not match");
      return;
    }
    try {
      toggleLoading(true); // Set loading to true before API call
      const formData = new FormData();

      // Append regular form data
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (uploadedFile) {
        formData.append("documents", uploadedFile);
      }

      // Log FormData object
      console.log("FormData:", formData);

      console.log("FormData Entries:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/add-employee`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 201) {
        // Employee created successfully
        const result = await response.json();
        console.log("Data submitted successfully:", result);
        alert("Employee Registered Successfully!");
        const email = result.email;

        // Send email with the PDF attachment and HTML content
        const emailOptions = {
          to: `${email}`, // Replace with recipient email address
          subject: `Emplyee Registration Confirmation- Neo Tech Motors`,

          html: `<p><b>Dear Trusted Partner</b></p>
              <p>We're delighted to inform you that your you are officailly registred employee at our organization.</p>
              <p>With your designation you will have the access to our management system with this email and your given password.</p>
              <p>Hope you have fun while working. Login Here<a href=${stafffrontendurl}>Neo Tech Staff</a></p>
              <p>Thank You</p>
              <p>Warm regards,</p>
              <p><b><i>HR Division- Neo Tech Motors</i></b></p>
              <a href=${cusfrontendurl}><img src="https://i.ibb.co/ySB2bhn/Logoblack.jpg" alt="Logoblack" border="0"></a>`,
        };

        // Send a fetch request to the backend controller for sending email
        await fetch(`${process.env.React_App_Backend_URL}/api/hr/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: emailOptions.to,
            subject: emailOptions.subject,
            text: emailOptions.text,
            html: emailOptions.html,
          }),
        });
        // Redirect to the specified URL after successful submission
        navigate("/staff/hr/employee");
      } else if (response.status === 422) {
        // Handle validation errors (e.g., NIC already exists)
        const errorData = await response.json();
        alert("Employee alredy exist with this NIC number or Email.Try Again!");
        navigate("/staff/hr/employee");
      } else {
        // Handle other error cases
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      console.log("Data submitted successfully:", result);

      alert("Employee Registered Succesfully!");

      // app emp to employee benefits

      // Redirect to the specified URL after successful submission
      navigate("/hr/employee");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Display error message using alert box
        setErrorMessage(error.response.data.error);
        alert(error.response.data.error); // Display error message in an alert box
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value); // Update selected position
  };

  //file uplood funxtions
  // State to store the uploaded files
  const [uploadedFile, setUploadedFile] = useState(null);

  // File input handler for SingleFileUpload component
  const fileInputHandler = (id, file, isValid) => {
    if (isValid) {
      // Set the uploaded file in state
      setUploadedFile(file);
    } else {
      // Handle invalid files if needed
      console.log("Invalid file:", file);
    }
  };

  const defaultValues = {
    photo: null,
    documents: null,
    otherDetails: null,
    email: null,
    password: null,
  };

  /*------extra validation---*/
  // Custom validation function for the first name and last name fields
  const validateName = (value) => {
    if (!value) return "This field is required";
    if (!/^[A-Za-z]{3,}$/.test(value))
      return "Please enter a valid name (minimum 3 characters, letters only)";
    return true;
  };

  // Custom validation rule to check if the selected birthdate is older than 18 years old
  const validateBirthDate = (selectedDate) => {
    if (!selectedDate) return "Birth Date is required";
    const currentDate = new Date();
    const minDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    ); // 18 years ago from today
    console.log("Selected Date:", minDate, selectedDate);
    if (!isBefore(selectedDate, minDate)) {
      return "You must be at least 18 years old";
    }
    return true;
  };

  // Custom validation for NIC
  const validateNIC = (value) => {
    console.log("NIC:", value);
    if (!value) return "NIC is required";
    const nicRegex = /^(?:\d{9}[vV]|\d{12})$/; // Matches 9 digits followed by 'v' or 'V', or 12 digits
    if (!nicRegex.test(value)) return "Invalid NIC format";
    return true;
  };

  // Custom validation rule to check if the selected start date is not a future date
  const validateStartDate = (selectedDate) => {
    if (!selectedDate) return "Start Date is required";

    const currentDate = new Date();
    if (isAfter(selectedDate, currentDate)) {
      return "Start Date cannot be a future date.";
    }

    return true;
  };

  // Custom validation rule for the bank field
  const validateBank = (value) => {
    if (!value) return "Bank is required";
    if (value.length < 3) return "Bank name should be at least 3 characters";
    if (!/^[a-zA-Z\s]*$/.test(value))
      return "Bank name should contain only letters and spaces";
    return true;
  };

  // Custom validation rule for the branch field
  const validateBranch = (value) => {
    if (!value) return "Branch is required";
    if (value.length < 5) return "Branch name should be at least 5 characters";
    if (!/^[a-zA-Z\s]*$/.test(value))
      return "Branch name should contain only letters and spaces";
    return true;
  };

  // Custom validation rule for the account field
  const validateAccount = (value) => {
    if (!value) return "Account No is required";
    if (!/^\d{6,15}$/.test(value))
      return "Account No should contain only numbers with a length between 6 and 15";
    return true;
  };

  //validate email
  const handleEmailChange = (value) => {
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    setIsEmailValid(isValid);
  };

  //validate password
  const isPasswordValid = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/.test(
      password
    );
  };

  //validate confirm password
  const handleConfirmPasswordChange = (value) => {
    const isValid = value === getValues("password");
    setIsConfirmPasswordValid(isValid);
  };

  const handleKeyDownNames = (e) => {
    const allowedCharacters = /^[A-Za-z]*$/;
    if (!allowedCharacters.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleKeyDownNic = (e) => {
    // Allow backspace key
    if (e.key === "Backspace") {
      return;
    }

    const allowedCharacters = /^[0-9vV]*$/;
    if (!allowedCharacters.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleInputChangeNic = (e) => {
    const value = e.target.value;
    const regex = /^[0-9vV]*$/;
    if (!regex.test(value)) {
      e.preventDefault();
    }
    trigger("nic");
  };

  const handleInputChangeContact = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (!regex.test(value)) {
      e.preventDefault();
    }
    trigger("contact");
  };

  // Function to get the current date
  const getEighteenYearsAgoDate = () => {
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    return eighteenYearsAgo;
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>
        <Button
          variant="dark"
          onClick={() => navigate("/staff/hr/employee")}
          style={{ margin: "10px" }}
        >
          <BsArrowLeft /> Employee
        </Button>
        Create Employee
      </h3>

      {/* First Name */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFname">
          <Form.Label>First Name</Form.Label>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: "First Name is required",
            }}
            render={({ field }) => (
              <>
                <Form.Control
                  placeholder="Sahan"
                  {...field}
                  pattern="[A-Za-z]+"
                  title="Please enter only alphabetical characters"
                  onKeyDown={handleKeyDownNames}
                />

                {!errors.firstName && field.value && (
                  <i className="bi bi-check-circle-fill text-success"></i>
                )}
              </>
            )}
          />
          <Form.Text className="text-danger">
            {errors.firstName?.message}
          </Form.Text>
        </Form.Group>

        {/* Last Name */}
        <Form.Group as={Col} controlId="formGridLname">
          <Form.Label>Last Name</Form.Label>
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: "Last Name is required",
              validate: validateName,
            }}
            render={({ field }) => (
              <>
                <Form.Control
                  placeholder="Siriwardana"
                  {...field}
                  pattern="[A-Za-z]+"
                  title="Please enter only alphabetical characters"
                  onKeyDown={handleKeyDownNames}
                />

                {!errors.lastName && field.value && (
                  <i className="bi bi-check-circle-fill text-success"></i>
                )}
              </>
            )}
          />
          <Form.Text className="text-danger">
            {errors.lastName?.message}
          </Form.Text>
        </Form.Group>
      </Row>

      {/* Birth Date */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridBdate">
          <Row>
            <Form.Label>Birth Date</Form.Label>
          </Row>
          <Row>
            <Controller
              name="birthDate"
              control={control}
              rules={{
                required: "Birth Date is required",
                validate: validateBirthDate,
              }}
              render={({ field }) => (
                <>
                  <DatePicker
                    selected={field.value || null}
                    onChange={(date) => {
                      field.onChange(date); // Trigger onChange of react-hook-form
                      trigger("birthDate"); // Trigger validation for 'birthDate' field
                    }}
                    maxDate={getEighteenYearsAgoDate()} // Disable future dates
                    className="form-control mx-2"
                  />

                  {!errors.birthDate && field.value && (
                    <i className="bi bi-check-circle-fill text-success"></i>
                  )}
                </>
              )}
            />
          </Row>
          <Form.Text className="text-danger">
            {errors.birthDate?.message}
          </Form.Text>
        </Form.Group>

        {/* NIC */}
        <Form.Group as={Col} controlId="formGridNic">
          <Form.Label>NIC</Form.Label>
          <Controller
            name="nic"
            control={control}
            rules={{ required: "NIC is required", validate: validateNIC }}
            render={({ field }) => (
              <>
                <Form.Control
                  placeholder="791161645v"
                  {...field}
                  maxLength="12"
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("nic"); // Trigger validation for 'nic' field
                  }}
                />
                {errors.nic && (
                  <span className="text-danger">{errors.nic.message}</span>
                )}
                {!errors.nic && field.value && (
                  <i className="bi bi-check-circle-fill text-success"></i>
                )}
              </>
            )}
          />
        </Form.Group>

        {/* Contact No. */}
        <Form.Group as={Col} controlId="formGridContact">
          <Form.Label>Contact No.</Form.Label>
          <Controller
            name="contact"
            control={control}
            rules={{
              required: "Contact No. is required",
              pattern: {
                value: /^[0-9]{10}$/, // Regex pattern for 10-digit numbers
                message: "Contact No. must be a 10-digit number",
              },
            }}
            render={({ field }) => (
              <>
                <Form.Control
                  type="text"
                  placeholder="0715897598"
                  {...field}
                  onChange={(e) => {
                    // Remove non-numeric characters and limit to maximum length
                    const input = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    field.onChange(input);
                  }}
                  maxLength="10" // Set maximum length
                />

                {field.value?.length === 10 && (
                  <i className="bi bi-check-circle-fill text-success"></i>
                )}

                {errors.contact && (
                  <Form.Text className="text-danger">
                    {errors.contact.message}
                  </Form.Text>
                )}
              </>
            )}
          />
        </Form.Group>
      </Row>

      {/* Address */}
      <Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label>Address</Form.Label>
        <Controller
          name="address"
          control={control}
          rules={{
            required: "Address is required",
            minLength: {
              value: 5,
              message: "Address must be at least 5 characters long",
            },
          }}
          render={({ field }) => (
            <>
              <Form.Control placeholder="1234 Main St" {...field} />

              {!errors.address && field.value && field.value.length >= 5 && (
                <i className="bi bi-check-circle-fill text-success"></i>
              )}
            </>
          )}
        />
        <Form.Text className="text-danger">{errors.address?.message}</Form.Text>
      </Form.Group>

      {/* Gender */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridGender">
          <Form.Label>Gender</Form.Label>
          <div className="mb-3">
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <>
                  <Form.Check
                    inline
                    label="Male"
                    name="gender"
                    type="radio"
                    value="Male"
                    id={`male`}
                    onChange={(e) => {
                      field.onChange(e);
                      field.onBlur(e);
                    }}
                  />
                  <Form.Check
                    inline
                    label="Female"
                    name="gender"
                    type="radio"
                    value="Female"
                    id={`female`}
                    onChange={(e) => {
                      field.onChange(e);
                      field.onBlur(e);
                    }}
                  />
                </>
              )}
            />
          </div>
          <Form.Text className="text-danger">
            {errors.gender?.message}
          </Form.Text>
        </Form.Group>

        {/* Start Date */}

        <Form.Group
          as={Col}
          controlId="formGridSdate"
          style={{ marginRight: "20px", marginLeft: "10px" }}
        >
          <Row>
            <Form.Label>Start date</Form.Label>
          </Row>
          <Row>
            <Controller
              name="startDate"
              control={control}
              rules={{
                required: "Start Date is required",
                validate: validateStartDate,
              }}
              render={({ field }) => (
                <>
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="form-control mx-2"
                  />
                  {errors.startDate && (
                    <span className="text-danger">
                      {errors.startDate.message}
                    </span>
                  )}
                  {!errors.startDate && isBefore(field.value, new Date()) && (
                    <i className="bi bi-check-circle-fill text-success"></i>
                  )}
                </>
              )}
            />
          </Row>
          <Form.Text className="text-danger">
            {errors.startDate?.message}
          </Form.Text>
        </Form.Group>

        {/* Position */}
        <Form.Group as={Col} controlId="formGridRole">
          <Form.Label>Position</Form.Label>
          <Controller
            name="position"
            control={control}
            rules={{ required: "Position is required" }}
            render={({ field }) => (
              <>
                <Form.Select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedPosition(e.target.value); // Update the state here
                  }}
                >
                  <option value="">Choose...</option>
                  {designations.map((designation) => (
                    <option key={designation._id} value={designation.position}>
                      {designation.position}
                    </option>
                  ))}
                </Form.Select>

                {!errors.position && field.value && (
                  <i className="bi bi-check-circle-fill text-success"></i>
                )}
              </>
            )}
          />
          <Form.Text className="text-danger">
            {errors.position?.message}
          </Form.Text>
        </Form.Group>
      </Row>

      {/* Bank Details */}
      <Row className="mb-3">
        <h5 className="text-dark">Bank Details</h5>
        <Form.Group as={Col} controlId="formGridBank">
          <Form.Label>Bank</Form.Label>
          <Controller
            name="bank"
            control={control}
            rules={{ required: "Bank is required", validate: validateBank }}
            render={({ field }) => (
              <>
                <Form.Control
                  placeholder="Sampath Bank"
                  {...field}
                  pattern="[A-Za-z]+"
                  title="Please enter only alphabetical characters"
                  onKeyDown={handleKeyDownNames}
                />
                {!errors.bank && field.value && (
                  <i className="bi bi-check-circle-fill text-success"></i>
                )}
              </>
            )}
          />
          <Form.Text className="text-danger">{errors.bank?.message}</Form.Text>
        </Form.Group>

        {/* Branch */}
        <Form.Group as={Col} controlId="formGridBranch">
          <Form.Label>Branch</Form.Label>
          <Controller
            name="branch"
            control={control}
            rules={{ required: "Branch is required", validate: validateBranch }}
            render={({ field }) => (
              <>
                <Form.Control
                  placeholder="Maharagama"
                  {...field}
                  pattern="[A-Za-z]+"
                  title="Please enter only alphabetical characters"
                  onKeyDown={handleKeyDownNames}
                />

                {!errors.branch && field.value && (
                  <i className="bi bi-check-circle-fill text-success"></i>
                )}
              </>
            )}
          />
          <Form.Text className="text-danger">
            {errors.branch?.message}
          </Form.Text>
        </Form.Group>

        {/* Account */}
        <Form.Group as={Col} controlId="formGridAccount">
          <Form.Label>Account No</Form.Label>
          <Controller
            name="account"
            control={control}
            rules={{
              required: "Account No is required",
              validate: validateAccount,
            }}
            render={({ field }) => (
              <>
                <Form.Control
                  type="number"
                  placeholder="200045879"
                  min="0" // Set the minimum value to 0 to prevent entering negative numbers
                  {...field}
                  onChange={(e) => {
                    // Prevent entering more than 15 numbers
                    const input = e.target.value.slice(0, 15);
                    field.onChange(input);
                    validateAccount(input); // Call validateAccount on each change
                  }}
                />

                {errors.account && errors.account.type === "validate" && (
                  <i className="bi bi-x-circle-fill text-danger"></i>
                )}
                {validateAccount(field.value) === true && (
                  <i className="bi bi-check-circle-fill text-success"></i>
                )}
              </>
            )}
          />
          <Form.Text className="text-danger">
            {errors.account?.message}
          </Form.Text>
        </Form.Group>
      </Row>

      {/* Add a photo and other documents */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formImage">
          <Form.Label>Add a photo *(.jpg, .jpeg, .png only)</Form.Label>
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <ImageUpload
                id="photo" // Pass the ID for the ImageUpload component
                onInput={(id, file, isValid) => {
                  field.onChange(file); // Trigger the onChange event for the photo field
                  field.onBlur(); // Trigger the onBlur event for validation
                }}
                errorText={errors.photo?.message}
              />
            )}
          />
        </Form.Group>
        {/* Documents */}
        <Form.Group as={Col} controlId="formFileDocuments">
          <Form.Label>Add other documents *(.pdf only)</Form.Label>
          <FileUpload
            id="documents"
            accept=".pdf"
            onInput={fileInputHandler}
            errorText={errors.documents?.message}
          />
        </Form.Group>
      </Row>

      {/* Other Details */}
      <Form.Group className="mb-3" controlId="formGridExtra">
        <Form.Label>Other Details</Form.Label>
        <Controller
          name="otherDetails"
          control={control}
          render={({ field }) => (
            <Form.Control as="textarea" rows={3} {...field} />
          )}
        />
        <Form.Text className="text-danger">
          {errors.otherDetails?.message}
        </Form.Text>
      </Form.Group>

      {/* System Credentials */}
      {/* Email */}
      {/* Conditional rendering of credentials based on selected position */}
      {selectedPosition !== "Technician" && (
        <Row className="mb-3 credentials">
          <h5 className="text-dark">System Credentials</h5>
          <h6 className="text-primary">
            *Only needed for managers or supervisor
          </h6>
          {/* Email */}
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleEmailChange(e.target.value);
                    }}
                  />
                  {isEmailValid && (
                    <i
                      className="bi bi-check-circle-fill text-success"
                      style={{ marginLeft: "10px" }}
                    ></i>
                  )}
                </>
              )}
            />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>

          {/* Password */}
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field }) => (
                <>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />

                  {showPassword ? (
                    <BiHide
                      onClick={() => setShowPassword(false)}
                      className="text-primary"
                    />
                  ) : (
                    <BiShow
                      onClick={() => setShowPassword(true)}
                      className="text-primary"
                    />
                  )}

                  {field.value && isPasswordValid(field.value) && (
                    <i
                      className="bi bi-check-circle-fill text-success"
                      style={{ marginLeft: "10px" }}
                    ></i>
                  )}
                </>
              )}
            />
            <Form.Text className="text-danger">
              {errors.password?.message}
            </Form.Text>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group as={Col} controlId="formGridConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm Password is required",
                validate: (value) => {
                  const isValid = value === getValues("password");
                  setIsConfirmPasswordValid(isValid);
                  return isValid || "The passwords do not match";
                },
              }}
              render={({ field }) => (
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleConfirmPasswordChange(e.target.value);
                    }}
                  />
                  {showConfirmPassword ? (
                    <BiHide
                      onClick={() => setShowConfirmPassword(false)}
                      className="text-primary"
                    />
                  ) : (
                    <BiShow
                      onClick={() => setShowConfirmPassword(true)}
                      className="text-primary"
                    />
                  )}

                  {field.value &&
                    isPasswordValid(field.value) &&
                    isConfirmPasswordValid && (
                      <i
                        className="bi bi-check-circle-fill text-success"
                        style={{ marginLeft: "10px" }}
                      ></i>
                    )}
                </div>
              )}
            />

            <Form.Text className="text-danger">
              {errors.confirmPassword?.message}
            </Form.Text>
          </Form.Group>
        </Row>
      )}
      {/* New Fiels */}
      {/*<Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label>New Field</Form.Label>
        <Controller
          name="newField"
          control={control}
          rules={{
            required: "Address is required",
          }}
          render={({ field }) => (
            <>
              <Form.Control placeholder="Say something" {...field} />
            </>
          )}
        />
        <Form.Text className="text-danger">
          {errors.newField?.message}
        </Form.Text>
        </Form.Group>*/}

      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddEmp;
