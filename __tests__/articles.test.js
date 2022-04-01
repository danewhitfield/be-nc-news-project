const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const app = require("../app");
const seed = require("../db/seeds/seed");

describe("GET /api/articles/:article_id", () => {
  describe("HAPPY PATH", () => {
    it("returns an article object with relevant keys", async () => {
      const res = await request(app).get("/api/articles/1").expect(200);
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

  describe("UNHAPPY PATH", () => {
    it("404: not found - if article_id doesn't exist", async () => {
      const res = await request(app).get("/api/articles/57").expect(404);
      expect(res.body).toMatchObject({ msg: "not found!" });
    });
    it("400: bad request - if article_id is invalid", async () => {
      const res = await request(app)
        .get("/api/articles/fiftyseven")
        .expect(400);
      expect(res.body).toMatchObject({ msg: "bad request!" });
    });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  describe("HAPPY PATH", () => {
    it("returns an article object with the updated votes", async () => {
      const res = await request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 26 })
        .expect(201);
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

  describe("UNHAPPY PATH", () => {
    it("404: not found - if article_id doesn't exist", async () => {
      const res = await request(app)
        .patch("/api/articles/57")
        .send({ inc_votes: 26 })
        .expect(404);
      expect(res.body).toMatchObject({ msg: "not found!" });
    });
    it("400: bad request - if article_id is invalid", async () => {
      const res = await request(app)
        .patch("/api/articles/fiftyseven")
        .send({ inc_votes: 26 })
        .expect(400);
      expect(res.body).toMatchObject({ msg: "bad request!" });
    });
    it("400: bad request - if inc_votes is invalid", async () => {
      const res = await request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "wrong" })
        .expect(400);
      expect(res.body).toMatchObject({ msg: "bad request!" });
    });
  });
});

describe("GET /api/articles/:article_id (comment_count)", () => {
  describe("HAPPY PATH", () => {
    it("returns an article with an added comment_count", async () => {
      const res = await request(app).get("/api/articles/1").expect(200);
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

  describe("UNHAPPY PATH", () => {
    it("404: not found - if endpoint isn't found", async () => {
      const res = await request(app).get("/api/artikuls").expect(404);
      expect(res.body).toMatchObject({ msg: "not found!" });
    });
    it("404: not found - if article_id doesn't exist", async () => {
      const res = await request(app).get("/api/articles/57").expect(404);
      expect(res.body).toMatchObject({ msg: "not found!" });
    });
  });
});

// There should be no errors if passed a valid ID with the wrong content, the comment count should just appear as 0 which is accounted for

describe("GET /api/articles", () => {
  describe("HAPPY PATH", () => {
    it("returns an array", async () => {
      const res = await request(app).get("/api/articles").expect(200);
      expect(res.body).toBeInstanceOf(Array);
    });
    it("ordered by date in DESC order", async () => {
      const res = await request(app).get("/api/articles").expect(200);
      expect(res.body).toBeSortedBy("created_at", { descending: true });
    });
    it("ensures objects have relevant keys", async () => {
      const res = await request(app).get("/api/articles").expect(200);
      expect(res.body).toBeInstanceOf(Array);
      res.body.forEach((article) => {
        expect(article).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          })
        );
      });
    });
  });

  // I couldn't think of an essential unhappy path for this one as it shares a lot of the same logic from previous models.
  // I can test for an empty array but that will never be the case given that the data is always something.

  describe("GET /api/articles/:article_id/comments", () => {
    describe("HAPPY PATH", () => {
      it("returns an array of comments for the article_id - with the relevant keys", async () => {
        const res = await request(app)
          .get("/api/articles/3/comments")
          .expect(200);
        res.body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: expect.any(String),
              article_id: expect.any(Number),
              author: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
            })
          );
        });
        expect(res.body.comments).toBeInstanceOf(Array);
      });
      it("returns an empty array if no comments are found", async () => {
        const res = await request(app)
          .get("/api/articles/2/comments")
          .expect(200);
        expect(res.body.comments).toEqual([]);
      });
    });

    describe("UNHAPPY PATH", () => {
      it("404: not found - if article_id doesn't exist", async () => {
        const res = await request(app)
          .get("/api/articles/57/comments")
          .expect(404);
        expect(res.body).toMatchObject({ msg: "not found!" });
      });
      it("400: bad request - if article_id is invalid", async () => {
        const res = await request(app)
          .get("/api/articles/fiftyseven/comments")
          .expect(400);
        expect(res.body).toMatchObject({ msg: "bad request!" });
      });
      it("404: not found - if endpoint doesn't exist but is valid", async () => {
        const res = await request(app)
          .get("/api/articles/3/cementas")
          .expect(404);
        expect(res.body).toMatchObject({ msg: "not found!" });
      });
    });
  });
});

// POST COMMENTS
describe("POST /api/articles/:article_id/comments", () => {
  describe("HAPPY PATH", () => {
    it("returns the posted comment", async () => {
      const res = await request(app)
        .post("/api/articles/2/comments")
        .send({
          username: "icellusedkars",
          body: "My code is broken.",
        })
        .expect(201);
      const comment = {
        comment_id: 19,
        body: "My code is broken.",
        article_id: 2,
        author: "icellusedkars",
        votes: 0,
        created_at: expect.any(String),
      };
      expect(res.body).toMatchObject(comment);
    });
  });

  describe("UNHAPPY PATH", () => {
    it("404: not found - if article_id doesn't exist", async () => {
      const res = await request(app)
        .post("/api/articles/57/comments")
        .expect(404);
      expect(res.body).toMatchObject({ msg: "not found!" });
    });
    it("404: not found - if author doesn't exist", async () => {
      const res = await request(app)
        .post("/api/articles/2/comments")
        .send({
          username: "daneIsNotAnAuthor",
          body: "My code might not be broken afterall.",
        })
        .expect(404);
      expect(res.body).toMatchObject({ msg: "not found!" });
    });
    it("400: bad request - if endpoint is invalid", async () => {
      const res = await request(app)
        .post("/api/articles/notAnId/comments")
        .send({
          username: "daneIsNotAnAuthor",
          body: "My code might not be broken afterall.",
        })
        .expect(400);
      expect(res.body).toMatchObject({ msg: "bad request!" });
    });
    it("400: bad request - if req.body is empty", async () => {
      const res = await request(app)
        .post("/api/articles/notAnId/comments")
        .send({})
        .expect(400);
      expect(res.body).toMatchObject({ msg: "bad request!" });
    });
  });
});

// GET QUERIES
describe("GET /api/articles?queries", () => {
  describe("HAPPY PATH", () => {
    it("returns an array of articles with a sort_by query which works for any valid column defaulting to descending", async () => {
      const res = await request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toBeSortedBy("votes", { descending: true });
    });
    it("returns an array of articles with a sort_by query which works for any valid column defaulting to descending", async () => {
      const res = await request(app)
        .get("/api/articles?sort_by=ARTICLE_ID")
        .expect(200);
      expect(res.body).toBeSortedBy("article_id", { descending: true });
    });
    it("returns an array of articles ordered by ASC or DESC from the users query", async () => {
      const res = await request(app).get("/api/articles?order=asc").expect(200);
      expect(res.body).toBeSortedBy("created_at");
    });
    it("returns an array of articles ordered by ASC or DESC from the users query", async () => {
      const res = await request(app)
        .get("/api/articles?order=DESC")
        .expect(200);
      expect(res.body).toBeSortedBy("created_at", { descending: true });
    });
    it("returns an array of articles from the users topic query, case-insensitive", async () => {
      const res = await request(app)
        .get("/api/articles?topic=cAtS")
        .expect(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toBeSortedBy("created_at", { descending: true });
      expect(res.body).toEqual([
        {
          article_id: expect.any(Number),
          title: "UNCOVERED: catspiracy to bring down democracy",
          topic: "cats",
          author: "rogersop",
          created_at: expect.any(String),
          votes: 0,
          comment_count: expect.any(Number),
        },
      ]);
    });
    test("200: returns an array of article objects filtered by a chosen topic", async () => {
      const res = await request(app)
        .get("/api/articles?topic=cats")
        .expect(200);
      res.body.forEach((article) => {
        expect(article.topic).toBe("cats");
      });
    });
  });
});
