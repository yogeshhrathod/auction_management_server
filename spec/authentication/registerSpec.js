const { register } = require("../../src/API/authentication/loginAndRegister");
const testCon = require("../testConnection/connection");
const req = {
  body: {
    fname: "john",
    lname: "wick",
    email: "john@gmail.com",
    password: "12345"
  }
};

describe("check user registration", () => {
  beforeAll(async () => {
    await testCon.none("TRUNCATE TABLE users CASCADE");
  });

  it("should register user and return 200 for register successful", async () => {
    const log_code = await register(req, testCon);

    expect(log_code.code).toEqual(200);
  });

  afterAll(async () => {
    await testCon.none("TRUNCATE TABLE users CASCADE");
  });
});

describe("check user registration with already user", () => {
  beforeAll(async () => {
    await testCon.none("TRUNCATE TABLE users CASCADE");
    await testCon.none(
      "INSERT INTO users(name,email,password) VALUES($1, $2, $3)",
      ["john wick", "john@gmail.com", "pass"]
    );
  });
  it("should verify user and return code 400 for user already registered", async () => {
    const log_code = await register(req, testCon);
    expect(log_code.code).toEqual(400);
  });

  afterAll(async () => {
    await testCon.none("TRUNCATE TABLE users CASCADE");
  });
});
