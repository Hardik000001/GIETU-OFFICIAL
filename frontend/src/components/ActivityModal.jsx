import { useState } from "react";
import API from "../services/axios";

const ActivityModal = ({ activity, onClose }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        branch: "",
        roll: ""
    });

    const submit = async () => {
        if (!form.email.includes("@")) {
            alert("Invalid Email");
            return;
        }

        await API.post("/registrations/register", {
            ...form,
            activityId: activity._id,
            activityTitle: activity.title
        });

        alert("Registered Successfully ✅");
        onClose();
    };

    return (
        <div className="modal">
            <h3>{activity.title}</h3>

            <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Branch" onChange={(e) => setForm({ ...form, branch: e.target.value })} />
            <input placeholder="Roll" onChange={(e) => setForm({ ...form, roll: e.target.value })} />

            <button onClick={submit}>Submit</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ActivityModal;