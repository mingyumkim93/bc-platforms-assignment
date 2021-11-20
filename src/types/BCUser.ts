export enum BCRole {
  ADMIN = "BC_ADMIN",
  CLINICAL = "BC_CLINICAL",
  WAREHOUSE = "BC_WAREHOUSE"
}

export default interface BCUser {
  name: string;
  bcRoles: BCRole[];
}
