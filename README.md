##  Mobile Shopping Application (MSA)📱

A full-stack microservices-based e-commerce platform that allows admins, vendors, and customers to interact through dedicated frontend interfaces. It supports vendor listing, product listings, customer cart/order management, secure payments.

---
## Documentation

- [Basic Functionality](docs/BasicFunctionality/basicFunctionality%20.jpg)
- [Use case diagram](docs/UseCaseDiagram/useCaseDiagram.png)
- [Database Schema](docs/DatabaseSchema/)

---

##  Tech Stack

###  Frontend

* **Customer**: React + TailwindCSS + Zustand + React Hook Form + React Query + Axios
* **Vendor**: React + TailwindCSS + React Hook Form + React Query + Axios
* **Admin**: React (microfrontend architecture)
* **Build Tool**: Vite

### Backend

* **Node.js + Express.js**
* **Service Pattern**
* **RESTful APIs**
* **Sequelize ORM** with MySQL
* **Multer for file upload**

### Third-Party Integrations

* **Razorpay** – Payment gateway
* **AWS S3** – Image upload & storage

---

##  Features

###  Admin Panel

* View all vendors and customers
* Delete vendors/customers in case of policy violations

###  Vendor Dashboard

* CRUD for product listings
* Manage orders
* Update brand logo and profile

###  Customer Portal

* Product search and filtering
* Add/remove items in the cart
* Place orders (no cancellations post-placement)
* Make payments via Stripe
* Manage profile

---

##  Project Structure

```
/MSA
├── /Frontend(Admin) 
├── /Frontend(Customer)
├── /Fronted(Vendor)
├── /backend
├── /docs
```

---



##  Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/iamganeshsalunkhe/mobile-shopping-app.git
cd MSA
```

### 2. Install  backend dependencies

**For backend**
```bash
cd backend
npm install
npm start
```
### 3. Setup a MySQL database:
* Create a new MySQL database and update the database configuration in 
`
config/config.json
` 

### 4. Run database migrations

**In backend folder(MSA/backend)**  
```sh
npx sequelize db:migrate
```
### 5. Install frontend dependencies
**For Admin**
```sh
cd Frontend(Admin)
npm run dev
```
**For Vendor**
```sh
cd Frontend(vendor)
npm run dev
```
**For Customer**
```sh
cd Frontend(customer)
npm run dev
```

---

##  Authentication & Security

* JWT-based auth stored in **HTTP-only cookies**
* Role-based access controls: `admin`, `vendor`, `customer`

---

##  Image Upload

* Vendor logo and product images are uploaded via AWS S3
* Supports **single** image upload (brand-logo) and **multiple** image uploads (products)

---

##  Payments

* Razorpay Checkout integration
* Payments locked after checkout; no cancellation

---


##  Dev Tools

* Nodemon for backend dev
* ESLint + Prettier
* React-Query DevTools, Zustand Devtools, DaisyUI, mantine UI
* Postman
* VS code
* draw.io
* dbdiagram.io
---


##  License

MIT License

---

##  Contributing

Pull requests are welcome. For major changes, please open an issue first.
:)
