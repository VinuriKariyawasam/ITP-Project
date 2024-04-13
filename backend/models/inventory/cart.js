const mongoose = require("mongoose");

const schema = mongoose.Schema;

const cartSchema = new schema({
    Product_name: {
        type: String,
        required: true
    },
    Unit_price: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    image:{
        type: String,
    },

})

cartSchema.statics.clearAllData = async function() {
    try {
      await this.deleteMany({});
      console.log("All data cleared from the cart collection.");
    } catch (error) {
      console.error("Error clearing data from the cart collection:", error);
      throw error; // Propagate the error if needed
    }
  };
  
const cart = mongoose.model("cart", cartSchema);


module.exports = cart;
