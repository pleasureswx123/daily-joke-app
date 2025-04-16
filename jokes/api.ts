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

interface DailyJokeResponse {
  joke: Joke;
}

// 从第三方 API 获取笑话的接口
interface ExternalJoke {
  setup: string;
  punchline: string;
}

// 获取并存储新笑话的端点
export const fetchAndStoreNewJoke = api(
  {
    method: "POST",
  },
  async (): Promise<void> => {
    try {
      // 从第三方 API 获取笑话
      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch joke from external API");
      }
      
      const externalJoke = await response.json() as ExternalJoke;
      
      // 将笑话存储到数据库
      await db.exec`
        INSERT INTO jokes (setup, punchline, created_at)
        VALUES (${externalJoke.setup}, ${externalJoke.punchline}, NOW())
      `;
    } catch (error) {
      console.error("Error fetching and storing joke:", error);
      throw error;
    }
  }
);

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

// 获取当天笑话的端点
export const getDailyJoke = api(
  {
    method: "GET",
    path: "/daily-joke",
    expose: true,
  },
  async (): Promise<DailyJokeResponse> => {
    // 获取今天的日期（UTC）
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    
    // 获取明天的日期
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    
    // 查询当天创建的笑话
    const joke = await db.queryRow<Joke>`
      SELECT id, setup, punchline, created_at
      FROM jokes
      WHERE created_at >= ${today} AND created_at < ${tomorrow}
      ORDER BY created_at DESC
      LIMIT 1
    `;
    
    if (!joke) {
      throw new Error("今天还没有新笑话");
    }
    
    return { joke };
  }
);
