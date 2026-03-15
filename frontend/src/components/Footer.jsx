import React from "react";

function Footer() {
  return (
    <footer className="bg-red-800 text-white pt-12">
      {/* CENTER CONTAINER */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl px-6">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* ABOUT */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                GIET DeptConnect
              </h3>
              <p className="text-sm text-red-100 leading-relaxed">
                GIET DeptConnect is a centralized departmental platform
                designed to streamline academic communication, notices,
                events, and student engagement.
              </p>
            </div>

          

            {/* ACADEMICS */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Academics
              </h4>
              <ul className="space-y-2 text-red-100 text-sm">
                <li className="hover:text-white cursor-pointer">BCA</li>
                <li className="hover:text-white cursor-pointer">MCA</li>
                <li className="hover:text-white cursor-pointer">Time Table</li>
                <li className="hover:text-white cursor-pointer">Syllabus</li>
                <li className="hover:text-white cursor-pointer">PYQ</li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Contact Us
              </h4>
              <p className="text-sm text-red-100">
                Department of Computer Science & Applications
              </p>
              <p className="text-sm text-red-100 mt-2">
                GIET University, Gunupur
              </p>
              <p className="text-sm text-red-100 mt-2">
                Email: csa@giet.edu
              </p>
              <p className="text-sm text-red-100 mt-2">
                Phone: +91 9XXXXXXXXX
              </p>
            </div>

          </div>

          {/* DIVIDER */}
          <div className="border-t border-red-600 mt-10"></div>

          {/* BOTTOM BAR */}
          <div className="text-center text-sm text-red-100 py-6">
            © {new Date().getFullYear()} GIET DeptConnect | All Rights Reserved
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
