# AUR EDENTECH - Setup & Deployment Guide

## ✅ Build Status
- ✓ Project compiles without errors
- ✓ All TypeScript types validated
- ✓ Build process successful
- ✓ Development server ready

## 📋 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
Output will be in the `dist/` directory.

## 🔧 Environment Configuration

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-key
```

## 🏗️ Complete Project Structure

```
src/
├── app/
│   ├── App.tsx              # Main application entry
│   ├── router.tsx           # Route definitions
│   └── providers.tsx        # Query provider setup
│
├── core/
│   ├── supabase/
│   │   └── client.ts        # Supabase client initialization
│   ├── rpc/
│   │   └── index.ts         # Backend RPC function calls
│   ├── realtime/
│   │   └── subscriptions.ts # Supabase realtime subscriptions
│   └── wallet/
│       └── metamask.ts      # MetaMask Web3 integration
│
├── features/
│   ├── dashboard/
│   │   └── TotalitaPage.tsx # Main dashboard (3-column layout)
│   ├── forum/
│   │   ├── ForumPage.tsx    # Forum feed with infinite scroll
│   │   ├── PostCard.tsx     # Individual post component
│   │   └── CreatePost.tsx   # Post creation form
│   ├── profile/
│   │   ├── ProfilePage.tsx  # User profile with tabs
│   │   ├── AvatarUpload.tsx # Avatar management
│   │   └── EditName.tsx     # Public name editor
│   ├── viaggio/
│   │   ├── JourneyPage.tsx  # Timeline view
│   │   └── JourneyStep.tsx  # Timeline step component
│   ├── badges/
│   │   ├── BadgesPage.tsx   # Badge gallery (4 categories × 5 levels)
│   │   └── BadgeCard.tsx    # Individual badge display
│   ├── wallet/
│   │   └── WalletPage.tsx   # MetaMask wallet interface
│   └── users/
│       ├── ActiveUsersPage.tsx # Users page
│       └── ActiveUsers.tsx     # Real-time user list
│
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx    # Main layout wrapper
│   │   ├── TopNav.tsx       # Navigation bar
│   │   └── BackgroundFX.tsx # Canvas background animation
│   └── ui/
│       ├── Card.tsx         # Card component
│       ├── Button.tsx       # Button component (3 variants)
│       ├── Input.tsx        # Input component
│       └── Glow.tsx         # Glowing effect wrapper
│
├── hooks/
│   ├── useUser.ts           # User profile hook
│   ├── useWallet.ts         # Wallet connection hook
│   └── useRealtime.ts       # Real-time subscriptions hook
│
├── stores/
│   ├── sessionStore.ts      # Auth state (Zustand)
│   ├── profileStore.ts      # Profile data (Zustand)
│   ├── walletStore.ts       # Wallet state (Zustand)
│   └── uiStore.ts           # UI state & notifications (Zustand)
│
└── styles/
    ├── globals.css          # Global styles & animations
    └── theme.css            # Design system tokens
```

## 🎯 Core Features Implemented

### ✅ Authentication
- Session state management with Zustand
- User ID & Sequence ID from URL params or localStorage
- Automatic redirect on auth changes

### ✅ Dashboard (TOTALITÀ)
- 3-column responsive layout
- User identity card with avatar & coin balance
- Forum feed preview (latest 3 posts)
- Badge progression preview

### ✅ Forum System
- Create posts with 4 fields: Title, Problem Reflection, Solution Intention, Context
- Real-time post updates via Supabase
- Infinite scroll pagination
- Interaction buttons: Presente & Risuona
- Real-time interaction counters

### ✅ Profile Management
- Public name editor (3-24 chars, alphanumeric + underscore)
- Avatar upload with local preview
- Tabbed interface: Identity, Evolution, Activity, Wallet
- Backend RPC integration for updates

### ✅ Journey (VIAGGIO)
- Vertical timeline with emerald glowing line
- Animated step nodes
- Per-step reflection and media support
- Smooth entrance animations

### ✅ Badge System
- 4 categories: Evolution, Cooperation, Ethics, Impact
- 5 levels each: Bronze, Silver, Gold, Platinum, Legendary
- Locked badges visible but dimmed
- Real-time badge updates via Supabase

### ✅ Active Users
- Real-time user list with refresh every 30s
- Avatar, name, and status display
- Responsive grid layout

### ✅ Wallet Integration
- MetaMask connection
- Base Mainnet support (Chain ID: 0x2105)
- Network switching capability
- ETH balance display
- Account change detection

## 🎨 Design System

### Colors (Strict)
- **Black**: `#000000` - Primary background
- **Gold**: `#FFD700` - Premium/secondary elements
- **Emerald**: `#50C878` - Primary accent

### Typography
- **Headings**: Font weight 700, letter-spacing -0.02em
- **Body**: Clean, minimal, 1.6 line-height

### Animations
- **Duration**: 200-300ms
- **Easing**: ease-in-out
- **Effects**:
  - Emerald glow on hover
  - Gold burst on achievement
  - Smooth fade-in on entrance

### Responsive Design
- Mobile-first approach
- Tablet optimized
- Desktop enhanced
- Touch-friendly interactions

