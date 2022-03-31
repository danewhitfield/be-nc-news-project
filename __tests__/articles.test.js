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
    it("ordered by date in DESC order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((res) => {
          expect(res.body).toBeSortedBy("created_at", { descending: true });
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
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(Number),
              })
            );
          });
        });
    });
  });

  // I couldn't think of an essential unhappy path for this one as it shares a lot of the same logic from previous models.
  // I can test for an empty array but that will never be the case given that the data is always something.

  describe("GET /api/articles/:article_id/comments", () => {
    describe("HAPPY PATH", () => {
      it("returns an array of comments for the article_id - with the relevant keys", () => {
        return request(app)
          .get("/api/articles/3/comments")
          .expect(200)
          .then((res) => {
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
      });
      it("returns an empty array if no comments are found", () => {
        return request(app)
          .get("/api/articles/2/comments")
          .expect(200)
          .then((res) => {
            expect(res.body.comments).toEqual([]);
          });
      });
    });

    describe("UNHAPPY PATH", () => {
      it("404: not found - if article_id doesn't exist", () => {
        return request(app)
          .get("/api/articles/57/comments")
          .expect(404)
          .then((res) => {
            expect(res.body).toMatchObject({ msg: "not found!" });
          });
      });
      it("400: bad request - if article_id is invalid", () => {
        return request(app)
          .get("/api/articles/fiftyseven/comments")
          .expect(400)
          .then((res) => {
            expect(res.body).toMatchObject({ msg: "bad request!" });
          });
      });
      it("404: not found - if endpoint doesn't exist but is valid", () => {
        return request(app)
          .get("/api/articles/3/cementas")
          .expect(404)
          .then((res) => {
            expect(res.body).toMatchObject({ msg: "not found!" });
          });
      });
    });
  });
});

// POST COMMENTS
describe("POST /api/articles/:article_id/comments", () => {
  describe("HAPPY PATH", () => {
    it("returns the posted comment", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .send({
          username: "icellusedkars",
          body: "My code is broken.",
        })
        .expect(201)
        .then((res) => {
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
  });

  describe("UNHAPPY PATH", () => {
    it("404: not found - if article_id doesn't exist", () => {
      return request(app)
        .post("/api/articles/57/comments")
        .expect(404)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "not found!" });
        });
    });
    it("404: not found - if author doesn't exist", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .send({
          username: "daneIsNotAnAuthor",
          body: "My code might not be broken afterall.",
        })
        .expect(404)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "not found!" });
        });
    });
    it("400: bad request - if endpoint is invalid", () => {
      return request(app)
        .post("/api/articles/notAnId/comments")
        .send({
          username: "daneIsNotAnAuthor",
          body: "My code might not be broken afterall.",
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "bad request!" });
        });
    });
    it("400: bad request - if req.body is empty", () => {
      return request(app)
        .post("/api/articles/notAnId/comments")
        .send({})
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "bad request!" });
        });
    });
  });
});

// GET QUERIES
describe("GET /api/articles?queries", () => {
  describe("HAPPY PATH", () => {
    it("returns an array of articles with a sort_by query which works for any valid column defaulting to descending", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then((res) => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body).toBeSortedBy("votes", { descending: true });
        });
    });
    it("returns an array of articles with a sort_by query which works for any valid column defaulting to descending", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id")
        .expect(200)
        .then((res) => {
          expect(res.body).toBeSortedBy("article_id", { descending: true });
        });
    });
    it("returns an array of articles ordered by ASC or DESC from the users query", () => {
      return request(app)
        .get("/api/articles?order=ASC")
        .expect(200)
        .then((res) => {
          expect(res.body).toBeSortedBy("created_at");
        });
    });
    it("returns an array of articles ordered by ASC or DESC from the users query", () => {
      return request(app)
        .get("/api/articles?order=DESC")
        .expect(200)
        .then((res) => {
          expect(res.body).toBeSortedBy("created_at", { descending: true });
        });
    });
    it("returns an array of articles ordered by ASC or DESC from the users query", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then((res) => {
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
    });
  });

  describe("UNHAPPY PATH", () => {
    it("404: not found - if topic doesn't exist", () => {
      return request(app)
        .get("/api/articles?topic=iAmNotACat")
        .expect(404)
        .then((res) => {
          expect(res.body).toMatchObject({ msg: "not found!" });
        });
    });
    // THIS ONE IS CHEEKY BUT IT'S TECHNICALLY RIGHT, MAYBE?
    it("200: OK - if topic key is invalid... Defaults to created_at DESC", () => {
      return request(app)
        .get("/api/articles?shmopic=defoNotaTopic")
        .expect(200)
        .then((res) => {
          expect(res.body).toBeSortedBy("created_at", { descending: true });
        });
    });
  });
});
