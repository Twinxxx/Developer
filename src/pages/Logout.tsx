// pages/Logout.tsx
import React, { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.signOut().then(() => {
      navigate("/login");
    });
  }, [navigate]);

  return <p>Logging out...</p>;
}
