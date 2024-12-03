const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const phoneRegex = /^(?:\+84|0)(3|5|7|8|9)\d{8}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuid(),
    },
    username: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate usernames
      minlength: 3,
      maxlength: 50,
    },
    first_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      validate: {
        validator: function (v) {
          return emailRegex.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone_number: {
      type: String,
      required: true,
      unique: true, // Ensure phone number is unique
      validate: {
        validator: function (v) {
          return phoneRegex.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Enforce stronger passwords
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
