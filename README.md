# 🍫 Brownie Bliss – Online Bakery & E-commerce Platform


A modern, responsive online bakery e-commerce platform built to provide customers with a seamless shopping experience for delicious brownies.

**🌐 Live Demo:** [https://browniee-hindu.vercel.app/](https://browniee-hindu.vercel.app/)

**🚀 Explore the Live Application**

Visit the website to explore the Brownie Bliss online bakery experience.
A modern, responsive online bakery e-commerce platform built to provide customers with a seamless shopping experience for delicious brownies.

Brownie Bliss combines an attractive user interface with powerful full-stack functionality, allowing customers to explore products, manage shopping carts, and make online payments.

## 🌟 Features

- 🛍️ **Product Browsing** – Explore available brownie products.
- 🛒 **Shopping Cart** – Add, remove, and manage products.
- 💳 **Online Payments** – Razorpay payment gateway integration.
- 📱 **Responsive Design** – Optimized for desktop, tablet, and mobile.
- 🔐 **Authentication** – User authentication (if implemented).
- 📦 **Order Management** – Manage customer orders.
- ⚡ **Modern UI** – Clean and attractive bakery-themed interface.
- 🔗 **REST API** – Frontend and backend communication.

## 🛠️ Tech Stack

### Frontend
- Next.js
- React.js
- JavaScript
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API

### Payment Integration
- Razorpay

### Tools
- Git & GitHub
- Postman
- VS Code
- Cloudinary (if configured)

## 📂 Project Structure

```text
brownie-bliss/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

*Adjust this structure to match your actual repository.*

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd brownie-bliss
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside your backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLIENT_URL=http://localhost:3000
```

Add the environment variables required by your actual frontend and backend implementation. Never commit real credentials.

### 5. Start the backend

```bash
cd backend
npm run dev
```

### 6. Start the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Open the local URL displayed by your frontend development server.

## 💳 Payment Integration

Brownie Bliss integrates Razorpay to support online payments.

Payment workflow:

1. Customer selects brownie products.
2. Products are added to the shopping cart.
3. Customer proceeds to checkout.
4. Backend creates a Razorpay order.
5. Customer completes payment.
6. Backend verifies the payment signature.
7. Order status is updated after successful verification.

## 📸 Screenshots

Add your actual project screenshots here.

| Homepage | Products |
|---|---|
| Add homepage screenshot | Add product screenshot |

| Shopping Cart | Checkout |
|---|---|
| Add cart screenshot | Add checkout screenshot |

## 🔮 Future Enhancements

- Admin dashboard for product management.
- Advanced product search and filtering.
- Customer reviews and ratings.
- Order tracking.
- Email notifications.
- Discount coupons and promotional offers.
- Wishlist functionality.
- Sales analytics dashboard.

## 🔒 Security

- Store sensitive credentials in environment variables.
- Never expose Razorpay secret keys in frontend code.
- Verify payment signatures on the backend.
- Validate incoming API requests.
- Keep dependencies updated.

## 🎯 Project Objective

The primary objective of Brownie Bliss is to develop a complete bakery e-commerce experience while demonstrating practical full-stack development skills, REST API integration, database management, responsive UI development, and online payment processing.

## 👨‍💻 Developer

**Dinesh**

Full Stack Developer | MERN Stack | React.js | Node.js

GitHub: [Your GitHub Profile](https://github.com/)

LinkedIn: [Your LinkedIn Profile](https://linkedin.com/)

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details, if included.

---

⭐ If you find this project interesting, consider giving the repository a star!

**Built with ❤️ and lots of chocolate 🍫**
