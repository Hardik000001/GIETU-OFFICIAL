import React from "react";
import { useParams } from "react-router-dom";

const facultyData = [
  {
    id: 1,
    name: "Prof. Satya Narayan Das",
    designation: "Head of the Department",
    email: "sndas@giet.edu",
    image: "/hod.png",
    bio: `Prof. Satya Narayan Das (Member, IEEE) is an Associate Professor in the Department of Computer Science and Applications & HoD at GIET University, Gunupur, Rayagada, Odisha, India. He has over 20 years of experience in teaching and research.

His academic and research interests include Algorithm Design, Cyber Security, Computer Networks, Artificial Intelligence, Programming in C and Python, and Machine Learning. He has authored and co-authored more than seven research papers in reputed journals and conferences, and has also published four books in the field of computer science.

Prof. Das obtained his MCA degree from BPUT, Rourkela, Odisha in 2005 and earned his M.Tech. in Computer Science from Berhampur University, Berhampur, Odisha in 2008. He is currently pursuing his Ph.D. in Computer Science at Utkal University, Bhubaneswar, Odisha, India.`,
  },
  {
    id: 2,
    name: "Mr. Prahallad Kumar Sahu",
    designation: "Assistant Professor",
    email: "anay@giet.edu",
    image: "/PrahalladSir.jpeg",
    bio: `Mr. Prahallad Kumar Sahu (Member ISTE) is an Assistant Professor at the Department of CSE, GIET University, Gunupur, Odisha, India. He has more than 8 years of experience in teaching and research.

His interests include Computer Vision, Cyber Security, Software Engineering, Cloud Computing, Artificial Intelligence, and Machine Learning. He has authored several research papers and is currently pursuing his Ph.D. at GIET University, Gunupur.`,
  },
  {
    id: 3,
    name: "Mr. Mahesh Kumar Dakua",
    designation: "Assistant Professor",
    email: "anay@giet.edu",
    image: "/MaheshSir.png",
    bio: `Mr. Mahesh Kumar Dakua is an Assistant Professor in the Department of Computer Science and Engineering at GIET University, Gunupur, Odisha. He is a Subject Expert in Data Science and is currently pursuing his Ph.D. at KIIT Deemed to be University, Bhubaneswar.

His research interests include Data Science, Edge Computing, Cloud Computing, IoT, DBMS, Artificial Intelligence, and Python Programming. He is an IEEE member and a lifetime member of ISTE.`,
  },
];

function FacultyProfile() {
  const { id } = useParams();
  const faculty = facultyData.find((f) => f.id === parseInt(id));

  if (!faculty) {
    return <p className="text-center mt-20">Faculty not found</p>;
  }

  return (
    <div className="bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-lg">

        {/* TOP PROFILE SECTION */}
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* LEFT IMAGE */}
          <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={faculty.image}
            alt={faculty.name}
            className="w-64 md:w-72 h-auto rounded-lg object-cover"
          />
        </div>


          {/* RIGHT DETAILS */}
          <div className="w-full md:w-2/3 mt-6 md:mt-12">
            <h1 className="text-3xl font-bold text-gray-900">
              {faculty.name}
            </h1>

            <p className="text-gray-700 font-medium mt-2">
              {faculty.designation}
            </p>

            <p className="text-blue-600 mt-1">
              Email: {faculty.email}
            </p>
          </div>

        </div>

        {/* BIO SECTION */}
        <div className="mt-14">
          <div className="flex items-center gap-6 mb-6">
            <h2 className="text-7xl font-extrabold text-gray-200 leading-none">
              BIO
            </h2>
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
            {faculty.bio}
          </p>
        </div>

      </div>
    </div>
  );
}

export default FacultyProfile;
