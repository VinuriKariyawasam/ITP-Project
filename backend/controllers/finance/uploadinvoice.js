const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const { firebaseConfig } = require("../../config/firebase-config");

// Initialize a firebase application
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);

// Setting up multer as a middleware to grab PDF uploads
const upload = multer({ storage: multer.memoryStorage() }).single("file"); // Specify the file field name

const uploadInvoice = (req, res) => {
    upload(req, res, async (err) => {
        try {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading
                console.error("Multer error occurred:", err);
                throw new Error("Multer error occurred");
            } else if (err) {
                // An unknown error occurred
                console.error("Unknown error occurred:", err);
                throw new Error("Unknown error occurred");
            }

            // Check if file exists in the request
            if (!req.file) {
                console.error("No file uploaded");
                throw new Error("No file uploaded");
            }

            const dateTime = giveCurrentDateTime();

            const storageRef = ref(storage, `invoices/${req.file.originalname}_${dateTime}.pdf`);

            // Create file metadata including the content type
            const metadata = {
                contentType: req.file.mimetype,
            };

            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

            // Grab the public URL
            const downloadURL = await getDownloadURL(snapshot.ref);

            console.log('File successfully uploaded.');
            const response = {
                message: 'File uploaded to Firebase Storage',
                name: req.file.originalname,
                type: req.file.mimetype,
                downloadURL: downloadURL
            };
            console.log('Response:', response); // Log the response
            return res.status(200).json(response);
        } catch (error) {
            console.error('Error uploading file:', error);
            return res.status(400).send(error.message);
        }
    });
};

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    const dateTime = date + '_' + time;
    return dateTime;
};

module.exports = { uploadInvoice };
