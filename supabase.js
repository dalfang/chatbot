import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

const supabase = createClient(
  "https://fmstahymlgkicwdrbezw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtc3RhaHltbGdraWN3ZHJiZXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NzY3NTgsImV4cCI6MjA0NzM1Mjc1OH0.I08CTgIY5ZK4L1xZTFChkoy49AVvCxtQ_cuC24HGcSY"
);
export default supabase;
