import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithSequence } from "../services/auth";
import { useSessionStore } from "../stores/sessionStore";

export default function Login() {
  const [sequence, setSequence] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setSession } = useSessionStore();

  // if already have a session, bounce to dashboard immediately
  useEffect(() => {
    if (sessionStorage.getItem("sequence_id")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  async function handleLogin() {
    if (!sequence.trim()) {
      setError("Inserisci una sequenza");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await loginWithSequence(sequence);
      const sid = result.sequence_id;
      // store in session storage and update the global store
      sessionStorage.setItem("sequence_id", sid);
      setSession(sid, sid);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="space-y-6 w-full max-w-md px-4">
        <h1 className="text-4xl font-bold text-center text-yellow-400">
          AUR EdenTech
        </h1>

        <p className="text-center text-white/60 text-sm">
          Accedi inserendo il tuo Sequence ID
        </p>

        <div className="space-y-4">
          <input
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Sequence ID"
            className="w-full p-3 rounded bg-white/10 text-white placeholder-white/50 border border-yellow-400/30 focus:border-yellow-400 outline-none transition"
            disabled={loading}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-400/50 text-black font-bold py-3 rounded transition"
          >
            {loading ? "Verificando..." : "Accedi"}
          </button>
        </div>

        {error && (
          <div className="text-red-400 text-center text-sm">{error}</div>
        )}

        <p className="text-xs text-white/40 text-center">
          Powered by Supabase RPC
        </p>
      </div>
    </div>
  );
} 
