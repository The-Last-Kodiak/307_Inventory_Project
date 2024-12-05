// backend/databaseSchema.js
import mongoose from "mongoose";

const MIN_PW_LEN = 8;
const MIN_PR_LEN = 3;

//copied from IA4 with slight changes
//represents a user's account
//may need to add attribute connecting User and Inventory
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < MIN_PW_LEN)
          throw new Error(
            "Invalid job, must be at least " + MIN_PW_LEN + " characters.",
          );
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < MIN_PW_LEN)
          throw new Error(
            "Invalid job, must be at least " + MIN_PW_LEN + " characters.",
          );
      },
    },
  },
  { collection: "users_list" },
);

//add inventory scehema in database here
//including all attributes of an product in inventory
const InventorySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < MIN_PW_LEN)
          throw new Error(
            "Invalid job, must be at least " + MIN_PW_LEN + " characters.",
          );
      },
    },
    product_name: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < MIN_PR_LEN)
          throw new Error(
            "Invalid job, must be at least " + MIN_PR_LEN + " characters.",
          );
      },
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if(value.length < MIN_PR_LEN)
          throw new Error(
            "SKU must be at least " + MIN_PR_LEN + " characters."
        );
      },
    },
    price: {
      type: Number,
      required: true,
      min: [1, "price must be > 0"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity must be >= 0"],
    },
    supplier: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < MIN_PR_LEN)
          throw new Error(
            "Invalid job, must be at least " + MIN_PR_LEN + " characters.",
          );
      },
    },
    description: {
      type: String,
        required: true,
        trim: true,
    },
    image_path: {
        type: String,
        required: false,
        trim: true,
    }
  },
  { collection: "inventory" },
);

const User = mongoose.model("User", UserSchema);
const Inventory = mongoose.model("Inventory", InventorySchema);

export default {
  User,
  Inventory,
};
