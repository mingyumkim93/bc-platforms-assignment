import { BCRole } from "./BCUser";

export default interface ConvertResult {
  addedRoles: BCRole[];
  deletedRoles: BCRole[];
  unchangedRoles: BCRole[];
  //for roles that can't be mapped to bc-role
  erroneousRoles: unknown[];
}
