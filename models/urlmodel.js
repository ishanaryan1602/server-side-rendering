const mongoose = require('mongoose');

const urlschema = new mongoose.Schema(
    {
      shortUrl: {
        type: String,
        required: true,
        unique: true,
      },
      longUrl: {
        type: String,
        required: true,
      },
      viewHistory: [
        {
          timestamp: {
            type: Number,
          },
        },
      ],
    },
    { timeseries: true }
  );
  
  const urlModel = mongoose.model("url", urlschema);

  module.exports = urlModel;