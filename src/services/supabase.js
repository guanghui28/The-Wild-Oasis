import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseUrl = "https://nscquxpozufcweswzuob.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY3F1eHBvenVmY3dlc3d6dW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2MTA2ODMsImV4cCI6MjAyOTE4NjY4M30.ouuzK4pPjXCZL9qVFHfH5gVZ_wPOYy08yfJgZJz2syE";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
