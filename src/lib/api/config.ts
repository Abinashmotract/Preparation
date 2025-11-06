// API Configuration
export const API_CONFIG = {
  // Stack Overflow API - no key required, but rate limited
  stackOverflow: {
    enabled: true,
    rateLimit: 30, // requests per second
  },
  
  // Google Custom Search API - requires API key
  googleSearch: {
    enabled: true,
    apiKey: process.env.GOOGLE_SEARCH_API_KEY,
    searchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID,
    rateLimit: 100, // requests per day (free tier)
  },
  
  // LeetCode API - public GraphQL endpoint
  leetcode: {
    enabled: true,
    rateLimit: 60, // requests per minute
  },
  
  // GitHub API - no key required for public repos, but rate limited
  github: {
    enabled: true,
    rateLimit: 60, // requests per hour per IP
    token: process.env.GITHUB_TOKEN, // Optional: increases rate limit
  },
  
  // GeeksforGeeks - requires scraping or proxy
  geeksForGeeks: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_GEEKSFORGEEKS === "true",
    apiKey: process.env.GEEKSFORGEEKS_API_KEY,
  },
  
  // InterviewBit - requires scraping or proxy
  interviewBit: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_INTERVIEWBIT === "true",
    apiKey: process.env.INTERVIEWBIT_API_KEY,
  },
  
  // Cache settings
  cache: {
    duration: 1000 * 60 * 30, // 30 minutes
    enabled: true,
  },
};

