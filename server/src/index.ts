import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client, Pool } from "pg";
import express from "express";
import cors from "cors";

import { NewTodo, todos } from "./db/schema";
import { eq, sql } from "drizzle-orm";

async function main() {
  const connectionURI = "postgres://postgres:postgres@localhost:5432/todo";
  const port = 4000;

  /* ################ Drizzle migration setup ################ */
  const client = new Client({
    connectionString: connectionURI,
  });
  await client.connect();
  await migrate(drizzle(client), {
    migrationsFolder: "drizzle",
  });

  const pool = new Pool({
    connectionString: connectionURI,
  });
  const db = drizzle(pool, { logger: true });

  /* ################ Express endpoints ################ */
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/todos", async (_, res) => {
    console.log("Getting all todos...");
    const allTodos = await db.select().from(todos);

    res.json(allTodos);
  });

  app.post("/todos", async (req, res) => {
    console.log("Inserting new todo...");

    const newTodo: NewTodo = {};
    newTodo.description = req.body.description;

    const insertedTodo = await db.insert(todos).values(newTodo).returning();

    res.json(insertedTodo[0]);
  });

  app.put("/todos/:id", async (req, res) => {
    console.log(`Updating todo with id=${req.params.id}...`);
    const todoId = Number(req.params.id);

    const newTodo: NewTodo = {};
    newTodo.description = req.body.description;
    newTodo.updatedAt = new Date();

    const updatedTodo = await db
      .update(todos)
      .set(newTodo)
      .where(eq(todos.id, todoId))
      .returning();

    res.json(updatedTodo[0]);
  });

  app.delete("/todos/:id", async (req, res) => {
    console.log(`Deleting todo with id=${req.params.id}...`);

    const todoId = Number(req.params.id);

    const deletedTodo = await db
      .delete(todos)
      .where(eq(todos.id, todoId))
      .returning();

    res.json(deletedTodo[0]);
  });

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

main().catch((err) => console.error(err));
