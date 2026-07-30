import fs from "fs";
import path from "path";
import sharp from "sharp";

const SRC_DIR = path.join(process.cwd(), "public", "configurador");
const CLEAN_DIR = path.join(process.cwd(), "public", "configurador-clean");
const GROUPS = ["exterior", "extras", "bano", "cocina", "piso", "modelos"];

let body = "";
for (const group of GROUPS) {
  const groupDir = path.join(SRC_DIR, group);
  if (!fs.existsSync(groupDir)) continue;
  const files = fs.readdirSync(groupDir).filter((f) => f.endsWith(".jpg")).sort();

  body += `<h2>${group} <span class="count">(${files.length})</span></h2><div class="grid">`;
  for (const file of files) {
    const origPath = path.join(groupDir, file);
    const cleanPath = path.join(CLEAN_DIR, group, file);
    if (!fs.existsSync(cleanPath)) continue;

    const origBuf = await sharp(origPath).resize(280, 280, { fit: "inside" }).jpeg({ quality: 82 }).toBuffer();
    const cleanBuf = await sharp(cleanPath).resize(280, 280, { fit: "inside" }).jpeg({ quality: 82 }).toBuffer();

    body += `<figure class="pair">
      <div class="pair-imgs">
        <img src="data:image/jpeg;base64,${origBuf.toString("base64")}" alt="original">
        <img src="data:image/jpeg;base64,${cleanBuf.toString("base64")}" alt="limpia">
      </div>
      <figcaption>${group}/${file}</figcaption>
    </figure>`;
  }
  body += "</div>";
}

fs.writeFileSync(path.join(process.cwd(), ".scratch", "full-review-body.html"), body);
console.log("done, size:", fs.statSync(path.join(process.cwd(), ".scratch", "full-review-body.html")).size);
