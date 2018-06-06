var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema ({

    title: {
        type: String,
        required: true,
        unique: true
    },

    link: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    saved: {
        type: Boolean,
        default: false
    },
    // `note` is an array of objects that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with all the associated Notes
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]

});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// export the Article Model
module.exports = Article;