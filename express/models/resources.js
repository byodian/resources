const mongoose = require('mongoose');

// Connect MongoDB 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('conected to MongoDB');
  })
  .catch(error => {
    console.log(error.message);
  })

const ResourceSchema = new mongoose.Schema({
    title: String,
    content: String,
    src: String,
    href: String,
    category: String
});

// SchemaType.prototype.set() - https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-set
// Call toJSON method to transform the data 
// before it gets to the raw mongodb documents or query 
// when response the http request
ResourceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Resource', ResourceSchema);