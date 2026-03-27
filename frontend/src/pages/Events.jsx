import React from "react";
import "../style.css";

const Events = () => {

    const eventsData = [
        {
            date: "23rd Mar",
            place: "Mega Auditorium",
            title: "Dense core vesicles- Biogene..",
            desc: "Bhavani Shankar Sahu from NBRC will...",
            location: "GIET Univeristy"
        },
        {
            date: "25th Mar",
            place: "IE-303",
            title: "A Two Day Hands on Training..",
            desc: "The Department of Mechanical...",
            location: "GIET Univeristy"
        },
        {
            date: "26th Mar",
            place: "Mega Auditorium",
            title: "World Theatre Day",
            desc: "Celebrate World Theatre Day 2026...",
            location: "GIET Univeristy"
        },
        {
            date: "25th May",
            place: "ONLINE",
            title: "Artificial Intelligence Machine..",
            desc: "5-Day Management Development...",
            location: "GIET Univeristy"
        },
        {
            date: "24th Sep",
            place: "EEE Auditorium",
            title: "ICSSR sponsored 2 Day Natio..",
            desc: "Seminar is on educating on GST...",
            location: "GIET Univeristy"
        },
        {
            date: "10th Oct",
            place: "Mega Auditorium",
            title: "Tech Innovation Summit",
            desc: "Latest trends in technology...",
            location: "GIET Univeristy"
        },
        {
            date: "18th Nov",
            place: "Main Block",
            title: "Startup Workshop",
            desc: "Learn how to build startups...",
            location: "GIET Univeristy"
        },
        {
            date: "5th Dec",
            place: " Mega Auditorium",
            title: "Cultural Fest",
            desc: "Annual cultural celebration...",
            location: "GIET Univeristy"
        }
    ];

    return (
        <section className="eventsSection">

            <div className="eventsWrapper">

                <h1 className="eventsTitle">Upcoming Events</h1>

                {/* HERO IMAGE */}
                <div className="eventsHero">
                    <img src="/images/events.jpg" alt="events" />
                </div>

                <div className="eventsGrid">

                    {eventsData.map((event, index) => (
                        <div className="eventCard" key={index}>

                            <span className="eventDate">{event.date}</span>
                            <span className="eventPlace">🏫 {event.place}</span>

                            <h3>{event.title}</h3>
                            <p>{event.desc}</p>

                            <div className="eventLocation">📍 {event.location}</div>

                            <div className="eventActions">
                                <button>View Details</button>
                                <a href="#">Register Here ↗</a>
                            </div>

                        </div>
                    ))}

                </div>

                <div className="viewAll">
                    <a href="#">View All Events ↗</a>
                </div>

            </div>

        </section>
    );
};

export default Events;