import request from "supertest";
import app from "../app";
import CustomerUser, { CustomerRole } from "../types/CustomerUser";
import { BCRole } from "../types/BCUser";
import ConversionResult from "../types/ConversionResult";

describe("POST /user/roles", () => {
  describe("when valid user is sent", () => {
    test("should response with a 200 status code", async () => {
      const validCustomerUser: CustomerUser = { name: "valid user", customerRoles: [CustomerRole.ADMIN] };
      const response = await request(app).post("/user/roles").send(validCustomerUser);
      expect(response.status).toBe(200);
    });

    test("should response with role conversion result", async () => {
      const customerUser: CustomerUser = { name: "user", customerRoles: [CustomerRole.ADMIN, CustomerRole.CLINICAL] };
      const firstResponse = await request(app).post("/user/roles").send(customerUser);
      const firstResult: ConversionResult = {
        addedRoles: [BCRole.ADMIN, BCRole.CLINICAL],
        unchangedRoles: [],
        deletedRoles: [],
        erroneousRoles: []
      };
      expect(firstResponse.body).toStrictEqual(firstResult);

      const customerUserWithUpdatedRoles: CustomerUser = {
        name: "user",
        customerRoles: [CustomerRole.CLINICAL, CustomerRole.WAREHOUSE]
      };
      const secondResponse = await request(app).post("/user/roles").send(customerUserWithUpdatedRoles);
      const secondResult: ConversionResult = {
        addedRoles: [BCRole.WAREHOUSE],
        unchangedRoles: [BCRole.CLINICAL],
        deletedRoles: [BCRole.ADMIN],
        erroneousRoles: []
      };
      expect(secondResponse.body).toStrictEqual(secondResult);
    });

    test("should response with erroneous roles for invalid role", async () => {
      const INVALID_ROLE = "invalid role";
      const userWithInvalidRole = { name: "user with invalid role", customerRoles: [INVALID_ROLE] };
      const response = await request(app).post("/user/roles").send(userWithInvalidRole);
      const result: ConversionResult = {
        addedRoles: [],
        unchangedRoles: [],
        deletedRoles: [],
        erroneousRoles: [INVALID_ROLE]
      };
      expect(response.body).toStrictEqual(result);
    });
  });

  describe("when invalid user is sent", () => {
    test("should response with a 400 status code", async () => {
      const invalidCustomerUser = { invalidProperty: "invalid value" };
      const response = await request(app).post("/user/roles").send(invalidCustomerUser);
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({ message: "Not a valid customer user!" });
    });
  });
});
