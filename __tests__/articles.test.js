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

describe("GET /api/articles/:article_id (comment_count)", () => {
  describe("HAPPY PATH", () => {
    it("returns an article with an added comment_count", () => {
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
            comment_count: 11,
          };

          expect(res.body).toMatchObject({ article: article });
        });
    });
  });

  describe("UNHAPPY PATH", () => {
    it("404: not found - if endpoint isn't found", () => {
      return request(app)
        .get("/api/artikuls")
        .expect(404)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "not found!" });
        });
    });
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

// There should be no errors if passed a valid ID with the wrong content, the comment count should just appear as 0 which is accounted for

describe("GET /api/articles", () => {
  describe("HAPPY PATH", () => {
    it("returns an array", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((res) => {
          expect(res.body).toBeInstanceOf(Array);
        });
    });
    it("ensures objects have relevant keys", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((res) => {
          expect(res.body).toBeInstanceOf(Array);
          res.body.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(Number),
              })
            );
          });
        });
    });
  });
});

// I couldn't think of an essential unhappy path for this one as it shares a lot of the same logic from previous models.
// I can test for an empty array but that will never be the case given that the data is always something.
