// pages/Logout.tsx
import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useDispatch } from "react-redux";
import { clearUser } from "../store";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut(); // Supabase logout
      dispatch(clearUser()); // Clear user from Redux store
      navigate("/login"); // Redirect to login page
    };

    logout();
  }, [dispatch, navigate]);

  return <p>Logging out...</p>;
}
