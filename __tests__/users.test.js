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
