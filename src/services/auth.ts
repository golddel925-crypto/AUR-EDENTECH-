import { supabase } from "../lib/supabase";

export async function loginWithSequence(sequence: string) {
  const cleanSequence = sequence.trim();

  if (!cleanSequence) {
    throw new Error("Inserisci una sequenza");
  }

  const { data, error } = await supabase.rpc("verify_sequence_login", {
    input_code:Sequence
  });

  if (error) {
    console.error("RPC ERROR:", error);
    throw new Error("Errore server");
  }

  console.log("RPC RESULT:", data);

  const result = Array.isArray(data) ? data[0] : data;

  if (!result || result.valid !== true) {
    throw new Error("Sequenza non valida");
  }

  localStorage.setItem("aur_sequence_id", result.sequence_id);

  return result;
}