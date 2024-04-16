const { config } = require("dotenv");
const accidentalSchema = require("../../models/appointment/accidentalRepairs");
const multer = require("multer");
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

exports.addaccidentalAppointment = async (req, res) => {
  try {
    const {userId, name, vType, vNo, dateAccidentaOccured, damagedOccured, contactNo, appointmentdate, appointmenttime } = req.body;
    const image = req.file ? req.file.path : null;

    if (!userId||!name || !vType || !vNo || !dateAccidentaOccured || !damagedOccured || !contactNo || !appointmentdate || !appointmenttime || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

   /* if (typeof contactNo !== "number") {
      return res
        .status(400)
        .json({ error: "" });
    }*/

    const newaccidentalAppointment = new accidentalSchema({
      userId,
      name,
      vType,
      vNo,
      dateAccidentaOccured,
      damagedOccured,
      contactNo,
      appointmentdate,
      appointmenttime,
      image

    });

    await newaccidentalAppointment.save();
    console.log(newaccidentalAppointment);
    res.json({ message: "Appointment Added", accidentalAppointment: newaccidentalAppointment });
  } catch (err) {
    console.error("Error occurred while adding Apointment:", err);
    res.status(500).json({ error: "An error occurred while adding Adding" });
  }
};
exports.getaccidentalAppointment = async (req, res) => {
  accidentalSchema.find().then((accidentalAppointment) => {
    res.json(accidentalAppointment)
  }).catch((err) => {
    console.log(err)
  })

}

exports.updateAccidentalAppointment= async (req, res) => {
  let accidentalAppId = req.params.id;
  //to get existing values
  const {userId, name, vType, vNo, dateAccidentaOccured, damagedOccured, contactNo, appointmentdate, appointmenttime,image } = req.body

  //object to store new values
  const updateAccidentalAppointment = {
    userId,
    name,
    vType,
    vNo,
    dateAccidentaOccured,
    damagedOccured,
    contactNo,
    appointmentdate,
    appointmenttime,
    image
  }

  //to find relavant apoointment to update
  const update = await  accidentalSchema.findByIdAndUpdate(accidentalAppId, updateAccidentalAppointment).then(() => {
      res.status(200).send({ status: "Updated"})
  }).catch((err) => {
      res.status(500).send({ status: "server error with update data", error: err.message });
  })

}

exports.deleteaccidentalAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const accidentalAppointment = await accidentalSchema.findById(id);

    if (!accidentalAppointment) {
      return res.status(404).send({ status: "accidentalAppointment not found" });
    }
   

      accidentalSchema.findByIdAndDelete(id)
        .then(() => {
          res.status(200).send({ status: "Appointment deleted" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ status: "Error with deleting Appointment" });
        });

  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Internal server error" });
  }
};

exports.getaccidentalappointmentbyuserId = async (req, res) => {
  const { userId } = req.params;
  try {
      const accidentalAppointment = await accidentalSchema.find({ userId: userId });
      if (accidentalAppointment) {
          res.status(200).send({ status: "User fetched", data: accidentalAppointment });
      } else {
          res.status(404).send({ status: "User not found" });
      }
  } catch (err) {
      res.status(500).send({ status: "Error with getting user", error: err.message });
  }
}