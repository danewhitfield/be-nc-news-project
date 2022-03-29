const db = require("./db/connection");
const request = require("supertest");
const testData = require("./db/data/test-data");
const app = require("./app");
const seed = require("./db/seeds/seed");

afterAll(() => db.end());
beforeEach(() => seed(testData));
