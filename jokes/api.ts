import { api } from "encore.dev/api";
import { db } from "./db";

interface Joke {
  id: number;
  setup: string;
  punchline: string;
  created_at: Date;
}

interface RandomJokeResponse {
  joke: Joke;
}

export const getRandomJoke = api(
  {
    method: "GET",
    path: "/random-joke",
    expose: true,
  },
  async (): Promise<RandomJokeResponse> => {
    const joke = await db.queryRow<Joke>`
        SELECT id, setup, punchline, created_at
        FROM jokes
        ORDER BY RANDOM()
        LIMIT 1
    `;
      
    if (!joke) {
      throw new Error("No jokes found in the database");
    }

    return { joke };
  }
);
