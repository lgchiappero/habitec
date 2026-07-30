import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

const SOURCE_DIR = path.join(process.cwd(), "docs", "heshi-catalogue-150dpi");
const OUTPUT_DIR = path.join(process.cwd(), "public", "configurador");

type CropEntry = {
  page: number;
  crop: { top: number; left: number; width: number; height: number };
  output: string;
};

export const PAGE_MAP: CropEntry[] = [
  { page: 8, crop: { top: 50, left: 0, width: 600, height: 400 }, output: "exterior/ext-liso-blanco-marco-negro.jpg" },
  { page: 8, crop: { top: 400, left: 0, width: 600, height: 400 }, output: "exterior/ext-liso-gris-marco-negro.jpg" },
  { page: 8, crop: { top: 50, left: 600, width: 600, height: 400 }, output: "exterior/ext-liso-beige-marco-blanco.jpg" },
  { page: 8, crop: { top: 400, left: 600, width: 600, height: 400 }, output: "exterior/ext-liso-gris-oscuro-marco-negro.jpg" },
  { page: 9, crop: { top: 50, left: 0, width: 430, height: 400 }, output: "exterior/ext-calada-gris-claro.jpg" },
  { page: 9, crop: { top: 50, left: 430, width: 430, height: 400 }, output: "exterior/ext-calada-gris-oscuro.jpg" },
  { page: 9, crop: { top: 50, left: 860, width: 430, height: 400 }, output: "exterior/ext-calada-madera-clara.jpg" },
  { page: 10, crop: { top: 50, left: 0, width: 430, height: 400 }, output: "exterior/ext-calada-marron.jpg" },
  { page: 10, crop: { top: 50, left: 430, width: 430, height: 400 }, output: "exterior/ext-calada-madera-oscura.jpg" },
  { page: 10, crop: { top: 50, left: 860, width: 430, height: 400 }, output: "exterior/ext-calada-ladrillo.jpg" },
  { page: 14, crop: { top: 50, left: 0, width: 430, height: 400 }, output: "exterior/ext-vidrio-completo-negro.jpg" },
  { page: 14, crop: { top: 50, left: 430, width: 430, height: 400 }, output: "exterior/ext-vidrio-lateral.jpg" },
  { page: 14, crop: { top: 400, left: 0, width: 900, height: 400 }, output: "exterior/ext-vidrio-frontal.jpg" },
  { page: 15, crop: { top: 50, left: 0, width: 680, height: 500 }, output: "extras/extra-porche-elevado.jpg" },
  { page: 15, crop: { top: 50, left: 680, width: 680, height: 500 }, output: "extras/extra-galeria-barandas-blancas.jpg" },
  { page: 15, crop: { top: 500, left: 0, width: 680, height: 500 }, output: "extras/extra-techo-dos-aguas.jpg" },
  { page: 15, crop: { top: 500, left: 680, width: 680, height: 500 }, output: "extras/extra-porche-barandas-blancas.jpg" },
  { page: 11, crop: { top: 100, left: 0, width: 430, height: 500 }, output: "bano/bano-20ft-vista-1.jpg" },
  { page: 11, crop: { top: 100, left: 430, width: 430, height: 500 }, output: "bano/bano-20ft-vista-2.jpg" },
  { page: 11, crop: { top: 100, left: 860, width: 430, height: 500 }, output: "bano/bano-20ft-vista-3.jpg" },
  { page: 12, crop: { top: 100, left: 0, width: 320, height: 500 }, output: "bano/bano-40ft-vista-1.jpg" },
  { page: 12, crop: { top: 100, left: 320, width: 320, height: 500 }, output: "bano/bano-40ft-vista-2.jpg" },
  { page: 12, crop: { top: 100, left: 640, width: 320, height: 500 }, output: "bano/bano-40ft-vista-3.jpg" },
  { page: 12, crop: { top: 100, left: 960, width: 320, height: 500 }, output: "bano/bano-40ft-vista-4.jpg" },
  { page: 13, crop: { top: 100, left: 0, width: 320, height: 400 }, output: "bano/bano-pared-marmol-blanco-dorado.jpg" },
  { page: 13, crop: { top: 100, left: 320, width: 320, height: 400 }, output: "bano/bano-pared-marmol-gris.jpg" },
  { page: 13, crop: { top: 100, left: 640, width: 320, height: 400 }, output: "bano/bano-pared-blanco-liso.jpg" },
  { page: 13, crop: { top: 100, left: 960, width: 320, height: 400 }, output: "bano/bano-pared-marmol-beige.jpg" },
  { page: 13, crop: { top: 500, left: 0, width: 430, height: 500 }, output: "bano/bano-banera-vista-1.jpg" },
  { page: 13, crop: { top: 500, left: 430, width: 430, height: 500 }, output: "bano/bano-banera-vista-2.jpg" },
  { page: 13, crop: { top: 500, left: 860, width: 430, height: 500 }, output: "bano/bano-banera-vista-3.jpg" },
  { page: 16, crop: { top: 100, left: 0, width: 320, height: 350 }, output: "cocina/cocina-l-shape-blanca.jpg" },
  { page: 16, crop: { top: 100, left: 320, width: 320, height: 350 }, output: "cocina/cocina-l-shape-gris.jpg" },
  { page: 16, crop: { top: 100, left: 640, width: 320, height: 350 }, output: "cocina/cocina-l-shape-oscura.jpg" },
  { page: 16, crop: { top: 100, left: 960, width: 320, height: 350 }, output: "cocina/cocina-pileta.jpg" },
  { page: 16, crop: { top: 500, left: 640, width: 430, height: 400 }, output: "cocina/cocina-alacena.jpg" },
  { page: 16, crop: { top: 500, left: 1070, width: 430, height: 400 }, output: "cocina/cocina-u-shape.jpg" },
  { page: 17, crop: { top: 150, left: 30, width: 170, height: 200 }, output: "piso/piso-pvc-marron.jpg" },
  { page: 17, crop: { top: 150, left: 200, width: 170, height: 200 }, output: "piso/piso-pvc-gris-oscuro.jpg" },
  { page: 17, crop: { top: 150, left: 370, width: 170, height: 200 }, output: "piso/piso-pvc-blanco.jpg" },
  { page: 17, crop: { top: 330, left: 30, width: 170, height: 200 }, output: "piso/piso-pvc-maple.jpg" },
  { page: 17, crop: { top: 330, left: 200, width: 170, height: 200 }, output: "piso/piso-pvc-nogal.jpg" },
  { page: 18, crop: { top: 100, left: 0, width: 480, height: 400 }, output: "piso/piso-spc-9012.jpg" },
  { page: 18, crop: { top: 100, left: 480, width: 480, height: 400 }, output: "piso/piso-spc-7007.jpg" },
  { page: 18, crop: { top: 500, left: 0, width: 480, height: 400 }, output: "piso/piso-spc-9011.jpg" },
  { page: 18, crop: { top: 500, left: 480, width: 480, height: 400 }, output: "piso/piso-spc-9005.jpg" },
  { page: 5, crop: { top: 0, left: 0, width: 1400, height: 800 }, output: "modelos/modelo-20ft-planta.jpg" },
  { page: 7, crop: { top: 0, left: 0, width: 1400, height: 800 }, output: "modelos/modelo-40ft-planta.jpg" },
];

async function run() {
  const results: { entry: CropEntry; ok: boolean; error?: string }[] = [];

  for (const entry of PAGE_MAP) {
    const pageNum = String(entry.page).padStart(2, "0");
    const sourcePath = path.join(SOURCE_DIR, `page-${pageNum}.png`);
    const outputPath = path.join(OUTPUT_DIR, entry.output);

    try {
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await sharp(sourcePath)
        .extract({
          left: entry.crop.left,
          top: entry.crop.top,
          width: entry.crop.width,
          height: entry.crop.height,
        })
        .jpeg({ quality: 90 })
        .toFile(outputPath);
      results.push({ entry, ok: true });
      console.log(`✓ ${entry.output}`);
    } catch (err) {
      results.push({ entry, ok: false, error: (err as Error).message });
      console.error(`✗ ${entry.output}: ${(err as Error).message}`);
    }
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} recortadas correctamente.`);
  if (failed.length > 0) {
    console.log("Fallidas:", failed.map((f) => f.entry.output).join(", "));
  }
}

run();
