import { supabase } from "../lib/supabase";

export async function loginWithSequence(sequence: string) {
  const cleanSequence = sequence.trim();

  if (!cleanSequence) {
    throw new Error("Inserisci una sequenza");
  }

  const { data, error } = await supabase.rpc("verify_sequence_login", {
    input_code: cleanSequence
  });

  if (error) {
    console.error("RPC ERROR:", error);
    throw new Error(error.message);
  }

  const result = Array.isArray(data) ? data[0] : data;

  if (!result || result.valid !== true) {
    throw new Error("Sequenza non valida");
  }

  // record sequence ID in sessionStorage only (frontend auth source of truth)
  sessionStorage.setItem("sequence_id", result.sequence_id);

  return result;
} 