import { useState } from "react";
import api from "../services/api";

export default function UserRegister() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/users/", form);
      setForm({
        username: "",
        email: "",
        password: "",
        full_name: "",
      });
      alert("User created");
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to create user");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-4">User Registration</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          className="w-full border p-2 rounded"
          value={form.full_name}
          onChange={(event) => setForm({ ...form, full_name: event.target.value })}
        />

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={form.username}
          onChange={(event) => setForm({ ...form, username: event.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create User
        </button>
      </form>
    </div>
  );
}
