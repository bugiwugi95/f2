# FK BEZPONT - Football Club Telegram WebApp

Professional Telegram WebApp for football club management built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Telegram Authentication**: Seamless login via Telegram
- **Player Profile Management**: Set up nickname and playing position
- **Dashboard**: View player statistics, upcoming matches, and team progress
- **Match Tracking**: Browse all club matches with filtering
- **Team Roster**: View complete squad with position filtering
- **Player Profile**: Personal statistics and account management

## Tech Stack

- **Frontend**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context + Hooks
- **Storage**: LocalStorage for tokens and user data
- **Platform**: Telegram WebApp API

## Project Structure

\`\`\`
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Splash screen
│   ├── auth/              # Auth page
│   ├── onboarding/        # 3-step onboarding flow
│   ├── dashboard/         # Main dashboard
│   ├── matches/           # Matches listing
│   ├── team/              # Team roster
│   ├── profile/           # Player profile
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
│
├── components/
│   ├── layout/            # Layout components (header, nav, etc)
│   ├── auth/              # Auth screens
│   ├── onboarding/        # Onboarding components
│   ├── dashboard/         # Dashboard components
│   ├── matches/           # Match components
│   ├── team/              # Team components
│   └── common/            # Reusable UI components
│
├── context/               # React Context
│   ├── auth-context.tsx
│   ├── app-context.tsx
│   └── providers.tsx
│
├── hooks/                 # Custom React hooks
│   ├── use-auth.ts
│   ├── use-app.ts
│   ├── use-telegram.ts
│   ├── use-storage.ts
│   ├── use-toast.ts
│   └── use-api.ts
│
├── services/              # API and service layer
│   ├── api-client.ts      # HTTP client
│   ├── auth-service.ts
│   ├── players-service.ts
│   ├── team-service.ts
│   ├── matches-service.ts
│   ├── storage-service.ts
│   └── telegram-service.ts
│
├── types/                 # TypeScript types
│   ├── index.ts
│   └── telegram.ts
│
├── utils/                 # Utility functions
│   ├── validators.ts
│   ├── formatters.ts
│   ├── error-handler.ts
│   └── constants.ts
│
└── config/                # Configuration
    ├── app-config.ts
    └── api-config.ts
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update `.env.local` with your API URL

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## API Endpoints

All API calls require Bearer token authorization. The token is automatically added to all requests via the API client.

### Authentication
- `POST /auth/telegram` - Login via Telegram initData
- `GET /auth/me` - Validate current session
- `DELETE /auth/logout` - Logout (optional)

### Players
- `PATCH /players/me/setup` - Complete onboarding (nickname + position)
- `GET /players/me/profile` - Get player profile
- `GET /players/me/dashboard` - Get dashboard data
- `GET /players/me/matches` - Get player's matches

### Team
- `GET /team` - Get team roster

### Matches
- `GET /matches` - Get all matches

## Authentication Flow

1. **Splash Screen**: Checks for existing token in localStorage
2. **Auth Screen**: User logs in via Telegram (sends initData)
3. **Backend Response**: Returns JWT token and onboarding status
4. **Onboarding** (if needed): 3-step process to set nickname and position
5. **Dashboard**: Main app screen after successful setup

## Data Storage

- **Token**: Stored in localStorage with key `token`
- **User Profile**: Stored in localStorage with key `userProfile`
- **Onboarding Status**: Stored in localStorage with key `onboardingComplete`
- **Active Tab**: Stored in localStorage with key `lastActiveTab`

## Color Scheme

- **Primary**: #4CAF50 (Green)
- **Background**: #0F0F0F (Dark)
- **Surface**: #1A1A1A (Dark Grey)
- **Text**: #FFFFFF (White)
- **Secondary Text**: #AAAAAA (Medium Grey)
- **Accent**: #FFD700 (Gold - Captain)
- **Danger**: #DC3545 (Red)

## Responsive Design

The app is fully responsive and optimized for:
- Telegram WebApp container
- Mobile devices (375px - 430px typical)
- Desktop browsers (for testing)

All components respect safe areas and notches.

## Error Handling

- Network errors: "Нет интернета"
- Authentication errors: Automatic logout and redirect to auth
- Validation errors: Inline error messages
- Server errors: Retry option provided
- Timeout errors: Request timeout message

## Performance

- Lazy loading of screens
- Skeleton loading states
- Optimized re-renders with Context + Hooks
- localStorage caching for token and profile
- Efficient API client with automatic retry logic

## Security

- JWT token-based authentication
- Automatic token injection in API headers
- Logout on 401 Unauthorized
- XSS protection via React
- HTTPS required in production

## Deployment

The app is ready for deployment to Vercel or any Node.js hosting:

\`\`\`bash
vercel deploy
\`\`\`

### Environment Variables (Production)

Set these in your deployment platform:
- `NEXT_PUBLIC_API_URL`: Your production API URL

## Troubleshooting

### Blank screen on app start
- Check browser console for errors
- Ensure Telegram WebApp is running in Telegram client
- Verify API URL is correct in `.env.local`

### Authentication fails
- Check if backend is running
- Verify initData is being sent correctly
- Check API response in network tab

### Styles not loading
- Clear browser cache
- Rebuild the project: `npm run build`
- Check Tailwind CSS configuration

## License

Private - FK BEZPONT Football Club

## Support

For issues and questions, contact the development team.
