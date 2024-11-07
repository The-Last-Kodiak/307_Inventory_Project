import mongoose from "mongoose";

const MIN_PW_LEN = 8;

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
                    throw new Error("Invalid job, must be at least " + MIN_PW_LEN + " characters.");
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < MIN_PW_LEN)
                    throw new Error("Invalid job, must be at least " + MIN_PW_LEN + " characters.");
            },
        },
    },
    { collection: "users_list" }
);


//add inventory scehema in database here
//including all attributes of an item in inventory
const InventorySchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < MIN_PW_LEN)
                    throw new Error("Invalid job, must be at least " + MIN_PW_LEN + " characters.");
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < MIN_PW_LEN)
                    throw new Error("Invalid job, must be at least " + MIN_PW_LEN + " characters.");
            },
        },
    },
    { collection: "inventory" }
);

const User = mongoose.model("User", UserSchema);
const Inventory = mongoose.model("Inventory", InventorySchema);

export default User;