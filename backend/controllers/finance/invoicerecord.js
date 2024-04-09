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

// Controller function to save data in OnlineRecordModel
const saveOnlineRecord = async (req, res) => {
  const { paymentInvoiceId, name, date, amount, downloadURL } = req.body;

  try {
    // Create a new instance of OnlineRecordModel with provided data
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

// Ensure that both functions are properly exported
module.exports = { saveInPersonRecord, saveOnlineRecord };
