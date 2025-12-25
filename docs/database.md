# Database & Data Model

The project uses **Prisma ORM** with **PostgreSQL** (recommended) or **SQLite** (local).

## Enums

The application uses specific Enum types to ensure data consistency. Internally, these use underscore-separated keys which are mapped to user-friendly strings at the UI level.

### Research Domains
- `Computer_Science` (Displays as: "Computer Science")
- `Biology`
- `Physics`
- `Chemistry`
- `Mathematics`
- `Social_Sciences` (Displays as: "Social Sciences")

### Reading Stages
- `Abstract_Read`
- `Introduction_Done`
- `Methodology_Done`
- `Results_Analyzed`
- `Fully_Read`
- `Notes_Completed`

### Impact Scores
- `High_Impact`
- `Medium_Impact`
- `Low_Impact`
- `Unknown`

## Prisma Schema

The schema includes performance optimizations for PostgreSQL:
- **`@@map("papers")`**: Consistent table naming.
- **`@@index`**: Added on `domain`, `readingStage`, `impactScore`, and `dateAdded` for faster filtering and analytics calculation.

```prisma
model Paper {
  id            String         @id @default(uuid())
  title         String
  firstAuthor   String
  domain        ResearchDomain
  readingStage  ReadingStage
  citationCount Int
  impactScore   ImpactScore
  dateAdded     DateTime       @default(now())
  createdAt     DateTime       @default(now())

  @@map("papers")
  @@index([domain])
  @@index([readingStage])
  @@index([impactScore])
  @@index([dateAdded])
}
```
