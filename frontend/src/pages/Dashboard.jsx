import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";

function Dashboard() {
  const [active, setActive] = useState("notice");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);

  const [pyqs, setPyqs] = useState([]);
  const [notices, setNotices] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [activities, setActivities] = useState([]);

  const [editingNoticeId, setEditingNoticeId] = useState(null);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [editingPyqId, setEditingPyqId] = useState(null);


  const [faculties, setFaculties] = useState([]);
  const [bio, setBio] = useState("");
  const [editingFacultyId, setEditingFacultyId] = useState(null);

  const token = localStorage.getItem("adminToken");

  const fetchData = async () => {
    const [n, a, e, p, act, f] = await Promise.all([
      axios.get("http://localhost:5000/api/notices"),
      axios.get("http://localhost:5000/api/announcements"),
      axios.get("http://localhost:5000/api/events"),
      axios.get("http://localhost:5000/api/pyq"),
      axios.get("http://localhost:5000/api/activities"),
      axios.get("http://localhost:5000/api/faculty"),
    ]);

    setNotices(n.data);
    setAnnouncements(a.data);
    setEvents(e.data);
    setPyqs(p.data);
    setActivities(act.data);
    setFaculties(f.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setSubject("");
    setYear("");
    setFile(null);
    setEditingNoticeId(null);
    setEditingAnnouncementId(null);
    setEditingEventId(null);
    setEditingActivityId(null);
    setEditingPyqId(null);
    setEditingFacultyId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      if (active === "notice") {
        editingNoticeId
          ? await axios.put(`http://localhost:5000/api/notices/${editingNoticeId}`, { title, description }, config)
          : await axios.post("http://localhost:5000/api/notices", { title, description }, config);
      }
      if (active === "faculty") {
        const data = {
          name: title,
          designation: description,
          email: subject,
          image: year,
          bio: bio,
        };

        editingFacultyId
          ? await axios.put(`http://localhost:5000/api/faculty/${editingFacultyId}`, data, config)
          : await axios.post("http://localhost:5000/api/faculty", data, config);
      }

      if (active === "announcement") {
        const data = { title, description, date };
        editingAnnouncementId
          ? await axios.put(`http://localhost:5000/api/announcements/${editingAnnouncementId}`, data, config)
          : await axios.post("http://localhost:5000/api/announcements", data, config);
      }

      if (active === "event") {
        const data = { title, description, date };
        editingEventId
          ? await axios.put(`http://localhost:5000/api/events/${editingEventId}`, data, config)
          : await axios.post("http://localhost:5000/api/events", data, config);
      }

      if (active === "activities") {
        const data = { title, description, date };
        editingActivityId
          ? await axios.put(`http://localhost:5000/api/activities/${editingActivityId}`, data, config)
          : await axios.post("http://localhost:5000/api/activities", data, config);
      }

      if (active === "pyq") {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("subject", subject);
        formData.append("year", year);
        if (file) formData.append("file", file);

        config.headers["Content-Type"] = "multipart/form-data";

        editingPyqId
          ? await axios.put(`http://localhost:5000/api/pyq/${editingPyqId}`, formData, config)
          : await axios.post("http://localhost:5000/api/pyq", formData, config);
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  const handleDelete = async (type, id) => {
    await axios.delete(`http://localhost:5000/api/${type}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  const handleEdit = (type, item) => {
    setTitle(item.title);
    setDescription(item.description);
    setDate(item.date || "");

    if (type === "notices") setEditingNoticeId(item._id);
    if (type === "announcements") setEditingAnnouncementId(item._id);
    if (type === "events") setEditingEventId(item._id);
    if (type === "activities") setEditingActivityId(item._id);
    if (type === "pyq") {
      setSubject(item.subject);
      setYear(item.year);
      setEditingPyqId(item._id);
    }
    if (type === "faculty") {
      setActive("faculty");
      setTitle(item.name);
      setDescription(item.designation);
      setSubject(item.email);
      setYear(item.image);
      setBio(item.bio);
      setEditingFacultyId(item._id);
    }
  };

  const menu = ["notice", "announcement", "event", "activities", "pyq", "faculty"];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-red-700 to-red-900 text-white p-6 space-y-3">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        {menu.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium
              ${active === tab ? "bg-white text-red-700" : "hover:bg-red-600"}`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 capitalize">{active} Form</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            {active !== "pyq" && active !== "faculty" && (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500"
              />
            )}

            {(active === "announcement" || active === "event" || active === "activities") && (
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            )}
            {active === "faculty" && (
              <>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Name"
                  className="w-full border p-3 rounded-lg"
                />

                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Designation"
                  className="w-full border p-3 rounded-lg"
                />

                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email"
                  className="w-full border p-3 rounded-lg"
                />

                <input
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Image URL"
                  className="w-full border p-3 rounded-lg"
                />

                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Bio"
                  className="w-full border p-3 rounded-lg"
                />
              </>
            )}
            {active === "pyq" && (
              <>
                <input
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />
                <input
                  placeholder="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              </>
            )}

            <button className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-lg">
              <Plus size={18} />
              {editingNoticeId || editingAnnouncementId || editingEventId || editingActivityId || editingPyqId || editingFacultyId
                ? "Update"
                : "Add"}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="grid gap-4">

          {active === "notice" && notices.map((n) => (
            <div key={n._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{n.title}</h3>
                <p className="text-gray-600">{n.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit("notices", n)} className="p-2 bg-yellow-400 rounded-lg">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete("notices", n._id)} className="p-2 bg-red-500 text-white rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {active === "faculty" && faculties.map((f) => (
            <div key={f._id} className="bg-white p-4 rounded-xl shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{f.name}</h3>
                <p>{f.designation}</p>
                <p className="text-blue-500">{f.email}</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleEdit("faculty", f)} className="p-2 bg-yellow-400 rounded-lg">
                  <Pencil size={16} />
                </button>

                <button onClick={() => handleDelete("faculty", f._id)} className="p-2 bg-red-500 text-white rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {active === "announcement" && announcements.map((a) => (
            <div key={a._id} className="bg-white p-4 rounded-xl shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p>{a.description}</p>
                <span className="text-sm text-gray-500">{a.date}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit("announcements", a)} className="p-2 bg-yellow-400 rounded-lg">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete("announcements", a._id)} className="p-2 bg-red-500 text-white rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {active === "event" && events.map((e) => (
            <div key={e._id} className="bg-white p-4 rounded-xl shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{e.title}</h3>
                <p>{e.description}</p>
                <span className="text-sm text-gray-500">{e.date}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit("events", e)} className="p-2 bg-yellow-400 rounded-lg"><Pencil size={16} /></button>
                <button onClick={() => handleDelete("events", e._id)} className="p-2 bg-red-500 text-white rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}

          {active === "activities" && activities.map((a) => (
            <div key={a._id} className="bg-white p-4 rounded-xl shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p>{a.description}</p>
                <span className="text-sm text-gray-500">{a.date}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit("activities", a)} className="p-2 bg-yellow-400 rounded-lg"><Pencil size={16} /></button>
                <button onClick={() => handleDelete("activities", a._id)} className="p-2 bg-red-500 text-white rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}

          {active === "pyq" && pyqs.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded-xl shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p>{p.subject} ({p.year})</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit("pyq", p)} className="p-2 bg-yellow-400 rounded-lg"><Pencil size={16} /></button>
                <button onClick={() => handleDelete("pyq", p._id)} className="p-2 bg-red-500 text-white rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}

        </div>
      </main>
    </div>
  );
}

export default Dashboard;
