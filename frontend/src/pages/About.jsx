import React from "react";

function About() {
  return (
    <div className="bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-lg">

        {/* ABOUT US */}
        <h1 className="text-4xl font-bold text-red-700 mb-6 text-center">
          About Us
        </h1>

        <p className="text-gray-700 leading-relaxed text-justify mb-10">
          The Bachelor of Computer Applications (BCA) Department is dedicated to nurturing future-ready IT professionals by providing a strong foundation in computer science, programming, and modern digital technologies. Our program blends theoretical knowledge with practical exposure, enabling students to develop problem-solving skills and industry-relevant expertise.

        We focus on core areas such as programming languages, data structures, databases, web development, software engineering, and emerging technologies. Through hands-on labs, projects, seminars, and workshops, students gain real-world experience that prepares them for the rapidly evolving tech industry.

        Our department is supported by experienced and committed faculty members who guide students academically and mentor them in professional growth. We encourage innovation, teamwork, ethical practices, and continuous learning to help students excel in higher education, entrepreneurship, and diverse IT careers.

        The BCA Department aims to create skilled, confident, and responsible graduates who can contribute effectively to the digital transformation of society.
        </p>

        {/* VISION & MISSION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* VISION */}
          <div className="bg-gray-50 p-6 rounded-xl border">
            <h2 className="text-2xl font-semibold text-red-700 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To cultivate globally skilled and innovative computing professionals, researchers, and entrepreneurs who will excel and contribute meaningfully to the knowledge-based economy and society.
            </p>
          </div>

          {/* MISSION */}
          <div className="bg-gray-50 p-6 rounded-xl border">
            <h2 className="text-2xl font-semibold text-red-700 mb-3">
              Our Mission
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To offer high-grade, value-based Undergraduate, Postgraduate and Doctoral Programs in Computer Applications.</li>
              <li>To provide a conductive environment for excellence in teaching-learning, research and development activities.</li>
              <li>To bridge the gap betwee industry and academia by framing curricula and syllabi based on industrial and social requirements.</li>
              <li>To offer suitable platforms for nuturing innovative talents, professionally competent professionals, practicing ethical values, and fostering lifelong learning through collaborative and interdisciplinary activities.</li>
            </ul>
          </div>

        </div>

        {/* IMAGE SECTION */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <img
            src="https://via.placeholder.com/400x250"
            alt="Campus"
            className="rounded-xl shadow-md"
          />
          <img
            src="https://via.placeholder.com/400x250"
            alt="Department"
            className="rounded-xl shadow-md"
          />
          <img
            src="https://via.placeholder.com/400x250"
            alt="Students"
            className="rounded-xl shadow-md"
          />
        </div>

      </div>
    </div>
  );
}

export default About;
