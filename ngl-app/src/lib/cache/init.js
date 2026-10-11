import { RedisCachProvider } from "../../pkg/cache/redis.js";
import { env } from "../config/env.js";
export const cacheProvider = new RedisCachProvider({
     host:env.redis.host,
     port:env.redis.port,
     password:env.redis.password || '',
})