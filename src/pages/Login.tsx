import { useState } from "react";
import { loginWithSequence } from "../services/auth";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [sequence, setSequence] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!sequence.trim()) {
      setError("Inserisci una sequenza");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // TEMP DEBUG: direct RPC call to verify connection and see raw response
      try {
        const { data: rpcData, error: rpcError } = await supabase.rpc(
          "verify_sequence_login",
          { input_code: sequence }
        );
        console.log("RPC RESULT", rpcData, rpcError);
      } catch (e) {
        console.error("RPC direct call failed", e);
      }

      await loginWithSequence(sequence);
      window.location.href = "/dashboard";
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
