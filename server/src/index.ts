import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client, Pool } from "pg";
import express from "express";

import { todos } from "./db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const connectionString = "postgres://postgres:postgres@localhost:5432/todo";
  const port = 4000;

  /* ################ Drizzle migration setup ################ */
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await migrate(drizzle(client), {
    migrationsFolder: "drizzle",
  });

  const pool = new Pool({
    connectionString: connectionString,
  });
  const db = drizzle(pool);

  /* ################ Express endpoints ################ */
  const app = express();

  app.get("/todos", async (_, res) => {
    console.log("All todos hit...");
    const allTodos = await db.select().from(todos);

    res.json(allTodos);
  });

  app.post("/todos", async (req, res) => {
    console.log("Post hit...");
    const insertedTodo = await db.insert(todos).values(req.body).returning();

    res.json(insertedTodo);
  });

  app.put("/todos:id", async (req, res) => {
    console.log("Put hit...");
    const todoId = Number(req.params.id);
    const updatedTodo = await db
      .update(todos)
      .set({ description: req.body.description })
      .where(eq(todos.id, todoId))
      .returning();

    res.json(updatedTodo);
  });

  app.delete("/todos/:id", async (req, res) => {
    try {
      const todoId = Number(req.params.id);
      console.log(todoId);
      const deletedTodo = await db
        .delete(todos)
        .where(eq(todos.id, todoId))
        .returning({ id: todos.id });

      if (deletedTodo.length === 0) {
        res.json({ message: "Todo doesnt exist" });
      } else {
        res.json(deletedTodo);
      }
    } catch (err) {
      console.error(err);
      res.json({ error: "Something happened deleting todo..." });
    }
  });

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

main().catch((err) => console.error(err));
