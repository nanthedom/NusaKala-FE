# NusaKala Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15.4.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

A modern, interactive platform connecting travelers with the rich cultural heritage of Indonesia. NusaKala serves as a comprehensive cultural discovery platform that bridges the gap between tourists and Indonesian cultural experiences.

## 🌟 Features

### Core Features

- **Nusa Discovery** - Interactive map exploration of Indonesian provinces with detailed cultural information
- **Cultural Events** - Real-time festival and workshop discovery throughout Indonesia
- **Nusa Journey** - AI-powered trip planning and itinerary assistance
- **Community Hub** - Social platform for cultural enthusiasts and traditional art practitioners
- **Nusa Cam** - AI technology for recognizing cultural objects, batik, and monuments
- **Daily Trivia** - Gamified learning through daily quizzes and leaderboards

### Technical Features

- **Modern Tech Stack** - Built with Next.js 15, React 19, and TypeScript
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Maps** - Powered by Leaflet and Mapbox GL
- **Authentication System** - Secure user authentication and protected routes
- **Internationalization** - Multi-language support for global accessibility
- **AI Integration** - Gemini AI service integration for intelligent features
- **State Management** - Zustand for efficient state management
- **UI Components** - Radix UI primitives with custom styling

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nusakala-fe.git
   cd nusakala-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following environment variables:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=your_api_url_here
   
   # Mapbox Configuration (for interactive maps)
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   
   # Authentication
   NEXT_PUBLIC_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_AUTH_CLIENT_ID=your_auth_client_id
   
   # AI Services
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (nusa-cam)/        # Nusa Cam feature routes
│   ├── (nusa-discovery)/  # Discovery feature routes
│   ├── (nusa-journey)/    # Journey feature routes
│   ├── community-hub/     # Community hub routes
│   ├── creator/           # Creator profile routes
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── auth/             # Authentication components
│   ├── common/           # Shared components
│   ├── features/         # Feature-specific components
│   ├── layout/           # Layout components
│   └── ui/               # UI primitives (Radix UI)
├── data/                 # Static data and configurations
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries and configurations
├── services/             # API services and external integrations
├── store/                # State management (Zustand)
└── types/                # TypeScript type definitions
```

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 15.4.3** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.0** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Icon library
- **Tailwind CSS Animate** - Animation utilities

### Maps & Visualization
- **Leaflet 1.9.4** - Interactive maps
- **React Leaflet 5.0.0** - React components for Leaflet
- **Mapbox GL 3.13.0** - Advanced mapping
- **React Map GL 8.0.4** - React components for Mapbox

### State Management & Data Fetching
- **Zustand 5.0.6** - Lightweight state management
- **SWR 2.3.4** - Data fetching and caching
- **Axios 1.11.0** - HTTP client

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🎨 Design System

### Color Palette
The application uses a carefully crafted color palette inspired by Indonesian culture:

- **Nusa Cream** (`#faf8f4`) - Primary background
- **Nusa Gold** (`#d4af37`) - Primary accent
- **Nusa Bronze** (`#cd7f32`) - Secondary accent
- **Nusa Brown** (`#8b4513`) - Text and borders
- **Nusa Red** (`#c41e3a`) - Error states
- **Nusa Green** (`#228b22`) - Success states

### Typography
- **Inter** - Primary font for UI elements
- **Playfair Display** - Serif font for headings
- **Poppins** - Alternative heading font
- **Noto Serif** - Traditional text styling

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript types
```

## 🏗️ Architecture

### Component Architecture
- **Functional Components** - All components use React hooks
- **TypeScript** - Strict typing throughout the application
- **Component Composition** - Reusable, composable components
- **Separation of Concerns** - Clear separation between UI, logic, and data

### State Management
- **Zustand** - Lightweight state management for global state
- **React Hooks** - Local component state
- **SWR** - Server state management and caching

### Routing
- **Next.js App Router** - File-based routing system
- **Route Groups** - Organized route structure
- **Protected Routes** - Authentication-based access control

### API Integration
- **Axios** - HTTP client with interceptors
- **Service Layer** - Centralized API service functions
- **Error Handling** - Comprehensive error management
- **Type Safety** - Typed API responses

## 🔐 Authentication

The application implements a comprehensive authentication system:

- **Protected Routes** - Route-level authentication guards
- **Auth Provider** - Context-based authentication state
- **Login/Register** - User authentication flows
- **Session Management** - Persistent user sessions

## 🗺️ Map Integration

### Interactive Maps
- **Province Exploration** - Clickable province map with cultural information
- **Event Locations** - Real-time event mapping
- **Cultural Sites** - Historical and cultural site markers
- **Responsive Design** - Mobile-optimized map interactions

### Map Technologies
- **Leaflet** - Primary mapping library
- **Mapbox GL** - Advanced mapping features
- **Custom Controls** - Province selection and filtering
- **Performance Optimized** - Efficient map rendering

## 🌐 Internationalization

The application supports multiple languages:

- **Translation Hooks** - Custom hooks for text translation
- **Dynamic Language Switching** - Runtime language changes
- **Cultural Context** - Region-specific content adaptation

## 🧪 Testing

### Testing Strategy
- **Unit Tests** - Component and utility function testing
- **Integration Tests** - API integration testing
- **E2E Tests** - End-to-end user flow testing

### Running Tests
```bash
npm run test        # Run all tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Breakpoints** - xs, sm, md, lg, xl, 2xl
- **Touch Interactions** - Mobile-optimized interactions
- **Performance** - Optimized for mobile devices
- **Accessibility** - WCAG 2.1 compliance

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Deployment Platforms
- **Vercel** - Recommended for Next.js applications
- **Netlify** - Alternative deployment option
- **Docker** - Containerized deployment

### Environment Variables
Ensure all required environment variables are configured in your deployment platform.

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use functional components and hooks
- Maintain consistent code formatting
- Write meaningful commit messages
- Add tests for new features

### Code Style
- Use camelCase for variables and functions
- Use PascalCase for components
- Follow ESLint and Prettier configurations
- Write clear, descriptive comments

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Indonesian cultural heritage and traditions
- Open source community and contributors
- Design inspiration from Indonesian art and architecture
- Map data providers and cultural organizations

## 📞 Support

For support and questions:

- **Documentation** - Check the project documentation
- **Issues** - Report bugs and feature requests on GitHub
- **Discussions** - Join community discussions
- **Email** - Contact the development team

---

**NusaKala** - Connecting Indonesian Culture with the World 🌏