import { readdirSync } from "fs";
import { join } from "path";

export function readDirSyncAtLocal(path: string): string[] {
  const pathBasedOnCwd = join(process.cwd(), path);

  return readdirSync(pathBasedOnCwd);
}
