import BCUser, { BCRole } from "../types/BCUser";
import CustomerUser, { CustomerRole } from "../types/CustomerUser";
import ConvertResult from "../types/ConvertResult";
import BCUsers from "../data/user";

const ROLE_MAPPING = {
  [CustomerRole.ADMIN]: BCRole.ADMIN,
  [CustomerRole.CLINICAL]: BCRole.CLINICAL,
  [CustomerRole.WAREHOUSE]: BCRole.WAREHOUSE
};

export function convertToBCUser(customerUser: CustomerUser): ConvertResult {
  const bcRoles: BCRole[] = [];
  const erroneousRoles: unknown[] = [];

  customerUser.customerRoles.forEach((customerRole) => {
    if (ROLE_MAPPING[customerRole]) bcRoles.push(ROLE_MAPPING[customerRole]);
    else erroneousRoles.push(customerRole);
  });

  const convertedBCUser: BCUser = {
    name: customerUser.name,
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

export function validateCustomerUser(customerUser: any): customerUser is CustomerUser {
  return typeof customerUser.name === "string" && Array.isArray(customerUser.customerRoles);
}
