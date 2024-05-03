const { config } = require("dotenv");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable,deleteObject } = require("firebase/storage");
const multer = require ("multer");
const { firebaseConfig } = require("../../config/firebase-config");


const firebasaeApp = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebasaeApp);

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() }).single("image");
const ImageUpload = (req, res) => {
  upload(req, res, async (err) => {
    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage,  `Appointment/${req.file.originalname}_${dateTime}.${req.file.mimetype}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);
        req.imageUrl = downloadURL;
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
        return res.status(400).send(error.message)
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}
};
const DeleteImage = async (req, res) => {
    const imageUrl = req.body.Url;
    console.log(imageUrl)
    try {
      const fileRef = ref(storage, imageUrl);
      await deleteObject(fileRef);
      console.log('File successfully deleted from Firebase Storage.');
      return res.status(200).send('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      return res.status(500).send('Error deleting file');
    }
  };
  

module.exports = {ImageUpload , DeleteImage };