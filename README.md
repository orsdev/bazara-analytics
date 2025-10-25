# Bazara Analytics Dashboard

A modern, full-featured analytics dashboard built with Next.js 16, TypeScript, and React. Features comprehensive authentication, real-time data visualization, and enterprise-grade testing coverage.

## 🚀 Features

- **Authentication System**: Secure login with JWT tokens, HTTP-only cookies, and Zustand state management
- **Protected Routes**: Edge middleware for route protection
- **Analytics Dashboard**: Real-time metrics, charts, and data visualization using Recharts
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Strict TypeScript mode with zero `any` types
- **Testing**: 378 tests with 52%+ coverage using Jest and React Testing Library
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Optimized with dynamic imports, image optimization, and caching

## 📋 Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bazara-analytics
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   BASE_URL=http://localhost:3000
   ```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Watch Mode (for development)

```bash
npm run test:watch
```

### CI Mode

```bash
npm run test:ci
```

### Coverage Report

Test coverage is automatically generated when running tests. View the coverage report in the terminal or check the `coverage/` directory.

## 🔐 Authentication

### Login Credentials

```
Email: admin@example.com
Password: Password1!
```

### Authentication Flow

1. Navigate to `/login`
2. Enter credentials
3. On success, JWT token is stored in:
   - Zustand store (client-side state)
   - HTTP-only cookie (secure storage)
4. Middleware protects `/dashboard` routes
5. Logout clears both state and cookies

## 📊 Mock Data Location

All dashboard data is **mocked client-side** for demonstration purposes:

### Primary Mock Data File

- **`/data/dashboard.ts`** - Contains all mock data:
  - `dashboardMetrics` - Ticket metrics (total, open, closed, due)
  - `resolvedTicketsData` - Agent performance data
  - `pendingTicketsData` - Pending ticket counts
  - `pendingApprovalsData` - Approval queue data
  - `categoryResults` - Category-wise spending data
  - `responseTimeData` - Incident and change response times
  - `changeRequestData` - Change request timeline data
  - `requestsData` - Detailed request/ticket information
  - `ticketResolutionData` - Monthly resolution trends
  - `changeRequestStatusData` - Request status distribution

### API Routes (Mock Endpoints)

All API routes in `/app/api/` return mock data:

- `/api/auth/login` - Mock authentication (500ms delay)
- `/api/auth/logout` - Clear authentication state
- `/api/auth/me` - Get current user
- `/api/dashboard/*` - Various dashboard data endpoints

### Mock Authentication

- **File**: `/features/auth/services/auth-service.ts`
- **Credentials**: Only `admin@example.com` / `Password1!` succeeds
- **Delay**: 500ms simulated network delay
- **Token**: Mock JWT returned on success

## 🏗️ Project Structure

```
bazara-analytics/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Auth routes (login)
│   ├── (main)/              # Protected routes (dashboard)
│   └── api/                 # API routes (mock endpoints)
├── components/              # Reusable UI components
│   ├── __tests__/          # Component tests
│   └── ui/                 # UI primitives
├── features/               # Feature-based modules
│   ├── auth/              # Authentication feature
│   └── dashboard/         # Dashboard feature
├── data/                  # Mock data
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
├── providers/             # React context providers
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions
```

## 🎨 Tech Stack

### Core

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety

### State Management

- **Zustand** - Lightweight state management
- **React Query** - Server state management

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS
- **Radix UI** - Headless UI components
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Forms & Validation

- **React Hook Form** - Form management
- **Yup** - Schema validation

### Testing

- **Jest** - Test runner
- **React Testing Library** - Component testing
- **@testing-library/jest-dom** - DOM matchers

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

## 📱 Key Pages

- **`/login`** - Authentication page
- **`/dashboard`** - Main analytics dashboard
  - Metrics cards (tickets, approvals)
  - Charts (resolved tickets, response time, categories)
  - Data tables (requests, approvals, tickets)

## 🔒 Security Features

- HTTP-only cookies for token storage
- Edge middleware for route protection
- Secure cookie configuration (httpOnly, sameSite, secure in production)
- CSRF protection via cookie-based auth
- Input validation with Yup schemas

## ♿ Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Semantic HTML
- Focus management
- Color contrast compliance

## 📈 Performance Optimizations

- Dynamic imports for code splitting
- Image optimization with Next.js Image
- Font optimization with next/font
- Compression enabled
- CSS optimization
- Package import optimization (lucide-react, recharts, etc.)
- Static page generation where possible

## 📚 Additional Documentation

- **[Architecture Decision Record (ADR)](./docs/ADR.md)** - Key architectural decisions
- **[Testing Guide](./docs/TESTING.md)** - Testing strategies and patterns

## 🚀 Live Demo

**Production URL**: [https://bazara-analytics.vercel.app/](https://bazara-analytics.vercel.app/)

**Login Credentials**:

- Email: `admin@example.com`
- Password: `Password1!`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
