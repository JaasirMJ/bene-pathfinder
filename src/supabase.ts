import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://glhrtvlhqgamjaqwwehe.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsaHJ0dmxocWdhbWphcXd3ZWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxOTQ4NjYsImV4cCI6MjA4NTc3MDg2Nn0.2w9PaGy7kTKmJ9oBUxZ_E8awGViyYvDZEt1FxrpCQ4Y";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
