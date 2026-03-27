// require("dotenv").config();


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// /* MIDDLEWARE */
// app.use(cors());
// app.use(express.json());


// /* DATABASE */
// mongoose
//   .connect("mongodb://127.0.0.1:27017/giet_deptconnect")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
  
//   const JWT_SECRET = "supersecretkey";


// /* ROUTES */
// app.use("/api/notices", require("./routes/noticeRoutes"));
// app.use("/api/events", require("./routes/eventRoutes"));
// app.use("/api/announcements", require("./routes/announcementRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));

// /* SERVER */
// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* DATABASE */
mongoose
  .connect("mongodb://127.0.0.1:27017/giet_deptconnect")
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

/* ROUTES */
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/uploads", express.static("uploads"));

// 🔥 ADD THIS
app.use("/api/pyq", require("./routes/pyqRoutes"));

/* SERVER */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});