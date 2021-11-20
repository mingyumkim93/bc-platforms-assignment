import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routers/user";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`server is starting on port: ${PORT}`));
