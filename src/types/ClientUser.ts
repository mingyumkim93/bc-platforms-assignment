export enum ClientRole {
  ADMIN = "001 - Admin",
  CLINICAL = "002 - Clinical personnel",
  WAREHOUSE = "003 - Warehouse personnel"
}

export default interface ClientUser {
  name: string;
  clientRoles: ClientRole[];
}
