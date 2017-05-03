// ```
// ruku.model.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// ruku.model.js may be freely distributed under the MIT license
// ```

// */app/models/ruku.model.js*

// ## Ruku Model

// Note: MongoDB will autogenerate an _id for each Ruku object created

// Grab the Mongoose module
import mongoose from 'mongoose';

// Create a `schema` for the `Ruku` object
let rukuSchema = new mongoose.Schema({
  user: { type : String},
  name: { type : String},
  price: Number,
  date: String,
  location: String,
  number: Number,
  text: String
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Ruku', rukuSchema);
