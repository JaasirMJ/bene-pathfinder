import { supabase } from "./supabase";

export async function getEligibleSchemes(userId: string) {
  // 1️⃣ Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) throw profileError;

  const { age, gender, income, state } = profile;

  // 2️⃣ Get matching schemes
  const { data: schemes, error } = await supabase
    .from("schemes")
    .select("*")
    .lte("min_age", age)
    .gte("max_age", age)
    .lte("min_income", income)
    .gte("max_income", income)
    .or(`gender.eq.${gender},gender.eq.any`)
    .or(`state.eq.${state},state.eq.any`);

  if (error) throw error;

  return schemes;
}

const { error } = await supabase.from("schemes").insert([
  {
    scheme_name: "Farmer Support Scheme",
    min_age: 18,
    max_age: 65,
    min_income: 0,
    max_income: 200000,
    gender: "any",
    caste: "any",
    state: "any",
    description: "Financial aid for farmers"
  }
]);
