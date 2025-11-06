# Interview Preparation Website

A modern, responsive interview preparation platform for Full Stack Developers with dynamic question fetching from multiple third-party APIs.

## Features

- 🎯 **9 Tech Stack Categories**: MERN, MEAN, Vue.js, Next.js, Frontend, Backend, HTML, CSS, UI/UX
- 🔍 **Search & Filter**: Real-time search and difficulty-based filtering
- 📚 **Multiple Sources**: Fetches questions from Stack Overflow, GitHub, GeeksforGeeks, InterviewBit, and more
- 🔖 **Bookmarking**: Save favorite questions for later
- 👤 **User Authentication**: Login/Signup system for progress tracking
- 💻 **Code Examples**: Syntax-highlighted code blocks with copy functionality
- 🎨 **Modern UI**: Beautiful gradient theme with smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Preparation
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure API keys in `.env.local`:
```env
GITHUB_TOKEN=your_github_token_here
NEXT_PUBLIC_ENABLE_GEEKSFORGEEKS=false
NEXT_PUBLIC_ENABLE_INTERVIEWBIT=false
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration

This project fetches interview questions from multiple third-party APIs:

- ✅ **Stack Overflow API** - Public API, no authentication required (Priority 1)
- ✅ **Google Custom Search API** - Searches the web for interview questions (Priority 2)
- ✅ **LeetCode API** - GraphQL API for coding problems (Priority 3)
- ✅ **GitHub API** - Searches repositories for interview questions (Priority 4)
- ⚠️ **GeeksforGeeks** - Placeholder (requires scraping service)
- ⚠️ **InterviewBit** - Placeholder (requires scraping service)

**The system is fully API-driven** - all questions are fetched from third-party APIs. No static data is used.

For detailed API setup instructions, see [API_SETUP.md](./API_SETUP.md).

## Project Structure

```
src/
├── app/
│   ├── api/              # Next.js API routes (proxy endpoints)
│   ├── interview/        # Interview question pages
│   └── page.tsx          # Home page
├── components/           # React components
├── lib/
│   ├── api/              # API service modules
│   └── getQuestions.ts   # Data fetching logic
├── data/                 # Static JSON fallback data
└── types/                # TypeScript type definitions
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Code Highlighting**: Prism.js
- **State Management**: React Hooks

## Features in Detail

### Search & Filter
- Real-time search across questions, answers, and tags
- Filter by difficulty: Beginner, Intermediate, Advanced
- Category-based browsing

### Bookmarking
- Save questions for later review
- Persistent storage per user
- Visual bookmark indicators

### Authentication
- Simple login/signup system
- User progress tracking (via localStorage)
- Session management

### Code Examples
- Syntax-highlighted code blocks
- Copy-to-clipboard functionality
- Multiple language support

## API Endpoints

### `/api/questions`
Main endpoint that aggregates questions from all sources.

**Query Parameters:**
- `category`: Category name (e.g., "mern", "react")
- `difficulty`: Optional difficulty filter
- `limit`: Maximum number of questions (default: 20)
- `sources`: Comma-separated list of sources

**Example:**
```
GET /api/questions?category=mern&difficulty=Intermediate&limit=30
```

## Caching

API responses are cached in-memory for 30 minutes to reduce API calls and improve performance.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Stack Overflow API](https://api.stackexchange.com/docs)
- [GitHub API](https://docs.github.com/en/rest)
