const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const app = require("../app");
const seed = require("../db/seeds/seed");
const formatDate = require("../utils/formatDate");

describe("DELETE /api/comments/:comment_id", () => {
  describe("HAPPY PATH", () => {
    it("delete the given comment by comment_id", () => {
      return request(app).delete("/api/comments/3").expect(204);
    });
  });

  describe("UNHAPPY PATH", () => {
    it("404: not found - if comment_id doesn't exist", () => {
      return request(app)
        .delete("/api/comments/874")
        .expect(404)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "not found!" });
        });
    });
  });
});

describe("PATCH /api/comments/:comment_id", () => {
  describe("HAPPY PATH", () => {
    it("has a request body for inc_votes and returns updated comment", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then((res) => {
          const comment = {
            comment_id: 1,
            body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            votes: 17,
            author: "butter_bridge",
            article_id: 9,
            created_at: formatDate(1586179020000),
          };
          expect(res.body.comment).toEqual(comment);
        });
    });
  });

  describe("UNHAPPY PATH", () => {
    it("404: not found - if comment_id doesn't exist", () => {
      return request(app)
        .patch("/api/comments/175")
        .expect(404)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "not found!" });
        });
    });
  });
});
