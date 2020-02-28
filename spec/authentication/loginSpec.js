const { login } = require("../../src/API/authentication/loginAndRegister");
const testCon = require("../testConnection/connection");
const reqRight = {
  body: {
    email: "sean@gmail.com",
    password: "1234"
  }
};
const reqWrongPass = {
  body: {
    email: "sean@gmail.com",
    password: "12345"
  }
};
const reqWrongEmail = {
  body: {
    email: "seano@gmail.com",
    password: "12345"
  }
};
describe("check user registration", () => {
  beforeAll(async () => {
    await testCon.none(
      "insert into users (email,password,name) values ('sean@gmail.com','$2a$10$ooAakLZB0d0cIiVZP/216.kZYmvwA.wjgDyZSyr7z8gLexYU3lqRy','sean wick')"
    );
  });

  it("should verify user and return code 200 for login successful", async () => {
    const log_code = await login(reqRight, testCon);
    expect(log_code.code).toEqual(200);
  });

  it("should verify user and return code 400 for unauthorized user wrong password", async () => {
    const log_code = await login(reqWrongPass, testCon);
    expect(log_code.code).toEqual(400);
  });

  it("should verify user and return code 400 for unauthorized user wrong email", async () => {
    const log_code = await login(reqWrongEmail, testCon);
    expect(log_code.code).toEqual(400);
  });

  afterAll(async () => {
    await testCon.none("TRUNCATE TABLE users CASCADE");
  });
  
});