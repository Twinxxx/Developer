// pages/EditBlog.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      if (!id) return;
      const { data, error } = await supabase.from("blogs").select("*").eq("id", id).single();
      if (error) {
        alert("Error loading blog");
        navigate("/");
      } else {
        setTitle(data.title);
        setContent(data.content);
      }
    }
    fetchBlog();
  }, [id, navigate]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;

    const { error } = await supabase
      .from("blogs")
      .update({ title, content })
      .eq("id", id);

    if (error) {
      alert("Failed to update blog");
    } else {
      navigate("/");
    }
  }

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Blog</h2>
      <input required value={title} onChange={e => setTitle(e.target.value)} />
      <br />
      <textarea required value={content} onChange={e => setContent(e.target.value)} />
      <br />
      <button type="submit">Update</button>
    </form>
  );
}
