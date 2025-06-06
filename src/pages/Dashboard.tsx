// src/pages/Dashboard.tsx

import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
    } else {
      setBlogs(data as Blog[]);
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      alert("Failed to delete blog.");
    } else {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Failed to log out.");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="dashboard-container">
      <button className="create-button" onClick={() => navigate("/create")}>
        Create New Blog
      </button>

      {blogs.length === 0 && <p>No blogs yet.</p>}

      {blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <div className="blog-actions">
            <button onClick={() => navigate(`/edit/${blog.id}`)}>Edit</button>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </div>
        </div>
      ))}

      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
