// App.tsx
import React, { useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store";
import { supabase } from "./supabaseClient";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { RootState } from "./store";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      dispatch(setUser(data.session?.user ?? null));
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(session?.user ?? null));
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default App;
