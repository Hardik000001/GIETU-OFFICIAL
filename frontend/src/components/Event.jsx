import { useEffect, useState } from "react";
import API from "../services/axios";

const Event = ({ editable = false }) => {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [editId, setEditId] = useState(null);

    const fetchEvents = async () => {
        const res = await API.get("/events");
        setEvents(res.data);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        if (editId) {
            const res = await API.put(`/events/${editId}`, {
                title,
                description,
                date,
            });
            setEvents(events.map((e) => (e._id === editId ? res.data : e)));
            setEditId(null);
        } else {
            const res = await API.post("/events", {
                title,
                description,
                date,
            });
            setEvents([res.data, ...events]);
        }

        setTitle("");
        setDescription("");
        setDate("");
    };

    const edit = (e) => {
        setEditId(e._id);
        setTitle(e.title);
        setDescription(e.description);
        setDate(e.date);
    };

    const del = async (id) => {
        await API.delete(`/events/${id}`);
        setEvents(events.filter((e) => e._id !== id));
    };

    return (
        <div>
            <h2>Events</h2>

            {editable && (
                <form onSubmit={submit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <button>{editId ? "Update" : "Add"}</button>
                </form>
            )}

            {events.map((e) => (
                <div key={e._id}>
                    <h4>{e.title}</h4>
                    <p>{e.description}</p>
                    <small>{e.date}</small>
                    {editable && (
                        <>
                            <button onClick={() => edit(e)}>Edit</button>
                            <button onClick={() => del(e._id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Event;
