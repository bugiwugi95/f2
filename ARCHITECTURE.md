# Football Club WebApp - Architecture Documentation

## Overview

This document describes the complete architecture of the FK BEZPONT Telegram WebApp, including system design, data flow, and component interactions.

## System Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    TELEGRAM CLIENT                          │
│              (Embedded WebView Container)                   │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────▼────────────────┐
        │   Frontend (Next.js + React)│
        │   ─────────────────────────│
        │   • Pages (routes)          │
        │   • Components (UI)         │
        │   • Hooks (logic)           │
        │   • Context (state)         │
        └────────────────┬────────────┘
                         │
        ┌────────────────▼──────────────────┐
        │   Services Layer                  │
        │   ──────────────────────────────│
        │   • API Client (HTTP)            │
        │   • Auth Service                 │
        │   • Players/Team/Matches Service │
        │   • Storage Service              │
        │   • Telegram Service             │
        └────────────────┬──────────────────┘
                         │
        ┌────────────────▼────────────────┐
        │   Data & Storage                │
        │   ──────────────────────────────│
        │   • localStorage (token, profile)
        │   • SessionStorage (temp data)   │
        └────────────────┬────────────────┘
                         │
        ┌────────────────▼────────────────┐
        │   Backend API (REST)            │
        │   ──────────────────────────────│
        │   • Authentication endpoints    │
        │   • Player endpoints            │
        │   • Team endpoints              │
        │   • Match endpoints             │
        └────────────────────────────────┘
