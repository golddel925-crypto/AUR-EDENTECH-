import { useState } from "react";
import { loginWithSequence } from "../services/auth";

export default function Login() {
  const [sequence, setSequence] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    try {
      await loginWithSequence(sequence);
      window.location.href = "/totalita";
    } catch (err: any) {
      setError(err.message);
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
          />

          <button
            onClick={handleLogin}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded transition"
          >
            Accedi
          </button>
        </div>

        {error && (
          <div className="p-3 rounded bg-red-500/20 border border-red-500/50 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <p className="text-xs text-white/40 text-center">
          Powered by Supabase RPC
        </p>
      </div>
    </div>
  );
}
