import React, { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom";
import { LoadingState } from "../components/ui/LoadingState";
import { ProtectedLayout } from "../components/layout/ProtectedLayout";

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

// wrapper to simplify suspense usage
const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<LoadingState />}>
    {element}
  </Suspense>
);

// root layout chooses between login and protected area
import { BackgroundFX } from "../components/layout/BackgroundFX";

function RootLayout() {
  const logged = !!localStorage.getItem("aur_logged");
  const navigate = useNavigate();

  useEffect(() => {
    if (logged && window.location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [logged, navigate]);

  return (
    <>
      <BackgroundFX />
      {logged ? <ProtectedLayout /> : <Outlet />}
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(<Login />) },
      { path: "dashboard", element: withSuspense(<TotalitaPage />) },
      { path: "forum", element: withSuspense(<ForumPage />) },
      { path: "journey", element: withSuspense(<JourneyPage />) },
      { path: "wallet", element: withSuspense(<WalletPage />) },
      { path: "badges", element: withSuspense(<BadgesPage />) },
      { path: "users", element: withSuspense(<ActiveUsersPage />) },
      { path: "profile", element: withSuspense(<ProfilePage />) },
    ],
  },
]);
