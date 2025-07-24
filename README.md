# SmartFind Kiosk & Admin Dashboard 🚀

📌 Project Overview

SmartFind Kiosk is a full-stack web application designed to streamline in-store navigation and product management.

🛒 Customers can search for products and instantly see the aisle they're located in — making in-store shopping faster and easier.

🧑‍💼 Admins can log in to a dashboard to add, update, or delete product information such as name, price, stock, and aisle location.

📦 Product data is stored persistently using a file-based database and managed via a RESTful API built with Node.js and Express.

This project demonstrates practical CRUD operations, real-time data syncing, responsive UI/UX, and seamless interaction between frontend and backend services.

---

## Live Demo 🌐

Check out the live deployed site here:  
https://harxhhiiitttt.github.io/SmartFind-Kiosk/

---

## Admin Login Credentials 🔐

- **User ID:** `admin`  
- **Password:** `admin123`
---

## Backend RESTful API 🛠️

- Provides endpoints to manage products:  
  - `GET /api/products` — List all products  
  - `POST /api/products` — Add a new product  
  - `PUT /api/products/:id` — Update product stock  
  - `DELETE /api/products/:id` — Delete a product  

- Uses a file-based database (`products.json`) with synchronous file operations to persist product data including ID, name, price, stock, and aisle.

- Supports **CORS** to enable frontend apps running on different ports to interact with the backend.

- Implements error handling for file read/write errors and invalid product IDs (returns 404 with `{ "message": "Product not found" }`).

---

## Admin Dashboard (Frontend) 🎨

- Responsive and modern UI with sidebar navigation tabs:  
  - Dashboard  
  - My Store (product management)  
  - Analytics  
  - Products  
  - Logout  

- Product management features in **My Store** tab:  
  - List products with name, price (₹), stock, aisle, and delete option  
  - Add new products with form validation  
  - Update stock values inline  
  - Delete products with confirmation  

- Dark/light mode toggle and responsive sidebar for better UX.

- Logout tab clears session and redirects to login page.

- Prices formatted with the ₹ symbol for consistency.

- Error handling with user alerts and console logging.

---

## Customer Kiosk (Frontend) 🛒

- Simple, user-friendly search interface to find products by name.

- Displays aisle information for matched products to assist in-store navigation.

- Fetches real-time data from backend to stay consistent with admin updates.

---

## Technologies Used 🛠️

Node.js
Express
JavaScript
HTML5
CSS3

---

## How to Run

1. Clone the repository.  
2. Install backend dependencies and start the server (Node.js and Express required).  
3. Open the Admin Dashboard or Kiosk frontend in a browser.  
4. Use the above admin credentials to log in to the dashboard.  

---

## Contact

For questions or feedback, please reach out at: harshitsamantrai@gmail.com
