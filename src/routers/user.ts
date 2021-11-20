import express from "express";
import BCUser, { BCRole } from "../types/BCUser";
import ClientUser, { ClientRole } from "../types/ClientUser";
import ConvertResult from "../types/ConvertResult";

const userRouter = express.Router();

let BCUsers: BCUser[] = [];
const ROLE_MAPPING = {
  [ClientRole.ADMIN]: BCRole.ADMIN,
  [ClientRole.CLINICAL]: BCRole.CLINICAL,
  [ClientRole.WAREHOUSE]: BCRole.WAREHOUSE
};

function convertToBCUser(clientUser: ClientUser): ConvertResult {
  const convertedBCUser: BCUser = {
    name: clientUser.name,
    bcRoles: clientUser.clientRoles.map((clientRole) => ROLE_MAPPING[clientRole])
  };

  const oldUser = BCUsers.find((user) => user.name === convertedBCUser.name);

  if (!oldUser) {
    BCUsers.push(convertedBCUser);

    return {
      addedRoles: convertedBCUser.bcRoles,
      deletedRoles: [],
      unchangedRoles: []
    };
  } else {
    const oldUserIndex = BCUsers.findIndex((user) => user.name === convertedBCUser.name);
    BCUsers[oldUserIndex] = convertedBCUser;
    const addedRoles: BCRole[] = convertedBCUser.bcRoles.filter((role) => !oldUser.bcRoles.includes(role));
    const deletedRoles: BCRole[] = oldUser.bcRoles.filter((role) => !convertedBCUser.bcRoles.includes(role));
    const unchangedRoles: BCRole[] = convertedBCUser.bcRoles.filter((role) => oldUser.bcRoles.includes(role));

    return {
      addedRoles,
      deletedRoles,
      unchangedRoles
    };
  }
}

userRouter.post("/roles", (req, res) => {
  const clientUser = req.body as ClientUser;
  const result = convertToBCUser(clientUser);
  res.json(result);
});

export default userRouter;
