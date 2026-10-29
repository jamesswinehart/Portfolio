import { Redis } from "@upstash/redis";
import { placeholderPuzzle } from "@/components/games/connections/puzzle";
import { oct26ConnectionsPuzzle } from "@/components/games/connections/puzzles/oct-26-connections";
import { nov26ConnectionsPuzzle } from "@/components/games/connections/puzzles/nov-26-connections";

// Only puzzles we actually publish can be counted.
const PUZZLE_IDS = new Set([
  placeholderPuzzle.id,
  oct26ConnectionsPuzzle.id,
  nov26ConnectionsPuzzle.id,
]);
const MAX_MISTAKES = 4;

// The Vercel Marketplace store for this project was connected with an "UPSTASH_" prefix (UPSTASH_KV_REST_API_*).
// The fallbacks cover the unprefixed Marketplace names and a direct Upstash setup.
const url =
  process.env.UPSTASH_KV_REST_API_URL ?? process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token =
  process.env.UPSTASH_KV_REST_API_TOKEN ?? process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

type GameEvent =
  | { event: "started"; puzzle: string }
  | { event: "finished"; puzzle: string; outcome: "won" | "lost"; mistakes: number };

function parseEvent(body: unknown): GameEvent | null {
  if (typeof body !== "object" || body === null) return null;
  const { event, puzzle, outcome, mistakes } = body as Record<string, unknown>;
  if (typeof puzzle !== "string" || !PUZZLE_IDS.has(puzzle)) return null;

  if (event === "started") return { event, puzzle };

  if (
    event === "finished" &&
    (outcome === "won" || outcome === "lost") &&
    Number.isInteger(mistakes) &&
    (mistakes as number) >= 0 &&
    (mistakes as number) <= MAX_MISTAKES
  ) {
    return { event, puzzle, outcome, mistakes: mistakes as number };
  }

  return null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  const gameEvent = parseEvent(body);
  if (!gameEvent) return new Response(null, { status: 400 });

  // Skip local and preview plays so the counts only reflect the live site.
  if (!redis || process.env.VERCEL_ENV !== "production") {
    return new Response(null, { status: 204 });
  }

  const key = `connectegories:${gameEvent.puzzle}`;
  const today = new Date().toISOString().slice(0, 10);
  const pipeline = redis.pipeline();

  if (gameEvent.event === "started") {
    pipeline.hincrby(key, "started", 1);
    pipeline.hincrby(`${key}:started_by_day`, today, 1);
  } else {
    pipeline.hincrby(key, gameEvent.outcome, 1);
    pipeline.hincrby(key, `${gameEvent.outcome}_with_${gameEvent.mistakes}_mistakes`, 1);
  }

  await pipeline.exec();
  return new Response(null, { status: 204 });
}
