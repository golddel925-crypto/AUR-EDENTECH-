import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }: any) {
  const seq = localStorage.getItem("aur_sequence_id");

  if (!seq) {
    return <Navigate to="/" />;
  }

  return children;
}
