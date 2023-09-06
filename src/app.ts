import "express-async-errors";
import express, { Application, json } from "express";
import handleErrors from "./middlewares/handleErrors";
import { userRouter } from "./routers/user.routers";
import { sessionRouter } from "./routers/session.router";
import { courseRouter } from "./routers/course.routers";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/courses", courseRouter)

app.use(handleErrors);

export default app;
