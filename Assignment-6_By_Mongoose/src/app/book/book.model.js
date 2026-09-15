
const {Schema, model } = require("mongoose");

const bookSchema = new Schema(
     {
        title:{type:String, required:true},
        author:{type:String, required:true},
        year: Number,
        genres:[String],

     },
     {
        timestamps:true,
        _id:true
     }
  )

  const Book = model('Book',bookSchema,'books');
  module.exports = Book;