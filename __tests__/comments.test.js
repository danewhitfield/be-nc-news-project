const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const app = require("../app");
const seed = require("../db/seeds/seed");

describe("DELETE /api/comments/:comment_id", () => {
  describe("HAPPY PATH", () => {
    it("delete the given comment by comment_id", () => {
      return request(app).delete("/api/comments/3").expect(204);
    });
    // it("", () => {
    //   return db.query("SELECT * FROM comments WHERE comment_id = 3");
    // }).then((res) => {
    //   expect(res.rows).toEqual([]);
    // });
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
