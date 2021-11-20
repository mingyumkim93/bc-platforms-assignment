import express from "express";
import { convertToBCUser, validateClientUser } from "../utils/user";

const userRouter = express.Router();

userRouter.post("/roles", (req, res) => {
  const clientUser = req.body;
  const isValid = validateClientUser(clientUser);
  if (!isValid) {
    res.status(400).json({ message: "Not a valid client user!" });
  } else {
    const result = convertToBCUser(clientUser);
    res.json(result);
  }
});

export default userRouter;
