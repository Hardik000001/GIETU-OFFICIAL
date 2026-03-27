
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Dashboard() {
//   const [active, setActive] = useState("notice");

//   // common fields
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState("");

//   // PYQ fields
//   const [subject, setSubject] = useState("");
//   const [year, setYear] = useState("");
//   const [file, setFile] = useState(null);

//   const [pyqs, setPyqs] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   // 🔥 NOTICE STATE
//   const [notices, setNotices] = useState([]);
//   const [editingNoticeId, setEditingNoticeId] = useState(null);

//   const token = localStorage.getItem("adminToken");

//   const subjects = [
//     "DBMS","Operating Systems","Computer Networks","Data Structures",
//     "Algorithms","Software Engineering","AI","ML","Cloud Computing",
//     "Cyber Security","Java","Python","C Programming","Web Development"
//   ];

//   const years = Array.from({ length: 11 }, (_, i) => 2016 + i);

//   // 🔥 FETCH PYQ
//   const fetchPyqs = async () => {
//     const res = await axios.get("http://localhost:5000/api/pyq");
//     setPyqs(res.data);
//   };

//   // 🔥 FETCH NOTICE
//   const fetchNotices = async () => {
//     const res = await axios.get("http://localhost:5000/api/notices");
//     setNotices(res.data);
//   };

//   useEffect(() => {
//     if (active === "pyq") fetchPyqs();
//     if (active === "notice") fetchNotices();
//   }, [active]);

//   // SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let url = "";
//       let data;
//       let config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       // 🔥 NOTICE CRUD
//       if (active === "notice") {
//         if (editingNoticeId) {
//           await axios.put(
//             `http://localhost:5000/api/notices/${editingNoticeId}`,
//             { title, description },
//             config
//           );
//           alert("Notice Updated");
//         } else {
//           await axios.post(
//             "http://localhost:5000/api/notices",
//             { title, description },
//             config
//           );
//           alert("Notice Added");
//         }

//         fetchNotices();
//       }

//       if (active === "announcement") {
//         url = "http://localhost:5000/api/announcements";
//         data = { title, description, date };
//         await axios.post(url, data, config);
//         alert("announcement added successfully");
//       }

//       if (active === "event") {
//         url = "http://localhost:5000/api/events";
//         data = { title, description, date };
//         await axios.post(url, data, config);
//         alert("event added successfully");
//       }

//       // 🔥 PYQ
//       if (active === "pyq") {
//         url = editingId
//           ? `http://localhost:5000/api/pyq/${editingId}`
//           : "http://localhost:5000/api/pyq";

//         const formData = new FormData();
//         formData.append("title", title);
//         formData.append("subject", subject);
//         formData.append("year", year);
//         if (file) formData.append("file", file);

//         data = formData;

//         config.headers["Content-Type"] = "multipart/form-data";

//         if (editingId) {
//           await axios.put(url, data, config);
//           alert("PYQ Updated");
//         } else {
//           await axios.post(url, data, config);
//           alert("PYQ Added");
//         }

//         fetchPyqs();
//       }

//       // reset
//       setTitle("");
//       setDescription("");
//       setDate("");
//       setSubject("");
//       setYear("");
//       setFile(null);
//       setEditingId(null);
//       setEditingNoticeId(null);

//     } catch (err) {
//       console.error(err);
//       alert("Error adding data");
//     }
//   };

//   // 🔥 DELETE NOTICE
//   const handleDeleteNotice = async (id) => {
//     await axios.delete(`http://localhost:5000/api/notices/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchNotices();
//   };

//   // 🔥 EDIT NOTICE
//   const handleEditNotice = (item) => {
//     setTitle(item.title);
//     setDescription(item.description);
//     setEditingNoticeId(item._id);
//   };

//   // DELETE PYQ
//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/pyq/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchPyqs();
//   };

//   // EDIT PYQ
//   const handleEdit = (item) => {
//     setTitle(item.title);
//     setSubject(item.subject);
//     setYear(item.year);
//     setEditingId(item._id);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex">

//       {/* SIDEBAR */}
//       <aside className="w-64 bg-red-700 text-white fixed top-0 bottom-0 left-0">
//         <div className="p-6 text-2xl font-bold border-b border-red-500">
//           Admin Panel
//         </div>

//         <nav className="p-6 space-y-4 flex flex-col">

//           <button onClick={() => setActive("notice")} className={`${active==="notice"?"bg-white text-red-700":""} px-4 py-2 rounded`}>
//             Notices
//           </button>

//           <button onClick={() => setActive("announcement")} className={`${active==="announcement"?"bg-white text-red-700":""} px-4 py-2 rounded`}>
//             Announcements
//           </button>

//           <button onClick={() => setActive("event")} className={`${active==="event"?"bg-white text-red-700":""} px-4 py-2 rounded`}>
//             Events
//           </button>

//           <button onClick={() => setActive("pyq")} className={`${active==="pyq"?"bg-white text-red-700":""} px-4 py-2 rounded`}>
//             PYQ
//           </button>

//           <button
//             onClick={() => {
//               localStorage.removeItem("adminToken");
//               window.location.href = "/admin/login";
//             }}
//             className="mt-10 bg-white text-red-700 py-2 rounded-lg font-semibold"
//           >
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* MAIN */}
//       <main className="ml-64 flex-1 p-10">

