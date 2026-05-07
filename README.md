# CampusMatch 🎓

**CampusMatch** is a premium, AI-powered college discovery and prediction platform built to help students make the best decisions for their higher education. With an ultra-modern aesthetic, interactive comparison tools, and historic data-driven rank predictors, finding the right institution has never been easier.

![CampusMatch Overview](https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2070&q=80)

## ✨ Features

- **Smart Predictor Engine:** Input your competitive exam rank (JEE Main, Advanced, NEET, BITSAT) and category to instantly discover colleges where you have a strong chance of admission based on historic cutoff data.
- **Head-to-Head Comparison:** Compare up to 3 colleges side-by-side evaluating fees, ratings, and placement records with dynamic "Best-in-Class" badges and interactive progress bars.
- **Premium Discovery Dashboard:** Browse curated engineering, medical, and commerce institutions with advanced filtering (by location, maximum fees, etc.).
- **Save & Shortlist:** Create an account to save your favorite colleges to a personalized, sleek shortlist dashboard for easy access later.
- **Beautiful Aesthetic UI:** Built from the ground up with a custom Emerald/Teal glassmorphism design system, smooth micro-animations, and responsive layouts.

## 🛠️ Technology Stack

**Frontend:**
- React 18 (Vite)
- TypeScript
- Tailwind CSS (Premium Emerald/Teal theme)
- React Router DOM (Routing)
- Axios (API Client)
- Lucide React (Icons)

**Backend:**
- Node.js & Express.js
- TypeScript
- PostgreSQL (Hosted on Neon)
- Prisma ORM (Database Management)
- JSON Web Tokens (JWT) & bcrypt (Authentication)

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- PostgreSQL instance (or Neon DB URL)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/CampusMatch.git
cd CampusMatch
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your database credentials and JWT secret.
   ```bash
   cp .env.example .env
   ```
4. Run database migrations:
   ```bash
   npx prisma db push
   # or npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and ensure the API URL points to your backend.
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173` (or the port Vite provides)*

## 🎨 Design System

CampusMatch relies heavily on a custom Tailwind CSS configuration designed to look like a premium SaaS application. Key elements include:
- `bg-slate-900` for deep, sophisticated dark sections.
- `text-emerald-600` and `text-teal-500` for vibrant, trusting primary accents.
- `backdrop-blur-xl` for heavy glassmorphic UI elements over images.
- Heavy use of subtle gradients and SVG ring charts.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