## 📦 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Vite | 5.4.21 | Build tool & dev server |
| React | 18.2.0 | UI library |
| TypeScript | 5.2.2 | Type safety |
| Tailwind CSS | 3.4.1 | Styling |
| React Router | 6.24.0 | Client-side routing |
| Zustand | 4.4.7 | State management |
| TanStack Query | 5.35.1 | Data fetching & caching |
| Framer Motion | 10.16.16 | Animations |
| Supabase JS | 2.43.4 | Backend integration |
| ethers | 6.10.0 | Web3 utilities |

## 🔒 Security Measures

✓ Frontend NEVER assigns tokens
✓ Frontend NEVER validates signatures  
✓ Frontend NEVER generates sequences
✓ All sensitive operations via backend RPC
✓ MetaMask handles private key management
✓ Environment variables for secrets

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Output
- `dist/index.html` - Entry point
- `dist/assets/*.js` - JavaScript bundles
- `dist/assets/*.css` - Stylesheets

### Deploy To
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static host supporting SPAs

### Pre-Deployment Checklist
- [ ] Set `.env.local` with production Supabase credentials
- [ ] Test MetaMask connection on target network
- [ ] Verify all routes work
- [ ] Check console for no errors
- [ ] Test responsive layout
- [ ] Verify dark theme renders correctly

## 📊 State Management (Zustand)

### Session Store
```typescript
useSessionStore()
- userId: string | null
- sequenceId: string | null
- isAuthenticated: boolean
- setSession(userId, sequenceId)
- clearSession()
```

### Profile Store
```typescript
useProfileStore()
- profile: Profile | null
- isLoading: boolean
- error: string | null
- setProfile(profile)
- updatePublicName(name)
- updateAvatar(url)
- updateCoinBalance(balance)
```

### Wallet Store
```typescript
useWalletStore()
- address: string | null
- isConnected: boolean
- balance: string | null
- chainId: string | null
- isLoading: boolean
- error: string | null
- setWallet(address, balance, chainId)
- disconnect()
```

### UI Store
```typescript
useUIStore()
- sidebarOpen: boolean
- theme: 'dark' | 'light'
- notifications: Notification[]
- toggleSidebar()
- addNotification(message, type)
- removeNotification(id)
```

## 🔄 Real-time Features

### Subscriptions
- Posts: INSERT, UPDATE, DELETE
- Interactions: Real-time counts
- Badges: Unlock notifications
- Wallet: Balance updates
- Users: Online status

### Implementation
```typescript
useRealtime({
  onPostChange: (payload) => { ... },
  onBadgeChange: (payload) => { ... },
  // etc
})
```

## 🎬 Animation Framework

### Framer Motion Usage
```typescript
// Hover effects
whileHover={{ scale: 1.05 }}

// Tap/click effects
whileTap={{ scale: 0.98 }}

// Entrance animations
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Continuous animations
animate={{ rotate: 360 }}
transition={{ duration: 2, repeat: Infinity }}
```

### CSS Animations
```css
@keyframes glow { ... }
@keyframes glowGold { ... }
@keyframes slideUp { ... }
@keyframes slideDown { ... }
```

## 📈 Performance

- **Code Splitting**: Vite automatically
- **Lazy Loading**: React Router
- **Query Caching**: TanStack Query (30s default)
- **Image Optimization**: Native lazy loading
- **Canvas Background**: Performance-safe

## 🐛 Debugging

### Enable Console Logs
All RPC calls and errors logged to console

### Check Supabase Connection
```typescript
import { supabase } from '@/core/supabase/client'
console.log('Supabase URL:', supabase)
```

### Verify MetaMask
```typescript
console.log('MetaMask:', (window as any).ethereum)
```

## 🤝 Integration Points

### Backend RPC Functions Required
```
update_public_name
create_post
get_posts
interact_with_post (presente | risuona)
get_journey_steps
get_badges
get_active_users
get_wallet_info
get_profile
```

### Database Tables Expected
```
posts
interactions
user_badges
wallets
users
journey_steps
```

## 📝 Development Tips

### Add New Page
1. Create component in `src/features/[name]/`
2. Add route in `src/app/router.tsx`
3. Add nav item in `TopNav.tsx`
4. Wrap with `<AppLayout>`

### Add New RPC Call
1. Define in `src/core/rpc/index.ts`
2. Use in components via RPC functions
3. Add to realtime subscriptions if needed

### Modify Design System
1. Edit colors in `tailwind.config.ts`
2. Edit theme in `src/styles/theme.css`
3. Update color variables globally

## 🎓 Best Practices

✓ Use custom hooks for logic
✓ Keep components small & focused
✓ Handle errors gracefully
✓ Show loading states
✓ Use transitions for state changes
✓ Test on mobile frequently
✓ Check console for warnings
✓ Follow TypeScript strict mode

## 📞 Support

For issues or questions:
1. Check console for errors
2. Verify Supabase credentials
3. Test backend RPC functions
4. Check network tab in DevTools
5. Verify MetaMask is connected

---

**AUR EDENTECH** © 2026 - A production-grade digital platform for meaningful interactions and digital evolution.
