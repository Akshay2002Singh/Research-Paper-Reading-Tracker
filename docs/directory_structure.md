# Directory Structure

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
    │   ├── lib/             # Shared utilities (constants, enum helpers)
    │   ├── types/           # TypeScript type definitions
    │   ├── theme.ts         # MUI theme configuration
    │   └── main.tsx         # App entry point
    └── package.json
```

## Detailed Breakdown

### Backend
- **`src/controllers`**: Handles incoming HTTP requests, extracts parameters, and calls appropriate services.
- **`src/services`**: Contains the core business logic and direct database interactions using Prisma.
- **`src/routes`**: Maps HTTP endpoints to controller functions.
- **`prisma/schema.prisma`**: The source of truth for the database structure, including Enums for domains and stages.

### Frontend
- **`src/pages`**: Top-level page components managed by React Router.
- **`src/components`**: Reusable UI elements, including standard views and data visualizations (charts).
- **`src/api`**: Axios-based client for communicating with the backend API.
- **`src/lib`**: Shared logic, specifically `enumUtils.ts` which handles the mapping between database keys (underscore-separated) and display names.