//         <h1 className="text-3xl font-bold text-red-700 mb-6 capitalize">
//           {active === "pyq" ? "Manage PYQs" : `Add ${active}`}
//         </h1>

//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow max-w-xl space-y-4">

//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e)=>setTitle(e.target.value)}
//             required
//             className="w-full border p-3 rounded"
//           />

//           {active === "pyq" ? (
//             <>
//               <select value={subject} onChange={(e)=>setSubject(e.target.value)} className="w-full border p-3 rounded">
//                 <option value="">Select Subject</option>
//                 {subjects.map(s => <option key={s}>{s}</option>)}
//               </select>

//               <select value={year} onChange={(e)=>setYear(e.target.value)} className="w-full border p-3 rounded">
//                 <option value="">Select Year</option>
//                 {years.map(y => <option key={y}>{y}</option>)}
//               </select>

//               <input type="file" onChange={(e)=>setFile(e.target.files[0])} className="w-full border p-3 rounded" />
//             </>
//           ) : (
//             <>
//               <textarea
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e)=>setDescription(e.target.value)}
//                 required
//                 className="w-full border p-3 rounded"
//               />
//             </>
//           )}

//           <button className="w-full bg-red-700 text-white py-3 rounded-lg">
//             {(editingId || editingNoticeId) ? "Update" : "Add"}
//           </button>
//         </form>

//         {/* 🔥 NOTICE LIST */}
//         {active === "notice" && (
//           <div className="mt-10 space-y-3">
//             {notices.map(item => (
//               <div key={item._id} className="bg-white p-4 rounded shadow flex justify-between">
//                 <div>
//                   <h4 className="font-semibold">{item.title}</h4>
//                   <p className="text-sm">{item.description}</p>
//                 </div>

//                 <div className="space-x-2">
//                   <button onClick={()=>handleEditNotice(item)} className="bg-blue-500 text-white px-3 py-1 rounded">
//                     Edit
//                   </button>
//                   <button onClick={()=>handleDeleteNotice(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* 🔥 PYQ LIST */}
//         {active === "pyq" && (
//           <div className="mt-10 space-y-3">
//             {pyqs.map(item => (
//               <div key={item._id} className="bg-white p-4 rounded shadow flex justify-between">
//                 <div>
//                   <h4 className="font-semibold">{item.title}</h4>
//                   <p className="text-sm">{item.subject} | {item.year}</p>
//                 </div>

