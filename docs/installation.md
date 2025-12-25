# Installation & Setup

Before you begin, ensure you have the following installed:
- Node.js (v20 or higher)
- npm or yarn

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd "Research Paper Reading Tracker"
```

## 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma Client (creates type-safe database query methods locally)
# This is ALWAYS needed, even with cloud databases
npx prisma generate

# For cloud database (like PostgreSQL on Koyeb):
# Push schema to database without creating migration files
npx prisma db push

# OR for local database with migration tracking:
# npx prisma migrate dev --name init

# Start the development server
npm run dev
```

The backend will start on **http://localhost:4000**

**Note:** `npx prisma generate` creates the Prisma Client code in your local `node_modules` folder. This is required for your application code to interact with the database, regardless of where the database is hosted.

## 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm i --legacy-peer-deps

# Start the development server
npm run dev
```

The frontend will start on **http://localhost:5173**

## 4. Environment Configuration

### Backend `.env`
Create a `.env` file in the `backend` folder:

**For local SQLite database:**
```env
DATABASE_URL="file:./dev.db"
PORT=4000
```

**For cloud PostgreSQL database (recommended for production):**
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
PORT=4000
```

### Frontend `.env`
Create a `.env` file in the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:4000
```