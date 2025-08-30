// Simple Upstash-based fixed-window rate-limiters.
// Replace or extend as needed (e.g., token bucket, sliding window).

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// 1) Generic fixed window (limit `max` events per `windowMs`)
async function allowFixedWindow(key: string, max: number, windowMs: number) {
  const rl = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(max, `${windowMs} ms`),
    analytics: false,
    prefix: 'rl:fw',
  });
  const res = await rl.limit(key);
  return res.success;
}

export const fixedWindowPerIp = {
  allow: (key: string, max: number, windowMs: number) => allowFixedWindow(key, max, windowMs),
};

export const fixedWindowPerEmail = {
  allow: (key: string, max: number, windowMs: number) => allowFixedWindow(key, max, windowMs),
};

// 2) Daily cap per resource (reset every UTC day)
export const dailyCapPerEmail = {
  allow: async (key: string, maxPerDay: number) => {
    const today = new Date().toISOString().slice(0, 10); // UTC YYYY-MM-DD
    const k = `rl:day:${key}:${today}`;
    const cx = redis.multi();
    cx.incr(k);
    cx.expire(k, 24 * 60 * 60);
    const [count] = (await cx.exec()) as [number, unknown];
    return (count as number) <= maxPerDay;
  },
};
