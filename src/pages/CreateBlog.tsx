// pages/CreateBlog.tsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = supabase.auth.getUser().then(({ data }) => data.user);
    if (!user) {
      alert("You must be logged in");
      return;
    }

    const { error } = await supabase.from("blogs").insert([{ title, content, user_id: (await user)?.id }]);
    if (error) {
      alert("Error creating blog: " + error.message);
    } else {
      navigate("/");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Blog</h2>
      <input
        required
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        required
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button type="submit">Create</button>
    </form>
  );
}
