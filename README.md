

# 🌟 **Interest Calculator WebApp**

*A Modern FinTech Tracking System Built with Next.js, Tailwind, Node.js & MongoDB*

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-73AA63?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

<p align="center">
  <strong>Your all-in-one Borrower + Investor + Interest Management Dashboard.</strong><br>
  Fully responsive, mobile-first, smooth UI, modern fintech vibes.
</p>

---

# 🚀 **Live Tech Stack**

### **Frontend**

* Next.js (Pages Router)
* Tailwind CSS
* Framer Motion Animations
* SWR for realtime UI updates
* Heroicons (v2)

### **Backend**

* Node.js + Express
* MongoDB Atlas
* Mongoose ORM
* REST API architecture
* Seeding & utilities

---

# 🔮 **What This App Does**

### ✔ Borrower Dashboard

Track dues, payments, redeemable amounts, upcoming deadlines.

### ✔ Investor Panel

Monitor capital deployed, collection ratio, portfolio health.

### ✔ Transaction System

Add loans, interests, durations, receipts, EMIs, payments.

### ✔ Interest Calculator

Simple & compound interest — live preview, sliders, charts (coming).

### ✔ Profile System

Add users, manage borrowers, view payment history.

### ✔ Modern Mobile UI

Floating bottom nav, glassmorphism cards, lavender fintech theme.

---

# 📂 **Project Structure**

```
interest_app/
│
├── backend/
│   ├── index.js
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   └── package.json
│
└── frontend/
    ├── pages/
    ├── components/
    ├── public/
    ├── styles/
    └── package.json
```

---

# ⚙️ **Installation & Setup**

## 🟣 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server runs on: **[http://localhost:5000](http://localhost:5000)**

### **Backend Environment Variables**

Create `.env` inside **backend**:

```
MONGO_URI=your_mongodb_atlas_url
PORT=5000
```

---

## 🔵 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **[http://localhost:3000](http://localhost:3000)**

### **Frontend Environment Variables**

Create `.env.local` inside **frontend**:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

---

# 🧪 **API Endpoints Overview**

### **Profiles**

```
GET /api/profiles
POST /api/profiles
```

### **Transactions**

```
GET /api/transactions
POST /api/transactions
POST /api/transactions/:id/payments
```

### **Summary**

```
GET /api/summary
```

---

# 🎨 **UI/UX Highlights**

* Lavender Ice Background (#F0F1F7)
* Electric Indigo Primary (#5B5FC7)
* Floating Bottom Navigation Bar
* 24px Rounded Cards with Soft Shadows
* Mobile-optimised layouts
* Smooth animations on interaction

---

# 📸 **Screenshots (Add Later)**

You can paste dashboard previews, transaction forms, etc. here once ready.

```
/screenshots
   dashboard.png
   transactions.png
   calculator.png
   portfolio.png
```

---

# 🌱 **Future Enhancements**

* Charts on investor dashboard
* Advanced calculator animations
* WhatsApp/SMS Notification engine
* Profile badges (Gold/Silver/Bronze)
* Monthly revenue analytics

---

# 🤝 **Contributing**

Want to improve the system? Fork → Create branch → Commit → PR ✨

---

# ⭐ **Support the Project**

If this project helped you or you want to hype your GitHub, add a star ⭐ on the repo!

---

# 👩‍💻 **Created by dhrubaparna**

*Designed with love, lavender, and a lot of caffeine.*

---




