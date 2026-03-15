import React from "react";

function Hero() {
  return (
    <section className="relative -mt-20 bg-gradient-to-r from-red-800 to-red-600 text-white pb-24 overflow-hidden">
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 py-28">
        <div className="max-w-3xl">

          <p className="uppercase tracking-widest text-sm text-red-200 mb-4">
            GIET University • Department of Computer Applications
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Welcome to <br />
            <span className="text-yellow-300">
              GIET DeptConnect
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 leading-relaxed">
            A centralized digital platform for notices, announcements,
            academic events, achievements, and departmental updates —
            connecting students, faculty, and administration seamlessly.
          </p>

        </div>
      </div>

      {/* BOTTOM CURVE */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          d="M0,50 C150,100 350,0 720,40 1100,80 1300,40 1440,20 L1440,0 L0,0 Z"
        />
      </svg>

    </section>
  );
}

export default Hero;
