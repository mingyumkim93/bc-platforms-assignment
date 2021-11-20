import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routers/user";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRouter);

export default app;
