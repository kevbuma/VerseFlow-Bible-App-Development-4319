# VerseFlow - AI-Powered Bible Study App

A comprehensive Bible study application built with React, Supabase, and modern web technologies.

## Features

### ✅ Implemented Features
- **User Authentication** - Sign up, sign in, password reset
- **Bible Reading** - Multiple versions, search, bookmarks
- **Notes System** - Personal Bible study notes with tags
- **Prayer Journal** - Private and public prayer requests
- **Reading Plans** - Structured Bible reading schedules
- **Memory Verses** - Scripture memorization with progress tracking
- **Groups** - Bible study groups and discussions
- **Daily Devotionals** - Inspirational daily content
- **AI Assistant** - Biblical questions and insights
- **Responsive Design** - Works on all devices

### 🔄 Real vs Mock Data
The app intelligently switches between real Supabase data and mock data:
- **With Supabase credentials**: Full database functionality
- **Without credentials**: Mock data for demonstration

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd verseflow-bible-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Database Setup

### Option 1: Automatic Setup (Recommended)
1. Ensure your Supabase credentials are in `.env`
2. Start the app - it will prompt you to initialize the database
3. Click "Initialize Database" to create all necessary tables

### Option 2: Manual Setup
If you prefer to set up the database manually, you can run the SQL commands found in `src/services/databaseService.js` directly in your Supabase SQL editor.

## Database Schema

The app creates the following tables:
- `bible_versions` - Bible translations (KJV, ESV, NIV, etc.)
- `bible_books` - All 66 books of the Bible
- `bible_verses` - Individual verses (populated as needed)
- `notes` - User's Bible study notes
- `prayer_requests` - Prayer journal entries
- `reading_plans` - Available reading plans
- `user_reading_plans` - User's active reading plans
- `bookmarks` - Bookmarked verses
- `highlights` - Highlighted verses
- `memory_verses` - Scripture memorization progress

## Architecture

### Frontend Stack
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Icons** - Comprehensive icon library
- **React Toastify** - Toast notifications

### Backend Stack
- **Supabase** - Backend as a service
- **PostgreSQL** - Relational database
- **Row Level Security** - Data protection
- **Real-time subscriptions** - Live updates

### Key Design Patterns
- **Custom Hooks** - Reusable data logic
- **Context API** - Global state management
- **Service Layer** - API abstraction
- **Component Composition** - Modular UI components

## Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Code Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── services/           # API and business logic
├── data/               # Mock data and constants
├── common/             # Shared utilities
└── lib/                # Third-party configurations
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Other Platforms
The app builds to static files and can be deployed to any static hosting service.

## Bible Content

### Current Implementation
- Sample verses from popular passages (John 3, Psalm 23, etc.)
- Placeholder text for other passages
- Mock search functionality

### Production Recommendations
For a production app, consider:
1. **Bible API Integration** - Use services like API.Bible or ESV API
2. **Full Text Import** - Import complete Bible text to your database
3. **Caching Strategy** - Cache frequently accessed content

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for the global Christian community