import express from "express";

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => console.log(`server is starting on port: ${PORT}`));
