import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Providers } from "./providers";
import { ErrorBoundary } from "../components/ErrorBoundary";

export default function App() {
  return (
    <Providers>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Providers>
  );
}
