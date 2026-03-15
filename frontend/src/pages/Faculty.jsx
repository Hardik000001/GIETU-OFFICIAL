import React from "react";
import { Link } from "react-router-dom";

const facultyData = [
  {
    id: 1,
    name: "Prof. Satya Narayan Das",
    designation: "Head of the Department",
    email: "sndas@giet.edu",
    image: "hod.png",
  },
  {
    id: 2,
    name: "Mr. Prahallad kumar Sahu",
    designation: "Batch Coordinator",
    email: "anay@giet.edu",
    image: "PrahalladSir.jpeg",
  },
  {
    id: 3,
    name: "Mr. Mahesh kumar Dakua",
    designation: "Assistant Professor",
    email: "anay@giet.edu",
    image: "MaheshSir.png",
  },
];

function Faculty() {
  return (
    <div className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-lg p-10">
          <h1 className="text-4xl font-bold text-center text-red-700 mb-14">
            Our Faculty
          </h1>

          {/* FACULTY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {facultyData.map((faculty) => (
              <Link
                key={faculty.id}
                to={`/faculty/${faculty.id}`}
                className="group"
              >
                <div
                  className="border rounded-2xl overflow-hidden bg-white
                  hover:shadow-2xl hover:-translate-y-2
                  transition-all duration-300"
                >
                  {/* IMAGE (FULL WIDTH, NO GAP) */}
                  <div className="h-72 w-full overflow-hidden">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      onError={(e) =>
                        (e.target.src = "/default-user.png")
                      }
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-700 transition">
                      {faculty.name}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      {faculty.designation}
                    </p>

                    <p className="text-sm text-blue-600 mt-2">
                      {faculty.email}
                    </p>
                  </div>

                  {/* BOTTOM HOVER LINE */}
                  <div className="h-1 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Faculty;
