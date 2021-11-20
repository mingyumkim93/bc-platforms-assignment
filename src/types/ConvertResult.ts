import { BCRole } from "./BCUser";

export default interface ConvertResult {
  addedRoles: BCRole[];
  deletedRoles: BCRole[];
  unchangedRoles: BCRole[];
}