\`\`\`

## State Management

### AuthContext
- **Purpose**: Manages authentication state and user profile
- **State**:
  - `user`: Current user profile
  - `token`: JWT authentication token
  - `isAuthenticated`: Boolean flag
  - `profileSetupComplete`: Onboarding status
  - `isLoading`: Loading state
- **Methods**:
  - `login(initData)`: Authenticate via Telegram
  - `logout()`: Clear auth state
  - `setupProfile(nickname, position)`: Complete onboarding
  - `checkAuth()`: Validate token on app start

### AppContext
- **Purpose**: Manages global app state
- **State**:
  - `currentTab`: Active navigation tab
  - `toasts`: Queue of notifications
- **Methods**:
  - `setCurrentTab(tab)`: Switch navigation
  - `showToast(message, type, duration)`: Display notification
  - `removeToast(id)`: Remove notification

## Data Flow

### 1. Initialization Flow
\`\`\`
App Start
  ├─ Check localStorage for token
  ├─ If token exists: Validate on backend
  │  └─ Valid: Load user profile → Dashboard
  │  └─ Invalid: Delete token → Auth Screen
  └─ If no token: Auth Screen
\`\`\`

### 2. Authentication Flow
\`\`\`
Auth Screen
  ├─ Get Telegram.WebApp.initData
  ├─ POST /auth/telegram with initData
  ├─ Backend returns: { token, profileSetupComplete, profile }
  ├─ Store token in localStorage
  │
  ├─ If profileSetupComplete === false
  │  └─ Onboarding Screen (3 steps)
  │     ├─ Step 1: Input nickname (validation)
  │     ├─ Step 2: Select position
  │     ├─ Step 3: Confirm and submit
  │     └─ PATCH /players/me/setup
  │        └─ Success: Dashboard
  │
  └─ If profileSetupComplete === true
     └─ Dashboard (skip onboarding)
\`\`\`

### 3. API Request Flow
\`\`\`
Component
  ├─ Calls useApi() or service method
  ├─ API Client adds Authorization header
  │  └─ `Authorization: Bearer <token>`
  ├─ Sends HTTP request to backend
  │
  ├─ Response handling
  │  ├─ 2xx: Success → Update state
  │  ├─ 401: Unauthorized → Clear token, logout
  │  ├─ 4xx: Client error → Show error message
  │  └─ 5xx: Server error → Show error message
  │
  └─ Component updates UI with data
\`\`\`

## Component Hierarchy

### Pages (Top Level)
- `/page.tsx` - Splash Screen
- `/auth/page.tsx` - Auth Screen
- `/onboarding/page.tsx` - Onboarding Flow
- `/dashboard/page.tsx` - Dashboard (main)
- `/matches/page.tsx` - Matches List
- `/team/page.tsx` - Team Roster
- `/profile/page.tsx` - Player Profile

### Layout Components
\`\`\`
SafeArea
  └─ Container
      ├─ Header
      ├─ Page Content (router-specific)
      └─ BottomNav (except on splash/auth)
\`\`\`

### Feature Components
- **Dashboard**: ProfileCard, SeasonStats, NextMatchCard, TeamProgressCard
- **Onboarding**: Step1Nickname, Step2Position, Step3Confirmation, ProgressIndicator
- **Matches**: MatchCard, MatchFilter
- **Team**: PlayerCard, PositionFilter

### Common Components
- Button, Input, Card, Modal
- LoadingSpinner, ErrorState, EmptyState
- ToastContainer

## API Integration

### Endpoints Structure
\`\`\`
Base URL: NEXT_PUBLIC_API_URL

/auth
  POST /telegram          - Login
  GET /me                 - Validate session
  DELETE /logout          - Logout

/players
  GET /me/profile         - Get profile
  GET /me/dashboard       - Get dashboard
  GET /me/matches         - Get matches
  PATCH /me/setup         - Complete onboarding

/team
  GET /                   - Get team roster

/matches
  GET /                   - Get all matches
\`\`\`

### Request/Response Pattern
\`\`\`
Request:
{
  method: 'GET|POST|PATCH|DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <token>'
  },
  body: { ... } // for POST/PATCH
}

Response (Success):
{
  status: 2xx,
  data: { ... }
}

Response (Error):
{
  status: 4xx|5xx,
  data: {
    message: "Error message",
    code: "ERROR_CODE"
  }
}
\`\`\`

## Error Handling Strategy

### Error Types
1. **Network Errors**
   - No internet connectivity
   - Request timeout
   - Failed to connect to server

2. **Authentication Errors (401)**
   - Invalid token
   - Expired session
   - User not found

3. **Validation Errors (422)**
   - Nickname taken
   - Invalid position
   - Invalid data format

4. **Server Errors (5xx)**
   - Database errors
   - Internal server errors

### Error Handling Flow
\`\`\`
API Call
  ├─ Network Error → Show "Нет интернета" + Retry
  ├─ 401 → Clear token, logout, redirect to /auth
  ├─ 4xx → Show specific error message
  ├─ 5xx → Show "Ошибка сервера" + Retry
  └─ Success → Process response
\`\`\`

## Storage Strategy

### localStorage Keys
- `token`: JWT authentication token (string)
- `userProfile`: User profile object (JSON)
- `onboardingComplete`: Onboarding status (boolean)
- `lastActiveTab`: Last active tab (string)
- `appSettings`: App preferences (JSON)

### Data Lifecycle
- **On Login**: Store token and profile
- **On Logout**: Delete all keys
- **On Profile Update**: Update userProfile
- **On Tab Switch**: Update lastActiveTab

## Navigation Architecture

### Tab-Based Navigation
\`\`\`
BottomNav (4 tabs)
├─ Dashboard (default)
├─ Matches
├─ Team
└─ Profile

Route Mapping:
Dashboard → /dashboard
Matches → /matches
Team → /team
Profile → /profile
\`\`\`

### Special Routes
- `/` - Splash Screen (entry point)
- `/auth` - Authentication
- `/onboarding` - Profile setup

### Route Protection
- Splash checks auth state and redirects
- Protected pages redirect to /auth if not authenticated
- Onboarding redirects to /dashboard if already complete

## Performance Optimizations

1. **Code Splitting**: Each page is lazy loaded
2. **Image Optimization**: Next.js Image component ready
3. **CSS-in-JS**: Tailwind CSS (compiled, not runtime)
4. **Request Caching**: useApi hook with caching
5. **State Management**: Context reduces prop drilling

## Security Measures

1. **Token Storage**: localStorage (vulnerable to XSS, but acceptable for WebApp)
2. **Token Usage**: Automatic injection in API headers
3. **CSRF Protection**: Backend should handle CSRF tokens
4. **Input Validation**: Client-side + server-side
5. **Error Messages**: Don't expose sensitive info

## Responsive Design

### Breakpoints
- Mobile: 375px - 430px (Telegram default)
- Tablet: 768px+
- Desktop: 1024px+

### Safe Areas
- Notch/Safe area support via Telegram WebApp API
- Bottom nav respects safe area
- Padding adjustments for notches

## Testing Strategy

### Unit Tests
- Validators and formatters
- Error handlers
- API client

### Integration Tests
- Auth flow
- Data fetching
- Navigation

### E2E Tests
- Full user journey
- Telegram integration
- Error scenarios

## Deployment Considerations

### Environment Variables
- `NEXT_PUBLIC_API_URL`: Backend API URL (required)

### Build Optimization
- Production build: `npm run build`
- Source maps disabled in production
- Compression enabled

### Performance Metrics
- Page load time: < 2s
- API response: < 1s
- Navigation transition: 300ms

## Future Enhancements

1. **Push Notifications**: Match reminders
2. **Real-time Updates**: WebSocket for live stats
3. **Video Highlights**: Match video clips
4. **Social Features**: Player messaging
5. **Analytics**: Detailed statistics dashboard
6. **Offline Mode**: Cache data for offline access
