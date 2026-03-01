export default function AuthGuard({ children }: any) {
  const logged = localStorage.getItem("aur_logged");

  if (!logged) {
    window.location.href = "/";
    return null;
  }

  return children;
}