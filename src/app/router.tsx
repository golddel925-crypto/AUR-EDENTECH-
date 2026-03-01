import React, { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, Outlet, useNavigate, Navigate } from "react-router-dom";
import { LoadingState } from "../components/ui/LoadingState";
import { AuthGate } from "../components/layout/AuthGate";
import { PlatformLayout } from "../components/layout/PlatformLayout";

// lazy components for all pages/features
const Login = lazy(() => import("../pages/Login"));
const TotalitaPage = lazy(() =>
  import("../features/dashboard/TotalitaPage").then((m) => ({ default: m.TotalitaPage }))
);
const ForumPage = lazy(() =>
  import("../features/forum/ForumPage").then((m) => ({ default: m.ForumPage }))
);
const JourneyPage = lazy(() =>
  import("../features/viaggio/JourneyPage").then((m) => ({ default: m.JourneyPage }))
);
const WalletPage = lazy(() =>
  import("../features/wallet/WalletPage").then((m) => ({ default: m.WalletPage }))
);
const BadgesPage = lazy(() =>
  import("../features/badges/BadgesPage").then((m) => ({ default: m.BadgesPage }))
);
const ActiveUsersPage = lazy(() =>
  import("../features/users/ActiveUsersPage").then((m) => ({ default: m.ActiveUsersPage }))
);
const ProfilePage = lazy(() =>
  import("../features/profile/ProfilePage").then((m) => ({ default: m.ProfilePage }))
);

// new feature pages
const EcosystemPage = lazy(() =>
  import("../features/ecosystem/EcosystemPage").then((m) => ({ default: m.EcosystemPage }))
);
const SpacesPage = lazy(() =>
  import("../features/spaces/SpacesPage").then((m) => ({ default: m.SpacesPage }))
);
const ProjectsPage = lazy(() =>
  import("../features/projects/ProjectsPage").then((m) => ({ default: m.ProjectsPage }))
);
const NetworkGraphPage = lazy(() =>
  import("../features/network/NetworkGraphPage").then((m) => ({ default: m.NetworkGraphPage }))
);
const ActivityPage = lazy(() =>
  import("../features/activity/ActivityPage").then((m) => ({ default: m.ActivityPage }))
);
const MessagingPage = lazy(() =>
  import("../features/messages/MessagingPage").then((m) => ({ default: m.MessagingPage }))
);
const UniversePage = lazy(() =>
  import("../features/universe/UniversePage").then((m) => ({ default: m.UniversePage }))
);

// wrapper to simplify suspense usage
const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<LoadingState />}>
    {element}
  </Suspense>
);

// root layout renders the background and hosts either the login or
// the authenticated sub-tree. it no longer decides on layout itself.
import { BackgroundFX } from "../components/layout/BackgroundFX";

function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const seq = sessionStorage.getItem('sequence_id');
    const isAuth = !!seq;

    // always land on the correct starting page based on session
    if (isAuth) {
      if (window.location.pathname === '/' || window.location.pathname === '/login') {
        navigate('/dashboard', { replace: true });
      }
    } else {
      if (window.location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    }
  }, [navigate]);

  return (
    <>
      <BackgroundFX />
      {/* outlet will render login or the authenticated routing branch */}
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // public login screens
      { index: true, element: withSuspense(<Login />) },
      { path: "login", element: withSuspense(<Login />) },

      // authenticated area guarded by AuthGate and using the
      // PlatformLayout. children below are only rendered when a valid
      // `sequence_id` exists in sessionStorage (AuthGate enforces this).
      {
        element: (
          <AuthGate>
            <PlatformLayout />
          </AuthGate>
        ),
        children: [
          { path: "dashboard", element: withSuspense(<TotalitaPage />) },
          { path: "ecosystem", element: withSuspense(<EcosystemPage />) },
          { path: "spaces", element: withSuspense(<SpacesPage />) },
          { path: "projects", element: withSuspense(<ProjectsPage />) },
          { path: "network", element: withSuspense(<NetworkGraphPage />) },
          { path: "activity", element: withSuspense(<ActivityPage />) },
          { path: "messages", element: withSuspense(<MessagingPage />) },
          { path: "universe", element: withSuspense(<UniversePage />) },
          { path: "forum", element: withSuspense(<ForumPage />) },
          { path: "journey", element: withSuspense(<JourneyPage />) },
          { path: "wallet", element: withSuspense(<WalletPage />) },
          { path: "badges", element: withSuspense(<BadgesPage />) },
          { path: "users", element: withSuspense(<ActiveUsersPage />) },
          { path: "profile", element: withSuspense(<ProfilePage />) },
          { path: "*", element: <Navigate to="/dashboard" replace /> },
        ],
      },
    ],
  },
]);
