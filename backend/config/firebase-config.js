// firebase-config.js
require('dotenv').config();

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey : process.env.API_KEY,
   authDomain : process.env.AUTH_DOMAIN,
   projectId : process.env.PROJECT_ID,
   storageBucket : process.env.STORAGE_BUCKET,
   messagingSenderId : process.env.MESSAGING_SENDER_ID,
   appId : process.env.APP_ID,
};

module.exports = { firebaseConfig };
