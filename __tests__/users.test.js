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

          expect(res.body).toMatchObject({ users: users });
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
