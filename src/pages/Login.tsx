// pages/Login.tsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
