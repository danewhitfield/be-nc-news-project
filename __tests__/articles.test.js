const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const app = require("../app");
const seed = require("../db/seeds/seed");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe("GET /api/articles/:article_id", () => {
  describe("HAPPY PATH", () => {
    it("returns an article object with relevant keys", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((res) => {
          const article = {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: expect.any(String),
            votes: 100,
          };

          expect(res.body).toMatchObject({ article: article });
        });
    });
  });

  describe("UNHAPPY PATH", () => {
    it("404: not found - if article_id doesn't exist", () => {
      return request(app)
        .get("/api/articles/57")
        .expect(404)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "not found!" });
        });
    });
  });
});
