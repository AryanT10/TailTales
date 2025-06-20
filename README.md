# 🐾 TailTales

**TailTales** is a real-time, full-stack web application built to connect pet owners with trusted local service providers. The platform allows users to seamlessly book pet-related services like grooming and veterinary care, and shop for curated pet products — all in one place.

---

## 🚀 Features

### 👩‍⚕️ For Customers

- Browse and book local pet services (vet, grooming, etc.)
- View provider availability and book appointments
- Add products to cart and place orders via Stripe
- Receive real-time order/appointment status updates

### 🧑‍⚕️ For Providers

- Secure provider dashboard login
- Add/edit services offered
- View and manage customer appointments
- Update appointment status (Completed, Cancelled, etc.)

---

## 🛠️ Tech Stack

### 🔧 Frontend

- React.js with React Router
- Vercel (Deployment)
- Styled using custom CSS

### 🔧 Backend

- Node.js with Express
- Render (Deployment)
- Stripe API for payments
- Firebase Firestore for real-time data
- Firebase Auth for login & role-based access

---

---

## 🧪 Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tailtales.git
cd tailtales
```

### 2. Install dependencies

```bash
cd client
npm install

cd ../backend
npm install
```

### 3. Set up ./env files

Create .env files in both client/ and backend/ with necessary Firebase and Stripe keys.

### 4. Run the app

```bash
# In /client
npm run dev

# In /backend
npm run start
```

### Future Plans

Provider service area filtering by location

• Email and SMS notifications

• Admin dashboard for analytics and moderation

⸻

🤝 Get Involved

I’m planning to partner with local vets and stores in Hamilton, and expand further if the platform gains traction.
As I’m still early in my journey as a developer and entrepreneur — I welcome any feedback, feature suggestions, or collaboration offers!
