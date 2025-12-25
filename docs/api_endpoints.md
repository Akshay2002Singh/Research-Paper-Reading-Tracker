# API Endpoints

The backend exposed several REST endpoints for paper management and analytics.

## Papers

### `GET /papers`
Retrieve a list of research papers with optional filtering.

**Query Parameters:**
- `domain[]`: Filter by one or more research domains (e.g., `Computer_Science`)
- `readingStage[]`: Filter by one or more reading stages (e.g., `Fully_Read`)
- `impactScore[]`: Filter by impact level (e.g., `High_Impact`)
- `dateRange`: Filter by time relative to today (`week`, `month`, `3months`, `all`)

**Response:**
Returns an array of Paper objects.

### `POST /papers`
Add a new research paper to the library.

**Request Body:**
```json
{
  "title": "String",
  "firstAuthor": "String",
  "domain": "ResearchDomain",
  "readingStage": "ReadingStage",
  "citationCount": 0,
  "impactScore": "ImpactScore"
}
```

## Analytics

### `GET /papers/analytics`
Fetch aggregated data for the analytics dashboard charts.

**Response:**
```json
{
  "funnel": [{ "stage": "...", "count": 0 }],
  "scatter": [{ "citationCount": 0, "impactScore": "..." }],
  "stacked": [{ "domain": "...", "stage": "...", "count": 0 }],
  "summary": {
    "papersByStage": { ... },
    "avgCitationsByDomain": [{ "domain": "...", "avgCitations": 0 }],
    "completionRate": 85.0
  }
}
```
