// pages/Dashboard.tsx
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

  async function fetchBlogs() {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setBlogs(data as Blog[]);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function handleDelete(id: string) {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      alert("Failed to delete blog.");
    } else {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  }

  return (
    <div>
      <h2>Your Blogs</h2>
      <button onClick={() => navigate("/create")}>Create New Blog</button>
      {blogs.length === 0 && <p>No blogs yet.</p>}
      {blogs.map((blog) => (
        <div key={blog.id} style={{ borderBottom: "1px solid gray", margin: "1rem 0" }}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <button onClick={() => navigate(`/edit/${blog.id}`)}>Edit</button>{" "}
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
