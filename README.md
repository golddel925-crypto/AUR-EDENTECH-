# AUR EDENTECH

A production-grade digital platform built with modern web technologies. A powerful ecosystem for meaningful interactions, digital evolution, and merit-driven engagement.

## 🚀 Tech Stack

- **Vite** - Lightning-fast frontend build tool
- **React** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Zustand** - State management
- **TanStack Query** - Data fetching & caching
- **Framer Motion** - Smooth animations
- **Supabase JS** - Backend integration
- **MetaMask** - Web3 wallet integration

## 🎨 Design System

**Colors:**
- Black: `#000000`
- Gold: `#FFD700`
- Emerald: `#50C878`

**Typography:**
- Headings: Solemn, mystical, authoritative
- Body: Minimal, clean, high readability

## 📦 Installation

```bash
npm install
```

## 🔧 Environment Setup

Copy `.env.example` to `.env.local` and configure:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-anon-key
```

## 🏃 Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Application core
│   ├── App.tsx
│   ├── router.tsx
│   └── providers.tsx
├── core/                   # Core integrations
│   ├── supabase/          # Supabase client
│   ├── rpc/               # Backend RPC calls
│   ├── realtime/          # Real-time subscriptions
│   └── wallet/            # MetaMask integration
├── features/              # Feature modules
│   ├── dashboard/         # Totalità page
│   ├── forum/             # Forum & posts
│   ├── profile/           # User profile
│   ├── viaggio/           # Journey timeline
│   ├── badges/            # Badge system
│   ├── wallet/            # Wallet interface
│   └── users/             # Active users
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   └── ui/               # UI primitives
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
└── styles/                # Global styles
```

## 🔑 Key Features

### Authentication
- Users arrive authenticated with `user_id` and `sequence_id`
- Session persisted in localStorage
- Automatic redirects on auth state changes

### Dashboard (Totalità)
- User identity card with avatar and public name
- Coin balance display
- Forum feed preview
- Badge progression view

### Forum System
- Create posts with rich content
- Post fields: Title, Problem Reflection, Solution Intention, Context
- Media support (images, videos)
- Real-time interactions (Presente, Risuona)
- Infinite scroll pagination

### Profile Management
- Edit public name (3-24 chars, alphanumeric + underscore)
- Avatar upload
- Evolution tracking
- Activity history
- Wallet info display

### Journey (Viaggio)
- Vertical timeline with emerald glowing line
- Animated step nodes
- Reflection and media for each step

### Badge System
- 4 Categories: Evolution, Cooperation, Ethics, Impact
- 5 Levels: Bronze, Silver, Gold, Platinum, Legendary
- Locked badges visible but dimmed
- Real-time badge updates

### Wallet Integration
- MetaMask connection
- Base Mainnet (Chain ID: 0x2105) support
- Network switching capability
- ETH balance display
- Coin Cancellieri integration

### Real-time Features
- Post updates
- Interaction counts
- Badge achievements
- User presence
- Wallet changes

## 🎯 Backend Integration

The platform communicates with Supabase backend via RPC calls

## 🌙 Dark Theme

The entire platform is built with a dark, sophisticated aesthetic:
- Black backgrounds with emerald accents
- Gold highlights for premium elements
- Smooth animations (200-300ms duration)
- Emerald glow effects on hover
- Gold burst on achievements

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized scrolling

## 🔒 Security

- Frontend never assigns tokens
- Frontend never validates signatures
- Frontend never generates sequences
- All critical operations via backend RPC
- MetaMask handles private key management

## 🚀 Build

```bash
npm run build
```

## 📊 State Management

### Zustand Stores
- `useSessionStore` - Authentication state
- `useProfileStore` - User profile data
- `useWalletStore` - Wallet connection state
- `useUIStore` - UI state & notifications

## 🔄 Real-time Subscriptions

Automatic subscriptions to posts, interactions, badges, wallet, and user presence.

## ✨ Performance

- Code splitting via Vite
- Query caching (TanStack Query)
- Optimistic updates
- Debounced searches
- Lazy-loaded images
- Canvas background for performance