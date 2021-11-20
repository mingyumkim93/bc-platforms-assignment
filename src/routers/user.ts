import express from "express";
import { convertToBCUser, validateCustomerUser } from "../utils/user";

const userRouter = express.Router();

userRouter.post("/roles", (req, res) => {
  const customerUser = req.body;
  const isValid = validateCustomerUser(customerUser);
  if (!isValid) {
    res.status(400).json({ message: "Not a valid customer user!" });
  } else {
    const result = convertToBCUser(customerUser);
    res.json(result);
  }
});

export default userRouter;
