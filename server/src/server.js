
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "node:crypto";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
 ,
      "https://browniee-hindu.vercel.app/",
    ],
  })
);

app.use(express.json());

// Temporary product data.
// We'll replace this with MongoDB in the next milestone.
const products = [
  {
    id: "brownie-1",
    name: "Classic Chocolate Brownie",
    price: 149,
    category: "Classic",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700",
    description: "Rich chocolate with a fudgy centre.",
  },
  {
    id: "brownie-2",
    name: "Chocolate Fudge Brownie",
    price: 199,
    category: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700",
    description: "An extra-indulgent chocolate treat.",
  },
  {
    id: "brownie-3",
    name: "Sweet Celebration Box",
    price: 9,
    category: "Gift Box",
    image:
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=700",
    description: "A delicious gift for someone special.",
  },
];


// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running!",
  });
});
app.get("/", (req, res) => {
  res.json({
    success: true,
    count: products.length,
    products,
  });
});
// Get all products
app.get("/api/products", (req, res) => {
  res.json({
    success: true,
    count: products.length,
    products,
  });
});

// Get a single product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    (item) => item.id === req.params.id
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    product,
  });
});


app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    let amountInRupees = 0;

    for (const item of items) {
      const product = products.find(
        (p) => String(p._id ?? p.id) === String(item.id)
      );

      const quantity = Number(item.quantity);

      if (
        !product ||
        !Number.isSafeInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product or quantity.",
        });
      }

      amountInRupees += Number(product.price) * quantity;
    }

    const amountInPaise = Math.round(amountInRupees * 100);

    if (
      !Number.isSafeInteger(amountInPaise) ||
      amountInPaise <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount.",
      });
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `bb_${crypto.randomUUID().replaceAll("-", "").slice(0, 32)}`,
    });

    return res.status(201).json({
      success: true,
      order,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not create payment order.",
    });
  }
});


app.listen(PORT, () => {
  console.log(`🍫 Brownie Bliss API: http://localhost:${PORT}`);
});
