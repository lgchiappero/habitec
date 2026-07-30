import fs from "fs";

const TOKEN = process.env.REPLICATE_API_TOKEN;
const imgPath = "public/configurador/cocina/cocina-alacena.jpg";
const b64 = fs.readFileSync(imgPath).toString("base64");
const dataUri = `data:image/jpeg;base64,${b64}`;

const res = await fetch("https://api.replicate.com/v1/models/flux-kontext-apps/text-removal/predictions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
    "Prefer": "wait",
  },
  body: JSON.stringify({
    input: { input_image: dataUri, output_format: "jpg" },
  }),
});

const json = await res.json();
console.log("status:", json.status);
console.log("output:", json.output);
if (json.error) console.log("error:", json.error);
fs.writeFileSync(".scratch/replicate-response.json", JSON.stringify(json, null, 2));
