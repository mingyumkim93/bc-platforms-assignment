export enum CustomerRole {
  ADMIN = "001 - Admin",
  CLINICAL = "002 - Clinical personnel",
  WAREHOUSE = "003 - Warehouse personnel"
}

export default interface CustomerUser {
  name: string;
  customerRoles: CustomerRole[];
}
