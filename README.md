# Research Paper Reading Tracker

A full-stack web application to help researchers track and analyze their paper reading progress. Built with React, Node.js, and SQLite.

## ✨ Features

- 📝 **Paper Management**: Add and track research papers with detailed metadata
- 🔍 **Advanced Filtering**: Multi-select filters by domain, reading stage, impact score, and date range
- 📊 **Analytics Dashboard**: Visualize your reading progress with interactive charts
- 👁️ **Detailed View**: View complete paper information in a beautiful modal dialog
- 🎨 **Modern UI**: Clean, responsive interface built with Material-UI

## 🚀 Tech Stack

### Frontend
- **React 19** with Vite for fast development
- **TypeScript** for type safety
- **Material-UI (MUI)** for beautiful, accessible components
- **Recharts** for data visualization
- **React Query** for server state management
- **React Router** for navigation

### Backend
- **Node.js** with Express framework
- **Prisma ORM** for database management
- **SQLite** for local development (easily swappable to PostgreSQL)
- **TypeScript** for consistency across the stack

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd "Research Paper Reading Tracker"
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client and create database
npx prisma generate
npx prisma migrate dev --name init

# Start the development server
npm run dev
```

The backend will start on **http://localhost:4000**

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on **http://localhost:5173**

### 4. Environment Configuration

#### Backend `.env`
Create a `.env` file in the `backend` folder:

```env
DATABASE_URL="file:./dev.db"
PORT=4000
```

#### Frontend `.env`
Create a `.env` file in the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:4000
```

## 📖 Usage

### Adding a Paper

1. Navigate to **Add Paper** page
2. Fill in the paper details:
   - Title
   - First Author
   - Research Domain (Computer Science, Biology, Physics, etc.)
   - Reading Stage (Abstract Read, Fully Read, etc.)
   - Citation Count
   - Impact Score
3. Click **Add Paper**

### Viewing Your Library

1. Go to the **Library** page
2. Use filters on the left sidebar to narrow down papers by:
   - Research Domain
   - Reading Stage
   - Impact Score
   - Date Added (week, month, 3 months, all time)
3. Click the 👁️ (eye) icon to view detailed information about any paper

### Analytics Dashboard

Visit the **Analytics** page to see:
- **Reading Pipeline** (Funnel Chart): Track papers through different reading stages
- **Impact vs Citations** (Scatter Plot): Visualize the relationship between impact and citations
- **Distribution by Domain** (Stacked Bar Chart): See how papers are distributed across domains and reading stages
- **Summary Cards**: Quick stats like completion rate and highest-cited domain

## 📁 Project Structure

```
Research Paper Reading Tracker/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic & database queries
│   │   ├── routes/          # API route definitions
│   │   ├── utils/           # Utilities (Prisma client)
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/           # Main pages (Library, AddPaper, Analytics)
    │   ├── components/      # Reusable UI components
    │   ├── api/             # API client
    │   ├── types/           # TypeScript type definitions
    │   ├── theme.ts         # MUI theme configuration
    │   └── main.tsx         # App entry point
    └── package.json
```

## 🗃️ Data Model

### Research Domains
- Computer Science
- Biology
- Physics
- Chemistry
- Mathematics
- Social Sciences

### Reading Stages
- Abstract Read
- Introduction Done
- Methodology Done
- Results Analyzed
- Fully Read
- Notes Completed

### Impact Scores
- High Impact
- Medium Impact
- Low Impact
- Unknown

## 🔌 API Endpoints

### Papers
- `POST /papers` - Create a new paper
- `GET /papers` - Get all papers (supports filtering)
  - Query params: `domain[]`, `readingStage[]`, `impactScore[]`, `dateRange`

### Analytics
- `GET /papers/analytics` - Get aggregated analytics data
  - Returns funnel data, scatter plot data, stacked bar data, and summary statistics

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Railway/Render)
```bash
cd backend
npm run build
# Deploy to your hosting platform
```

For production, update the database to PostgreSQL by changing the Prisma schema and DATABASE_URL.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with love for researchers who want to stay organized
- UI components from [Material-UI](https://mui.com/)
- Charts powered by [Recharts](https://recharts.org/)

---

**Made with ❤️ for the research community**
