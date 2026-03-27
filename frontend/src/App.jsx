// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Faculty from "./pages/Faculty";
// import FacultyProfile from "./pages/FacultyProfile"; // 👈 ADD THIS
// import Placement from "./pages/Placement";
// import Dashboard from "./pages/Dashboard";
// import Achievements from "./pages/Achievements";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import About from "./pages/About";


// function Layout({ children }) {
//   const location = useLocation();
//   const isAdminPage = location.pathname.startsWith("/admin");

//   return (
//     <>
//       {!isAdminPage && <Navbar />}
//       {children}
//       {!isAdminPage && <Footer />}
//     </>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           {/* PUBLIC ROUTES */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />

//           {/* ABOUT US ROUTES */}
//           <Route path="/about" element={<About />} />


//           {/* FACULTY ROUTES */}
//           <Route path="/faculty" element={<Faculty />} />
//           <Route path="/faculty/:id" element={<FacultyProfile />} /> {/* 👈 BIO PAGE */}

//           {/* ADMIN LOGIN */}
//           <Route path="/admin/login" element={<Login />} />

//           {/* {ACHIEVEMENTS SECTION} */}
//           <Route path="/achievements" element={<Achievements />} />

//           {/* {PLACEMENTS SECTION} */}
//           <Route path="/placement" element={<Placement />} />

//           {/* ADMIN DASHBOARD (PROTECTED) */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Faculty from "./pages/Faculty";
import FacultyProfile from "./pages/FacultyProfile";
import Placement from "./pages/Placement";
import Dashboard from "./pages/Dashboard";
import Achievements from "./pages/Achievements";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import PYQ from "./pages/PYQ"; // 🔥 ADD THIS
import Events from "./pages/Events"; // 🔥 ADD THIS

function Layout({ children }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
      {children}
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

          {/* FACULTY */}
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/faculty/:id" element={<FacultyProfile />} />

          {/* SECTIONS */}
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/events" element={<Events />} />
          <Route path="/placement" element={<Placement />} />

          {/* 🔥 PYQ PAGE */}
          <Route path="/pyq" element={<PYQ />} />

          {/* ADMIN */}
          <Route path="/admin/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;