// backend/scripts/seedDatabase.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import db from "../databaseSchema.js";

const users = [
  {
    username: "john_doe",
    password: "password123",
  },
  {
    username: "jane_smith",
    password: "securePass456",
  },
  {
    username: "alex_jones",
    password: "alex12345",
  },
  {
    username: "emily_brown",
    password: "emilySecure789",
  },
  {
    username: "michael_white",
    password: "michael98765",
  },
  {
    username: "new_user",
    password: "newUserPassword123",
  },
];
// ?retryWrites=true&w=majority&appName=Cluster0"
const inventories = [
  {
    username: "john_doe",
    products: [
      {
        product_name: "Laptop",
        sku: "LAP123",
        price: 999.99,
        quantity: 10,
        supplier: "TechSupplier",
        description: "A high-performance laptop.",
      },
      {
        product_name: "Keyboard",
        sku: "KEY456",
        price: 49.99,
        quantity: 25,
        supplier: "AccessoryShop",
        description: "A mechanical keyboard for gaming.",
      },
    ],
  },
  {
    username: "jane_smith",
    products: [
      {
        product_name: "Smartphone",
        sku: "PHN123",
        price: 699.99,
        quantity: 15,
        supplier: "MobileTech",
        description: "A new model smartphone with 128GB storage.",
      },
      {
        product_name: "Headphones",
        sku: "HP456",
        price: 89.99,
        quantity: 30,
        supplier: "AudioMax",
        description: "Noise-canceling wireless headphones.",
      },
    ],
  },
  {
    username: "alex_jones",
    products: [
      {
        product_name: "Tablet",
        sku: "TBL123",
        price: 499.99,
        quantity: 20,
        supplier: "TechHub",
        description: "A tablet with 10-inch screen.",
      },
      {
        product_name: "Mouse",
        sku: "MSE789",
        price: 29.99,
        quantity: 50,
        supplier: "ComputerStore",
        description: "Ergonomic wireless mouse.",
      },
    ],
  },
  {
    username: "emily_brown",
    products: [
      {
        product_name: "Monitor",
        sku: "MON123",
        price: 199.99,
        quantity: 10,
        supplier: "VisionStore",
        description: "24-inch full HD monitor.",
      },
      {
        product_name: "Router",
        sku: "RTR456",
        price: 59.99,
        quantity: 40,
        supplier: "NetworkSolutions",
        description: "Wi-Fi router with high-speed internet support.",
      },
    ],
  },
  {
    username: "michael_white",
    products: [
      {
        product_name: "Printer",
        sku: "PRT123",
        price: 129.99,
        quantity: 8,
        supplier: "OfficeTech",
        description: "Wireless color printer.",
      },
      {
        product_name: "External Hard Drive",
        sku: "HDD456",
        price: 89.99,
        quantity: 20,
        supplier: "DataStorageInc",
        description: "1TB portable external hard drive.",
      },
    ],
  },
  {
    username: "new_user",
    products: Array.from({ length: 30 }, (_, index) => ({
      product_name: `Product ${index + 1}`,
      sku: `SKU${index + 1}`,
      price: (Math.random() * 1000).toFixed(2),
      quantity: Math.floor(Math.random() * 100) + 1,
      supplier: `Supplier ${index + 1}`,
      description: `Description for product ${index + 1}`,
    })),
  },
];

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

mongoose
  .connect(
    "mongodb+srv://the_last_kodiak:CoordinatER@cluster0.ofzol.mongodb.net/SupplyHub",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log("Connected to MongoDB");

    // Hash each user's password and then insert into the "users_list" collection
    const hashedUsers = users.map(async (user) => {
      const hashedPassword = await hashPassword(user.password);
      return {
        username: user.username,
        password: hashedPassword,
      };
    });

    // Wait for all users to be hashed
    Promise.all(hashedUsers)
      .then(async (hashedUsers) => {
        await db.User.insertMany(hashedUsers);
        console.log("Users inserted with hashed passwords");

        // Insert inventory data into the "inventory" collection
        inventories.forEach(async (inventory) => {
          await db.Inventory.insertMany(
            inventory.products.map((product) => ({
              ...product,
              username: inventory.username,
            })),
          );
        });

        console.log("Inventory items inserted");
      })
      .catch((err) => {
        console.error("Error inserting users:", err);
      });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
