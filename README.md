# 🛒 Online Grocery Ordering System

## 📌 Project Description
The **Online Grocery Ordering System** is a **full-stack e-commerce web application** built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
It allows customers to browse groceries, manage their shopping cart, and complete secure checkouts, while providing admins with powerful tools for **user, product, and order management**.

---

## 🚀 Key Features

### 👤 Customer Features
- **Secure Authentication**: Register/login with JWT-based authentication.  
- **Product Browsing**: View a paginated catalog with product images, prices, and details.  
- **Product Details**: Access complete information about each grocery item.  
- **Shopping Cart**: Add, update, and remove items — cart persists using `localStorage`.  
- **Checkout Flow**: Step-by-step process for shipping, payment method selection, and order confirmation.  
- **Order History**: Personal profile page to view past orders.  

### 🔐 Admin Features
- **Protected Admin Routes**: Access restricted to admins only.  
- **User Management (CRUD)**: View, edit, delete users, and assign admin privileges.  
- **Product Management (CRUD)**: Create, update, delete products, with support for image uploads.  
- **Order Management**: View all orders and mark them as delivered (extendable).  

---

## 🛠 Technology Stack

**Frontend:**  
- React.js with React Router for navigation  
- Axios for API calls  
- React-Bootstrap for responsive design  
- Context API for global state management  

**Backend:**  
- Node.js with Express.js for REST APIs  
- MongoDB with Mongoose ODM  
- JWT for authentication  
- Bcrypt.js for password hashing  
- Multer for image uploads  

---

## ⚙ How It Works
1. **User Registration/Login** → Customers sign up or log in securely with JWT.  
2. **Browse Products** → Frontend fetches product data from backend API with pagination.  
3. **Manage Cart** → Items added/removed/updated are saved locally via `localStorage`.  
4. **Checkout** → Multi-step flow: Shipping → Payment → Confirmation.  
5. **Order Tracking** → Customers can review order history in their profile.  
6. **Admin Dashboard** → Admins manage users, products, and orders via protected routes.  

---

## 🎯 Purpose
This project demonstrates a **real-world e-commerce platform** with all the essential features of an online store.  
It provides a seamless **shopping experience** for customers and a **robust admin system** for business management.  

---
