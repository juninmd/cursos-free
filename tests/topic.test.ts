import { expect, test } from "bun:test";
import { topic } from "../src/topic.ts";

test("define topic with configured cursos feeds", () => {
  expect(topic.name).toBe("cursos-free");
  expect(topic.title).toBe("Cursos Free");
  expect(topic.emoji).toBe("🎓");
  expect(topic.feeds.length).toBeGreaterThan(0);
  expect(topic.systemPrompt).toContain("mentor de carreira");
});
