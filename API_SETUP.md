# API Integration Setup Guide

This project is **fully API-driven** - all interview questions are fetched from third-party APIs. No static data is used.

## Available APIs

### 1. Stack Overflow API ✅ (Fully Implemented)
- **Status**: Public API, no authentication required
- **Rate Limit**: 30 requests per second
- **Endpoint**: `https://api.stackexchange.com/2.3/questions`
- **Features**: 
  - Fetches questions by tags
  - Extracts code blocks from answers
  - Determines difficulty based on score and views
- **Priority**: 1 (Highest - most reliable)

### 2. Google Custom Search API ✅ (Fully Implemented)
- **Status**: Requires API key and Search Engine ID
- **Rate Limit**: 100 requests/day (free tier)
- **Endpoint**: `https://www.googleapis.com/customsearch/v1`
- **Features**:
  - Searches the web for interview questions
  - Extracts questions and answers from search results
  - Finds code examples from various sources
- **Priority**: 2
- **Setup Required**: Yes (see below)

### 3. LeetCode API ✅ (Fully Implemented)
- **Status**: Public GraphQL API
- **Rate Limit**: 60 requests per minute
- **Endpoint**: `https://leetcode.com/graphql`
- **Features**:
  - Fetches coding problems by topic
  - Includes difficulty levels
  - Links to original problems
- **Priority**: 3

### 4. GitHub API ✅ (Fully Implemented)
- **Status**: Public API, optional token for higher rate limits
- **Rate Limit**: 60 requests/hour (or 5000/hour with token)
- **Endpoint**: `https://api.github.com/search/repositories`
- **Features**:
  - Searches repositories for interview questions
  - Parses markdown README files
  - Extracts questions and code examples
- **Priority**: 4

### 5. GeeksforGeeks ⚠️ (Placeholder)
- **Status**: No public API available
- **Implementation**: Requires web scraping or proxy service
- **Options**:
  - Use a scraping service (ScraperAPI, Bright Data, etc.)
  - Implement custom scraping (may violate ToS)
  - Use their practice API if available
- **Priority**: 5

### 6. InterviewBit ⚠️ (Placeholder)
- **Status**: No public API available
- **Implementation**: Requires web scraping or proxy service
- **Options**: Similar to GeeksforGeeks
- **Priority**: 6

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Google Custom Search API (Recommended - significantly increases question sources)
# Get your API key at: https://console.cloud.google.com/apis/credentials
# Create a Custom Search Engine at: https://programmablesearchengine.google.com/
GOOGLE_SEARCH_API_KEY=AIzaSyAcKchqxvAA7TEZWOEEbnPq8SXqzhGIvFc
GOOGLE_SEARCH_ENGINE_ID=d774a3db8d7b04247

# Optional: GitHub token for higher rate limits (5000/hour vs 60/hour)
# Get one at: https://github.com/settings/tokens
GITHUB_TOKEN=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

# Optional: Enable GeeksforGeeks scraping (requires API key)
NEXT_PUBLIC_ENABLE_GEEKSFORGEEKS=false
GEEKSFORGEEKS_API_KEY=b54b03b7d0mshf5f263c532cb0dfp170fd0jsn1f8c9ed601ce

# Optional: Enable InterviewBit scraping (requires API key)
NEXT_PUBLIC_ENABLE_INTERVIEWBIT=false
INTERVIEWBIT_API_KEY=your_api_key_here
```

### API Configuration

Edit `src/lib/api/config.ts` to enable/disable sources:

```typescript
export const API_CONFIG = {
  stackOverflow: {
    enabled: true,
    rateLimit: 30,
  },
  github: {
    enabled: true,
    rateLimit: 60,
    token: process.env.GITHUB_TOKEN,
  },
  // ... other sources
};
```

## How It Works

1. **Client Request**: User visits a category page
2. **API Route**: `/api/questions` aggregates data from multiple sources
3. **Caching**: Responses are cached for 30 minutes to reduce API calls
4. **No Fallback**: System is fully API-driven - if APIs fail, shows error message
5. **Display**: Questions are displayed with source attribution
6. **Multiple Sources**: Questions are fetched in parallel from all enabled sources

## API Routes

### `/api/questions`
Main endpoint that aggregates questions from all enabled sources.

**Query Parameters:**
- `category`: Category name (e.g., "mern", "react")
- `difficulty`: Optional difficulty filter (Beginner, Intermediate, Advanced)
- `limit`: Maximum number of questions (default: 20)
- `sources`: Comma-separated list of sources to use (optional)

**Example:**
```
GET /api/questions?category=mern&difficulty=Intermediate&limit=30
```

### `/api/geeksforgeeks`
Proxy endpoint for GeeksforGeeks (requires implementation).

### `/api/interviewbit`
Proxy endpoint for InterviewBit (requires implementation).

## Adding New API Sources

1. Create a new service file in `src/lib/api/`:
```typescript
// src/lib/api/newsource.ts
export async function fetchNewSourceQuestions(
  topic: string,
  limit: number = 10
): Promise<Question[]> {
  // Implementation
}
```

2. Add to `src/lib/api/questionsService.ts`:
```typescript
import { fetchNewSourceQuestions } from "./newsource";

const sources: QuestionSource[] = [
  // ... existing sources
  {
    name: "New Source",
    fetch: async (category, options) => {
      return fetchNewSourceQuestions(category, options?.limit || 10);
    },
    priority: 5,
  },
];
```

3. Create API route if needed:
```typescript
// src/app/api/newsource/route.ts
export async function GET(request: NextRequest) {
  // Implementation
}
```

## Caching

- **Duration**: 30 minutes (configurable in `questionsService.ts`)
- **Location**: In-memory cache (Map)
- **Key**: `category-difficulty-limit-sources`
- **Clear Cache**: Call `clearCache()` from `questionsService.ts`

## Rate Limiting

Each API has different rate limits:
- **Stack Overflow**: 30 req/sec (no auth needed)
- **GitHub**: 60 req/hour (5000/hour with token)
- **GeeksforGeeks/InterviewBit**: Depends on scraping service

Consider implementing:
- Request queuing
- Exponential backoff
- Distributed caching (Redis)

## Error Handling

The system handles errors gracefully:
1. Try API fetch
2. If fails, log error
3. Fallback to static JSON data
4. Show user-friendly error message

## Testing APIs

Test individual sources:

```bash
# Test Stack Overflow
curl "http://localhost:3000/api/questions?category=react&sources=Stack Overflow"

# Test GitHub
curl "http://localhost:3000/api/questions?category=javascript&sources=GitHub"
```

## Production Considerations

1. **API Keys**: Store securely in environment variables
2. **Rate Limiting**: Implement proper rate limiting per user/IP
3. **Caching**: Use Redis or similar for distributed caching
4. **Monitoring**: Track API usage and errors
5. **Fallback**: Always have static data as fallback
6. **Legal**: Respect API terms of service and rate limits

## Future Enhancements

- [ ] Add more API sources (W3Schools, LeetCode, etc.)
- [ ] Implement Redis caching
- [ ] Add API usage analytics
- [ ] Implement request queuing
- [ ] Add webhook support for real-time updates
- [ ] Create admin dashboard for API management

