import cron from "node-cron";
import { env } from "./config/env.ts";
import { digest } from "./digest.ts";
import { ingest } from "./ingest.ts";
import { topic } from "./config/topic.ts";
import { USAGE, parseArgs } from "./args.ts";

const parsed = parseArgs(process.argv.slice(2));
if ("help" in parsed) {
  console.log(USAGE);
  process.exit(0);
}
if ("error" in parsed) {
  console.error(`${parsed.error}\n\n${USAGE}`);
  process.exit(2);
}
const { mode, dryRun } = parsed;

if (mode === "ingest") {
  await ingest();
} else if (mode === "digest") {
  await digest({ dryRun });
} else if (mode === "loop") {
  console.log(`[${topic.name}] agente ativo`);
  console.log(`  ingestão: ${env.cronIngestion}`);
  console.log(`  digest:   ${env.cronDigest}`);
  await ingest();
  cron.schedule(env.cronIngestion, () => ingest().catch(console.error));
  cron.schedule(env.cronDigest, () => digest().catch(console.error));
} else {
  // padrão (--once): roda um ciclo e sai
  await ingest();
  await digest({ dryRun });
  process.exit(0);
}
