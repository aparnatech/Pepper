const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const blogSchema = new Schema({
    image: { 
        type: Schema.Types.Mixed, 
        required: true,  
    },
    title: { 
      type: String,
      required: true,
  },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = Blog = mongoose.model("blogdetails", blogSchema);