//                 <div className="space-x-2">
//                   <button onClick={()=>handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded">
//                     Edit
//                   </button>
//                   <button onClick={()=>handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//       </main>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [active, setActive] = useState("notice");

  // common fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // PYQ fields
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);

  const [pyqs, setPyqs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // NOTICE STATE
  const [notices, setNotices] = useState([]);
  const [editingNoticeId, setEditingNoticeId] = useState(null);

  // ANNOUNCEMENT STATE
  const [announcements, setAnnouncements] = useState([]);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState(null);

  // EVENT STATE
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);

  const token = localStorage.getItem("adminToken");

  const subjects = [
    "DBMS","Operating Systems","Computer Networks","Data Structures",
    "Algorithms","Software Engineering","AI","ML","Cloud Computing",
    "Cyber Security","Java","Python","C Programming","Web Development"
  ];

  const years = Array.from({ length: 11 }, (_, i) => 2016 + i);

  // FETCH FUNCTIONS
  const fetchPyqs = async () => {
    const res = await axios.get("http://localhost:5000/api/pyq");
    setPyqs(res.data);
  };

  const fetchNotices = async () => {
    const res = await axios.get("http://localhost:5000/api/notices");
    setNotices(res.data);
  };

  const fetchAnnouncements = async () => {
    const res = await axios.get("http://localhost:5000/api/announcements");
    setAnnouncements(res.data);
  };

  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/api/events");
    setEvents(res.data);
  };

  useEffect(() => {
    if (active === "pyq") fetchPyqs();
    if (active === "notice") fetchNotices();
    if (active === "announcement") fetchAnnouncements();
    if (active === "event") fetchEvents();
  }, [active]);

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let config = { headers: { Authorization: `Bearer ${token}` } };

      // NOTICE
      if (active === "notice") {
        if (editingNoticeId) {
          await axios.put(`http://localhost:5000/api/notices/${editingNoticeId}`, { title, description }, config);
          alert("Notice Updated");
        } else {
          await axios.post("http://localhost:5000/api/notices", { title, description }, config);
          alert("Notice Added");
        }
        fetchNotices();
      }

      // ANNOUNCEMENT
      if (active === "announcement") {
        const data = { title, description, date };
        if (editingAnnouncementId) {
          await axios.put(`http://localhost:5000/api/announcements/${editingAnnouncementId}`, data, config);
          alert("Announcement Updated");
        } else {
          await axios.post("http://localhost:5000/api/announcements", data, config);
          alert("Announcement Added");
        }
        fetchAnnouncements();
      }

      // EVENT
      if (active === "event") {
        const data = { title, description, date };
        if (editingEventId) {
          await axios.put(`http://localhost:5000/api/events/${editingEventId}`, data, config);
          alert("Event Updated");
        } else {
          await axios.post("http://localhost:5000/api/events", data, config);
          alert("Event Added");
        }
        fetchEvents();
      }

      // PYQ
      if (active === "pyq") {
        let url = editingId ? `http://localhost:5000/api/pyq/${editingId}` : "http://localhost:5000/api/pyq";
        const formData = new FormData();
        formData.append("title", title);
        formData.append("subject", subject);
        formData.append("year", year);
        if (file) formData.append("file", file);
        config.headers["Content-Type"] = "multipart/form-data";

        if (editingId) {
          await axios.put(url, formData, config);
          alert("PYQ Updated");
        } else {
          await axios.post(url, formData, config);
          alert("PYQ Added");
        }
        fetchPyqs();
      }

      // RESET ALL
      setTitle(""); setDescription(""); setDate("");
      setSubject(""); setYear(""); setFile(null);
      setEditingId(null); setEditingNoticeId(null);
      setEditingAnnouncementId(null); setEditingEventId(null);

    } catch (err) {
      console.error(err);
      alert("Error adding data");
    }
  };

  // DELETE HANDLERS
  const handleDeleteNotice = async (id) => {
    await axios.delete(`http://localhost:5000/api/notices/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchNotices();
  };

  const handleDeleteAnnouncement = async (id) => {
    await axios.delete(`http://localhost:5000/api/announcements/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchAnnouncements();
  };

  const handleDeleteEvent = async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchEvents();
  };

  const handleDeletePyq = async (id) => {
    await axios.delete(`http://localhost:5000/api/pyq/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchPyqs();
  };

  // EDIT HANDLERS
  const handleEditNotice = (item) => {
    setTitle(item.title); setDescription(item.description);
    setEditingNoticeId(item._id);
  };

  const handleEditAnnouncement = (item) => {
    setTitle(item.title); setDescription(item.description); setDate(item.date);
    setEditingAnnouncementId(item._id);
  };

  const handleEditEvent = (item) => {
    setTitle(item.title); setDescription(item.description); setDate(item.date);
    setEditingEventId(item._id);
  };

  const handleEditPyq = (item) => {
    setTitle(item.title); setSubject(item.subject); setYear(item.year);
    setEditingId(item._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-red-700 text-white fixed top-0 bottom-0 left-0">
        <div className="p-6 text-2xl font-bold border-b border-red-500">Admin Panel</div>
        <nav className="p-6 space-y-4 flex flex-col">
          <button onClick={() => setActive("notice")} className={`${active==="notice"?"bg-white text-red-700":""} px-4 py-2 rounded`}>Notices</button>
          <button onClick={() => setActive("announcement")} className={`${active==="announcement"?"bg-white text-red-700":""} px-4 py-2 rounded`}>Announcements</button>
          <button onClick={() => setActive("event")} className={`${active==="event"?"bg-white text-red-700":""} px-4 py-2 rounded`}>Events</button>
          <button onClick={() => setActive("pyq")} className={`${active==="pyq"?"bg-white text-red-700":""} px-4 py-2 rounded`}>PYQ</button>
          <button
            onClick={() => { localStorage.removeItem("adminToken"); window.location.href = "/admin/login"; }}
            className="mt-10 bg-white text-red-700 py-2 rounded-lg font-semibold"
          >Logout</button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="ml-64 flex-1 p-10">
        <h1 className="text-3xl font-bold text-red-700 mb-6 capitalize">
          {active === "pyq" ? "Manage PYQs" : `Add ${active}`}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow max-w-xl space-y-4">
          <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required className="w-full border p-3 rounded" />

          {active === "pyq" ? (
            <>
              <select value={subject} onChange={(e)=>setSubject(e.target.value)} className="w-full border p-3 rounded">
                <option value="">Select Subject</option>
                {subjects.map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={year} onChange={(e)=>setYear(e.target.value)} className="w-full border p-3 rounded">
                <option value="">Select Year</option>
                {years.map(y => <option key={y}>{y}</option>)}
              </select>
              <input type="file" onChange={(e)=>setFile(e.target.files[0])} className="w-full border p-3 rounded" />
            </>
          ) : (
            <>
              <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} required className="w-full border p-3 rounded" />
              {(active === "announcement" || active === "event") && (
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} required className="w-full border p-3 rounded" />
              )}
            </>
          )}

          <button className="w-full bg-red-700 text-white py-3 rounded-lg">{(editingId || editingNoticeId || editingAnnouncementId || editingEventId) ? "Update" : "Add"}</button>
        </form>

        {/* NOTICE LIST */}
        {active === "notice" && (
          <div className="mt-10 space-y-3">
            {notices.map(item => (
              <div key={item._id} className="bg-white p-4 rounded shadow flex justify-between">
                <div><h4 className="font-semibold">{item.title}</h4><p className="text-sm">{item.description}</p></div>
                <div className="space-x-2">
                  <button onClick={()=>handleEditNotice(item)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={()=>handleDeleteNotice(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ANNOUNCEMENT LIST */}
        {active === "announcement" && (
          <div className="mt-10 space-y-3">
            {announcements.map(item => (
              <div key={item._id} className="bg-white p-4 rounded shadow flex justify-between">
                <div><h4 className="font-semibold">{item.title}</h4><p className="text-sm">{item.description} | {item.date}</p></div>
                <div className="space-x-2">
                  <button onClick={()=>handleEditAnnouncement(item)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={()=>handleDeleteAnnouncement(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EVENT LIST */}
        {active === "event" && (
          <div className="mt-10 space-y-3">
            {events.map(item => (
              <div key={item._id} className="bg-white p-4 rounded shadow flex justify-between">
                <div><h4 className="font-semibold">{item.title}</h4><p className="text-sm">{item.description} | {item.date}</p></div>
                <div className="space-x-2">
                  <button onClick={()=>handleEditEvent(item)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={()=>handleDeleteEvent(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PYQ LIST */}
        {active === "pyq" && (
          <div className="mt-10 space-y-3">
            {pyqs.map(item => (
              <div key={item._id} className="bg-white p-4 rounded shadow flex justify-between">
                <div><h4 className="font-semibold">{item.title}</h4><p className="text-sm">{item.subject} | {item.year}</p></div>
                <div className="space-x-2">
                  <button onClick={()=>handleEditPyq(item)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={()=>handleDeletePyq(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default Dashboard;