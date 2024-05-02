const {config} = require("dotenv");
const FeedbackReviewModel = require("../../models/CAM/FeedbackReviewModel"); //import feedback model
const HttpError = require("../../models/http-error");

class FeedbackReviewController{
     //create feedback controller function
  static async createFeedbackReview(req, res, next) {
    try{
      const generateReviewId = () => {
        // Generate a random number between 1 and 999 for the last 5 digits
        const randomNumber = Math.floor(Math.random() * 999) + 1;
        const randomDigits = randomNumber.toString().padStart(5, "0");
        
        // Construct the consiltation ID
        const reviewId = `FR${randomDigits}`;
        
        return reviewId;
      }
         // Example usage
         const reviewId = generateReviewId();
         console.log(reviewId); 

      // Log the request body to see the uploaded data
      console.log("Request Body:", req.body);

      const giveCurrentDate= () => {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        //const time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        //const dateTime = date + '_' + time;
        return date;
    };

    const giveCurrentTime= () => {
        const today = new Date();
        //const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        //const dateTime = date + '_' + time;
        return time;
    };
      const date = giveCurrentDate();
      const time = giveCurrentTime();

       // Assign properties one by one to the new review object
       const newReview = new FeedbackReviewModel();
       newReview.reviewId  = reviewId ;
       newReview.feedbackReview = feedbackReview;
       newReview.date = date;
       newReview.time = time;
       
 
       //save review to database
       const savedFeedbackReview = await newReview.save();
       // Send success response
       return res.status(200).json({ message: "Feedback created successfully", savedFeedbackReview});
    }
    catch (error) {
        // Log the error for debugging purposes
        console.error("Error while fetching(sending) feedback review to db:", error);
        // Handle any errors that occur during feedback creation
        const err = new HttpError(
          "Failed to create feedback. Please try again.",
          500
        );
        return next(err);
      }
}

}

module.exports = FeedbackReviewController;