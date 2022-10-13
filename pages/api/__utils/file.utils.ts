import { readdirSync, readFileSync } from "fs";
import { join } from "path";

export function readDirSyncAtLocal(path: string): string[] {
  const pathBasedOnCwd = join(process.cwd(), path);

  return readdirSync(pathBasedOnCwd);
}

export function readFileSyncAtLocal(path: string): string {
  const pathBasedOnCwd = join(process.cwd(), path);

  return readFileSync(pathBasedOnCwd).toString();
}
