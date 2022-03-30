const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const app = require("../app");
const seed = require("../db/seeds/seed");
const endpoints = require("../endpoints.json");

describe("GET /api/articles/:article_id", () => {
  describe("HAPPY PATH", () => {
    it("returns an object with all of the api/endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject(endpoints);
        });
    });
  });
});
