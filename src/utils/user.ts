import BCUser, { BCRole } from "../types/BCUser";
import ClientUser, { ClientRole } from "../types/ClientUser";
import ConvertResult from "../types/ConvertResult";
import BCUsers from "../data/user";

const ROLE_MAPPING = {
  [ClientRole.ADMIN]: BCRole.ADMIN,
  [ClientRole.CLINICAL]: BCRole.CLINICAL,
  [ClientRole.WAREHOUSE]: BCRole.WAREHOUSE
};

export function convertToBCUser(clientUser: ClientUser): ConvertResult {
  const bcRoles: BCRole[] = [];
  const erroneousRoles: unknown[] = [];

  clientUser.clientRoles.forEach((clientRole) => {
    if (ROLE_MAPPING[clientRole]) bcRoles.push(ROLE_MAPPING[clientRole]);
    else erroneousRoles.push(clientRole);
  });

  const convertedBCUser: BCUser = {
    name: clientUser.name,
    bcRoles
  };

  const oldUser = BCUsers.find((user) => user.name === convertedBCUser.name);

  if (!oldUser) {
    BCUsers.push(convertedBCUser);

    return {
      addedRoles: convertedBCUser.bcRoles,
      deletedRoles: [],
      unchangedRoles: [],
      erroneousRoles
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
      unchangedRoles,
      erroneousRoles
    };
  }
}

export function validateClientUser(clientUser: any): clientUser is ClientUser {
  return typeof clientUser.name === "string" && Array.isArray(clientUser.clientRoles);
}
