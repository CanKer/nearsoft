const mongoose = require('mongoose'),
      random = require('mongoose-simple-random');
const Schema = mongoose.Schema

const QuoteSchema = new Schema({
  quote: String
})

QuoteSchema.plugin(random);

const Quote = mongoose.model("Quote", QuoteSchema)

module.exports = Quote
