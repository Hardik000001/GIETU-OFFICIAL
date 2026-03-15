import React, { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [active, setActive] = useState("notice");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "";

      if (active === "notice") {
        url = "http://localhost:5000/api/notices";
      }
      if (active === "announcement") {
        url = "http://localhost:5000/api/announcements";
      }
      if (active === "event") {
        url = "http://localhost:5000/api/events";
      }

      // 🔐 GET JWT TOKEN
      const token = localStorage.getItem("adminToken");

      await axios.post(
        url,
        {
          title,
          description,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`${active} added successfully`);

      // clear form
      setTitle("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error(error);
      alert("Error adding data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-red-700 text-white fixed top-0 bottom-0 left-0">
        <div className="p-6 text-2xl font-bold border-b border-red-500">
          Admin Panel
        </div>

        <nav className="p-6 space-y-4 text-lg flex flex-col">
          <button
            onClick={() => setActive("notice")}
            className={`text-left px-4 py-2 rounded ${
              active === "notice"
                ? "bg-white text-red-700 font-semibold"
                : "text-white"
            }`}
          >
            Notices
          </button>

          <button
            onClick={() => setActive("announcement")}
            className={`text-left px-4 py-2 rounded ${
              active === "announcement"
                ? "bg-white text-red-700 font-semibold"
                : "text-white"
            }`}
          >
            Announcements
          </button>

          <button
            onClick={() => setActive("event")}
            className={`text-left px-4 py-2 rounded ${
              active === "event"
                ? "bg-white text-red-700 font-semibold"
                : "text-white"
            }`}
          >
            Events
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin/login";
            }}
            className="mt-10 bg-white text-red-700 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 p-10">
        <h1 className="text-3xl font-bold text-red-700 mb-6 capitalize">
          Add {active}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow max-w-xl space-y-4"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border p-3 rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-red-700 text-white py-3 rounded-lg font-semibold"
          >
            Add {active}
          </button>
        </form>
      </main>
    </div>
  );
}

export default Dashboard;
