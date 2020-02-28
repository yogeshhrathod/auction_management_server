const { getProfile, updateProfile } = require("../../src/API/profile/profile");
const testCon = require("../testConnection/connection");
const req = {
  body: {
    fname: "john",
    lname: "wick",
    email: "john@gmail.com",
    password: "12345"
  }
};

describe("user get profile", () => {
  beforeAll(async () => {
    await testCon.none("TRUNCATE TABLE users CASCADE");
    await testCon.none(
      "insert into users (user_id,email,password,name,bio) values (1,'sean@gmail.com','$2a$10$ooAakLZB0d0cIiVZP/216.kZYmvwA.wjgDyZSyr7z8gLexYU3lqRy','sean wick','this is bio')"
    );
  });

  it("should return code 200 and user profile details", async () => {
    const log_code = await getProfile(
      {
        body: {
          id: 1
        }
      },
      testCon
    );
    expect(log_code.code).toEqual(200);
  });

  afterAll(async () => {
    await testCon.none("TRUNCATE TABLE users CASCADE");
  });
});

describe("user update profile", () => {
    beforeAll(async () => {
      await testCon.none("TRUNCATE TABLE users CASCADE");
      await testCon.none(
        "insert into users (user_id,email,password,name,bio) values (1,'sean@gmail.com','$2a$10$ooAakLZB0d0cIiVZP/216.kZYmvwA.wjgDyZSyr7z8gLexYU3lqRy','sean wick','this is bio')"
      );
    });
  
    it("should return code 200 and update user profile details", async () => {
      const log_code = await updateProfile(
        {
            body: {
                name:"chang",
                bio:"this is bioooo",
                email:"john@gmail.com"
              }
        },
        testCon
      );
      expect(log_code.code).toEqual(200);
    });
  
    afterAll(async () => {
      await testCon.none("TRUNCATE TABLE users CASCADE");
    });
  });
  