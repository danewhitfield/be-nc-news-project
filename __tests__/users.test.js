const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const app = require("../app");
const seed = require("../db/seeds/seed");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe("GET /api/users", () => {
  describe("HAPPY PATH", () => {
    // it("returns an array of objects with username property", () => {
    //   return request(app)
    //     .get("/api/users")
    //     .expect(200)
    //     .then((res) => {
    //       const users = [
    //         {
    //           username: "butter_bridge",
    //           name: "jonny",
    //           avatar_url:
    //             "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
    //         },
    //         {
    //           username: "icellusedkars",
    //           name: "sam",
    //           avatar_url:
    //             "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
    //         },
    //         {
    //           username: "rogersop",
    //           name: "paul",
    //           avatar_url:
    //             "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
    //         },
    //         {
    //           username: "lurker",
    //           name: "do_nothing",
    //           avatar_url:
    //             "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
    //         },
    //       ];

    //       console.log(res.body);

    //       expect(res.body).toMatchObject({ users: users });
    //     });
    // });
    it("returns an array of objects with username property", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          const users = [
            {
              username: "butter_bridge",
            },
            {
              username: "icellusedkars",
            },
            {
              username: "rogersop",
            },
            {
              username: "lurker",
            },
          ];

          expect(res.body).toMatchObject({ users: users });

          //   res.body.forEach((user) => {
          //     expect(user).toEqual(
          //       expect.objectContaining({
          //         username: expect.any(String),
          //       })
          //     );
          //   });
        });
    });
  });

  describe("UNHAPPY PATH", () => {
    it("404: not found - if endpoint is spelt wrong", () => {
      return request(app)
        .get("/api/yousas")
        .expect(404)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "not found!" });
        });
    });
  });
});
