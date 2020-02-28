const addPost = require("../../src/API/addPost/addPost");
const uploadPic = require("../../src/API/uploadImages/uploadAuctionImages");
const testCon = require("../testConnection/connection");
const req={
    body:{
        user_id:1,
        title:"title",
        description:"description",
        initial_bid:"400",
        exp_date:"24/08/2019",
        name:"post.jpg",
        type:"open",
        multiple:"340"
    },
    files: {
      file: {
        name: 'abc.png'
      }
    }
}


const fakeUpload = async (fileName) => {
  if (fileName.name === 'abc.png'){
    return {code: 200}
  }
  return {code: 400}

}
describe("check add new user post by user", () => {

  beforeAll(async () => {
    await testCon.none("TRUNCATE TABLE users CASCADE");
    await testCon.none("TRUNCATE TABLE auction CASCADE");
  });

  it("put an new post", async () => {
    spyOn(uploadPic, 'fileUpload').and.callFake(fakeUpload)
    const log_code = await addPost.postInsert(req, testCon);
    expect(log_code.code).toEqual(200);
  });

  afterAll(async () => {
    await testCon.none("TRUNCATE TABLE auction CASCADE");
    
  });
});
