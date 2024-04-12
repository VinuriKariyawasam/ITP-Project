const inPersonRecordSchema = require("../../models/finance/inpersonrecordModel");
const onlineRecordSchema = require("../../models/finance/onlinerecordModel");

const saveInPersonRecord = async (req, res) => {
  const { paymentInvoiceId, name, date, amount, downloadURL } = req.body;

  try {
    const newRecord = new inPersonRecordSchema({
      paymentInvoiceId,
      name,
      date,
      amount,
      downloadURL,
    });

    await newRecord.save();

    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const saveOnlineRecord = async (req, res) => {
  const { paymentInvoiceId, name, date, amount, downloadURL } = req.body;

  try {

    const newRecord = new onlineRecordSchema({
      paymentInvoiceId,
      name,
      date,
      amount,
      downloadURL,
    });

    await newRecord.save();

    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllInPersonRecords = async (req, res) => {
  try {
    const records = await inPersonRecordSchema.find();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllOnlineRecords = async (req, res) => {
  try {
    const records = await onlineRecordSchema.find();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  saveInPersonRecord,
  saveOnlineRecord,
  getAllInPersonRecords,
  getAllOnlineRecords,
};
