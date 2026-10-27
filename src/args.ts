export type Mode = "once" | "ingest" | "digest" | "loop";
export type Parsed =
  | { mode: Mode; dryRun: boolean }
  | { help: true }
  | { error: string };

const MODES: Record<string, Mode> = {
  "--ingest": "ingest",
  "--digest": "digest",
  "--loop": "loop",
  "--once": "once",
};

export const USAGE = `Uso: bun run src/index.ts [--once | --ingest | --digest [--dry-run] | --loop]

  --once      ingere e envia um digest, depois sai (padrão)
  --ingest    só coleta os feeds
  --digest    só gera e envia o digest
  --loop      agente contínuo (cron)
  --dry-run   com --digest/--once: imprime o digest sem enviar nem marcar itens
  -h, --help  mostra este texto`;

/** Pure CLI parser: unknown flags and conflicting modes are errors. */
export function parseArgs(argv: string[]): Parsed {
  let mode: Mode | undefined;
  let dryRun = false;
  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") return { help: true };
    if (arg === "--dry-run") dryRun = true;
    else if (arg in MODES) {
      if (mode) return { error: `Modos conflitantes: ${arg}` };
      mode = MODES[arg];
    } else return { error: `Argumento desconhecido: ${arg}` };
  }
  const final = mode ?? "once";
  if (dryRun && (final === "ingest" || final === "loop")) {
    return { error: "--dry-run só vale com --digest ou --once" };
  }
  return { mode: final, dryRun };
}
