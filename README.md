# bc-platforms-assignment

## Introduction
This is the API implementation for the role mapping system defined in the assignment.

## Technologies
- Node.js
- Express.js
- Typescript
- Jest
- Supertest

## Expected behavior
1. If the request's body consists of **valid** customer user type, the customer role is converted to bc role and the user is saved in server. If the customer role cannot be mapped to a bc role, it will be included in **erroneousRoles** in the result.
2. If the request's body consists of **invalid** customer user type, a response with status 400 (bad request) will be sent. 
