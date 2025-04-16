import { CronJob } from "encore.dev/cron";
import { fetchAndStoreNewJoke } from "./api";

// 创建一个每24小时运行一次的 cron 作业
const _ = new CronJob("fetch-daily-joke", {
    title: "获取每日新笑话",
    every: "24h", // 每24小时运行一次
    endpoint: fetchAndStoreNewJoke,
}); 