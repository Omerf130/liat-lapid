import fs from "fs";
import path from "path";

export function publicImageExists(src: string): boolean {
  if (!src) return false;
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return true;
  }
  if (!src.startsWith("/")) return false;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
