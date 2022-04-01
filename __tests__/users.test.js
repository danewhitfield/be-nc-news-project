const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const app = require("../app");
const seed = require("../db/seeds/seed");

describe("GET /api/users", () => {
  describe("HAPPY PATH", () => {
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

          expect(res.body).toMatchObject({ users });
        });
    });
  });

  describe("UNHAPPY PATH", () => {
    it("404: not found - if endpoint is spelt wrong", () => {
      return request(app)
        .get("/api/yousas")
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({ msg: "not found!" });
        });
    });
  });
});

describe("GET /api/users/:username", () => {
  describe("HAPPY PATH", () => {
    it("returns an array of objects with username property", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200)
        .then((res) => {
          const user = {
            username: "lurker",
            name: "do_nothing",
            avatar_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          };

          expect(res.body).toEqual({ user });
        });
    });
  });

  describe("UNHAPPY PATH", () => {
    it("404: not found - if username doesn't exist", () => {
      return request(app)
        .get("/api/users/daneIsDefoAUser")
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({ msg: "not found!" });
        });
    });
  });
});

describe("POST /api/users", () => {
  describe("HAPPY PATH", () => {
    it("returns the new user that has been created", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "danewhitfield",
          name: "dane",
          avatar_url: "https://www.google.com/cats",
        })
        .expect(201)
        .then((res) => {
          const user = {
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          };

          expect(res.body).toMatchObject({ user });
        });
    });
  });

  describe("UNHAPPY PATH", () => {
    it("400: bad request - if the username or name fields are left blank", () => {
      return request(app)
        .post("/api/users")
        .send({ username: "123" })
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({
            msg: "username and name fields are required!",
          });
        });
    });
    it("400: bad request - if user leaves the req.body empty", () => {
      return request(app)
        .post("/api/users")
        .send({})
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({
            msg: "username and name fields are required!",
          });
        });
    });
    it("400: bad request - if user passes numbers instead of strings", () => {
      return request(app)
        .post("/api/users")
        .send({ username: 832742, name: 7264238 })
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "invalid username or name!" });
        });
    });
  });
});

describe("DELETE /api/users/username", () => {
  describe("HAPPY PATH", () => {
    it("delete the given user by their username", () => {
      return request(app).delete("/api/users/lurker").expect(204);
    });
  });

  // describe("UNHAPPY PATH", () => {
  //   it("404: not found - if username doesn't exist", () => {
  //     return request(app)
  //       .delete("/api/users/shmaneshmitshmield")
  //       .expect(404)
  //       .then((res) => {
  //         expect(res.body).toMatchObject({ msg: "not found!" });
  //       });
  //   });
  // });
});
