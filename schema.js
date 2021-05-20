const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const RolesSchema = new mongoose.Schema({
  role: {type: String},
  permission: {type: Array}
});

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function() {
  const salt = 10;
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, salt);
})

const user = mongoose.model("User", UserSchema);

const CommentsSchema = new mongoose.Schema({
  comment: {type: String, required: true},
  commenter: {type: mongoose.Schema.Types.ObjectId, ref: user},
})

const comment = mongoose.model("Comment", CommentsSchema);

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: user },
});

const article = mongoose.model("Article", ArticleSchema);

module.exports.User = user;
module.exports.Comment = comment;
module.exports.Article = article;