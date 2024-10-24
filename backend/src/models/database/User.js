const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const phone_regex = /^(?:\+84|0)(3|5|7|8|9)\d{8}$/;
const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.UUID,
      default: uuid(),
    },
    username: {
      type: String,
      require: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return email_regex.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone_number: {
      type: String,
      require: true,
      validate: {
        validator: function (v) {
          return phone_regex.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
 