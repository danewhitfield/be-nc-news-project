const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const app = require("../app");
const seed = require("../db/seeds/seed");

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
    it("400: bad request - if article_id is invalid", () => {
      return request(app)
        .get("/api/articles/fiftyseven")
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "bad request!" });
        });
    });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  describe("HAPPY PATH", () => {
    it("returns an article object with the updated votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 26 })
        .expect(201)
        .then((res) => {
          const article = {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: expect.any(String),
            votes: 126,
          };

          expect(res.body).toMatchObject({ article: article });
        });
    });
  });

  describe("UNHAPPY PATH", () => {
    it("404: not found - if article_id doesn't exist", () => {
      return request(app)
        .patch("/api/articles/57")
        .send({ inc_votes: 26 })
        .expect(404)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "not found!" });
        });
    });
    it("400: bad request - if article_id is invalid", () => {
      return request(app)
        .patch("/api/articles/fiftyseven")
        .send({ inc_votes: 26 })
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "bad request!" });
        });
    });
    it("400: bad request - if inc_votes is invalid", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "wrong" })
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "bad request!" });
        });
    });
  });
});
