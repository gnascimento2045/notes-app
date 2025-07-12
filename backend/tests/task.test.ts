import request from "supertest";
import app from "../src/app";

describe("Task API", () => {
  describe("GET /api/tasks", () => {
    it("should return all tasks", async () => {
      const response = await request(app).get("/api/tasks").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
      const taskData = {
        title: "Test Task",
        description: "Test Description",
      };

      const response = await request(app)
        .post("/api/tasks")
        .send(taskData)
        .expect(201);

      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
    });
  });
});
