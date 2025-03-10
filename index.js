const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const globalErrHandler = require("./Middleware/globalerror");
const AdminRouter = require("./Routes/Admin");
const CollaborationRouter = require("./Routes/Collaboration");
const AppErr = require("./Helper/AppError");
const Db = require("./Config/Database");
const EventRouter = require("./Routes/Events");
const NewsRouter = require("./Routes/News");
const ContactsRouter = require("./Routes/Contacts");
const StudentsRouter = require("./Routes/Students");
const StaffRouter = require("./Routes/Staff");
const ResearchRouter = require("./Routes/Research");
const PublicationRouter = require("./Routes/Publication");
const HomeRouter = require("./Routes/Home");

require("dotenv").config();

const app = express();
Db();

// global Middleware
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());

// Route Middleware
app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1/collaboration", CollaborationRouter);
app.use("/api/v1/event", EventRouter);
app.use("/api/v1/Publication", PublicationRouter);
app.use("/api/v1/news", NewsRouter);
app.use("/api/v1/contacts", ContactsRouter);
app.use("/api/v1/students", StudentsRouter);
app.use("/api/v1/staff", StaffRouter);
app.use("/api/v1/research", ResearchRouter);
app.use("/api/v1/Home", HomeRouter);

//Not Found Route Page
app.use("*", (req, res, next) => {
  return next(new AppErr("Route Not Found", 404));
});

// Global Error
app.use(globalErrHandler);

const PORT = process.env.PORT || 8000;
const Applisten = () => {
  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
};
Applisten();
