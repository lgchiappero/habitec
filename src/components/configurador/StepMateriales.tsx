"use client";

import { useState } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────
// Datos — Grupo 1: incluido en el precio base (selección única)
// ─────────────────────────────────────────────────────────

export type MaterialCategoryKey =
  | "exterior"
  | "panelesBano"
  | "puertaBano"
  | "cocina"
  | "mesada"
  | "piso"
  | "puertaPrincipal"
  | "ventanas";

export type MaterialesSeleccion = Record<MaterialCategoryKey, string | null>;

export type MaterialOption = {
  id: string;
  label: string;
  /** Foto del material. Omitir cuando la card usa un color sólido (`color`) en su lugar. */
  img?: string;
  /** Color sólido de referencia — usado cuando no hay foto individual por opción (ej. mesadas, piso). */
  color?: string;
  /** Agrega un borde sutil a la card — para colores claros que se pierden contra el fondo blanco. */
  border?: boolean;
};

export type MaterialCategory = {
  key: MaterialCategoryKey;
  title: string;
  options: MaterialOption[];
  /** Nota aclaratoria cuando la categoría solo tiene una foto de referencia disponible. */
  note?: string;
};

const DIR = "/configurador";

export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  {
    key: "exterior",
    title: "Apariencia exterior",
    options: [
      { id: "gris-oscuro", img: `${DIR}/exterior-01-gris-oscuro.png`, label: "Gris oscuro" },
      { id: "madera-naranja", img: `${DIR}/exterior-02-madera-naranja.png`, label: "Madera naranja" },
      { id: "madera-marron", img: `${DIR}/exterior-03-madera-marron.png`, label: "Madera marrón" },
      { id: "blanco", img: `${DIR}/exterior-04-blanco.png`, label: "Blanco" },
      { id: "gris-claro", img: `${DIR}/exterior-05-gris-claro.png`, label: "Gris claro" },
      { id: "blanco-negro", img: `${DIR}/exterior-06-blanco-negro.png`, label: "Blanco con negro" },
    ],
  },
  {
    key: "panelesBano",
    title: "Paneles de baño",
    options: [
      { id: "marmol-venas", img: `${DIR}/bano-panel-01-marmol-venas1.png`, label: "Mármol blanco con venas" },
      { id: "marmol-dorado", img: `${DIR}/bano-panel-02-marmol-dorado.png`, label: "Mármol dorado" },
      { id: "blanco-liso", img: `${DIR}/bano-panel-03-blanco-liso.png`, label: "Blanco liso" },
      { id: "gris-marmol", img: `${DIR}/bano-panel-04-gris-marmol.png`, label: "Gris mármol" },
    ],
  },
  {
    key: "puertaBano",
    title: "Puerta de baño",
    options: [
      { id: "negro-cuadricula", img: `${DIR}/bano-puerta-01-negro-cuadricula.png`, label: "Negro cuadriculado" },
      { id: "blanco-cuadricula", img: `${DIR}/bano-puerta-02-blanco-cuadricula.png`, label: "Blanco cuadriculado" },
      { id: "blanco-horizontal", img: `${DIR}/bano-puerta-03-blanco-horizontal.png`, label: "Blanco horizontal" },
      { id: "blanco-mixto", img: `${DIR}/bano-puerta-04-blanco-mixto.png`, label: "Blanco mixto" },
    ],
  },
  {
    key: "cocina",
    title: "Cocina",
    options: [
      { id: "lshape-gris", img: `${DIR}/cocina-01-lshape-gris.png`, label: "L-Shape gris" },
      { id: "lshape-blanco", img: `${DIR}/cocina-02-lshape-blanco.png`, label: "L-Shape blanco" },
      { id: "lshape-blanco-moderno", img: `${DIR}/cocina-03-lshape-blanco2.png`, label: "L-Shape blanco moderno" },
      { id: "lshape-blanco-clasico", img: `${DIR}/cocina-04-lshape-blanco-blanco..png`, label: "L-Shape blanco clásico" },
      { id: "lshape-madera", img: `${DIR}/cocina-04-lshape-madera.png`, label: "L-Shape madera" },
      { id: "lshape-moderno-negro", img: `${DIR}/cocina-04-lshape-moderno-negro.png`, label: "L-Shape moderno negro" },
    ],
  },
  {
    key: "mesada",
    title: "Mesada de cocina",
    options: [
      { id: "negro", color: "#1a1a1a", label: "Negro" },
      { id: "blanco-marmol", color: "#f5f5f0", label: "Blanco mármol" },
      { id: "gris", color: "#808080", label: "Gris" },
      { id: "blanco", color: "#ffffff", label: "Blanco", border: true },
      { id: "dorado", color: "#c8a96e", label: "Dorado/Ocre" },
    ],
  },
  {
    key: "piso",
    title: "Piso (incluido)",
    options: [
      { id: "nogal-oscuro", color: "#3d2b1f", label: "Nogal oscuro" },
      { id: "gris-oscuro", color: "#4a4a4a", label: "Gris oscuro" },
      { id: "pino-blanco", color: "#f0e6d3", label: "Pino blanco", border: true },
      { id: "maple", color: "#c8a46e", label: "Maple" },
      { id: "castano-gris", color: "#8a8070", label: "Castaño gris" },
    ],
  },
  {
    key: "puertaPrincipal",
    title: "Puerta principal",
    options: [
      { id: "corredera-doble", img: `${DIR}/puertacorrediza2hojas.png`, label: "Corredera doble hoja" },
      { id: "doble-hoja-abatible", img: `${DIR}/puertadeabrir2hojas.png`, label: "Doble hoja abatible" },
      { id: "vidrio-lateral", img: `${DIR}/puerta4vidrios.png`, label: "Con vidrio lateral" },
    ],
  },
  {
    key: "ventanas",
    title: "Tipo de ventanas",
    note: "Foto de referencia — ventana estándar incluida en el precio base.",
    options: [{ id: "estandar-mosquitero", img: `${DIR}/ventanadeabrirconmosquitero.png`, label: "Estándar con mosquitero" }],
  },
];

export function getDefaultMateriales(): MaterialesSeleccion {
  const result = {} as MaterialesSeleccion;
  for (const cat of MATERIAL_CATEGORIES) result[cat.key] = cat.options[0]?.id ?? null;
  return result;
}

export function getMaterialLabel(catKey: MaterialCategoryKey, id: string | null): string {
  if (!id) return "(no seleccionado)";
  const cat = MATERIAL_CATEGORIES.find((c) => c.key === catKey);
  return cat?.options.find((o) => o.id === id)?.label ?? "(no seleccionado)";
}

// ─────────────────────────────────────────────────────────
// Datos — Grupo 2: costo adicional (selección múltiple / interés)
// ─────────────────────────────────────────────────────────

export type PremiumKey = "panelesPremium" | "pisoSpc" | "banera" | "cocinaAmpliada" | "muroVidrio" | "galeria" | "puertaPremium" | "ventanaPremium";

export type PremiumSwatch = { id: string; color: string; label: string };

export type PremiumItem = {
  key: PremiumKey;
  title: string;
  description: string;
  /** Fotos de referencia. Omitir cuando se usan `swatches` en su lugar. */
  images: string[];
  /** Colores sólidos de referencia — usado cuando la foto disponible es un collage de varias muestras. */
  swatches?: PremiumSwatch[];
  checkboxLabel: string;
};

const EXTERIOR_PREMIUM_IMAGES = [
  "01-gris-lineas",
  "02-azul-oscuro",
  "03-gris-oscuro",
  "04-marron-oscuro",
  "05-madera-clara",
  "06-ladrillo",
  "07-madera-naranja",
  "08-gris-medio",
  "09-madera-clara2",
  "10-marron-veta",
  "11-madera-vertical",
  "12-blanco-liso",
  "13-amarillo",
  "14-celeste",
  "15-rosa",
  "16-verde",
  "17-naranja",
].map((suffix) => `${DIR}/exterior-premium-${suffix}.png`);

export const PREMIUM_ITEMS: PremiumItem[] = [
  {
    key: "panelesPremium",
    title: "Paneles metálicos con diseño",
    description: "Reemplaza los paneles lisos por paneles con diseño en relieve o color personalizado.",
    images: EXTERIOR_PREMIUM_IMAGES,
    checkboxLabel: "Me interesa cotizar paneles premium",
  },
  {
    key: "pisoSpc",
    title: "Piso SPC premium",
    description: "Más resistente y durable que el PVC estándar.",
    images: [],
    swatches: [
      { id: "8917", color: "#8b5e3c", label: "8917" },
      { id: "8916", color: "#c79a65", label: "8916" },
      { id: "8915", color: "#c9a876", label: "8915" },
      { id: "8913", color: "#6e6259", label: "8913" },
      { id: "8912", color: "#d8b98b", label: "8912" },
      { id: "8911", color: "#e8dfc8", label: "8911" },
      { id: "8918", color: "#5c3a26", label: "8918" },
      { id: "8920", color: "#6b2e22", label: "8920" },
      { id: "8921", color: "#8c8c8c", label: "8921" },
      { id: "8923", color: "#d9c4a0", label: "8923" },
      { id: "8927", color: "#7c7873", label: "8927" },
    ],
    checkboxLabel: "Me interesa cotizar piso SPC",
  },
  {
    key: "banera",
    title: "Bañera en lugar de ducha",
    description: "Reemplazá la ducha estándar del baño por una bañera.",
    images: [`${DIR}/bano-banera-01.png`, `${DIR}/bano-banera-02.png`, `${DIR}/bano-banera-03.png`],
    checkboxLabel: "Me interesa cotizar bañera",
  },
  {
    key: "cocinaAmpliada",
    title: "Cocina ampliada",
    description: "Alacena superior o disposición en U para más espacio de almacenamiento.",
    images: [
      `${DIR}/cocina-premium-alacena-01.png`,
      `${DIR}/cocina-premium-alacena-02.png`,
      `${DIR}/cocina-premium-alacena-03.png`,
      `${DIR}/cocina-premium-ushape-01.png`,
      `${DIR}/cocina-premium-ushape-02.png`,
    ],
    checkboxLabel: "Me interesa cotizar cocina ampliada",
  },
  {
    key: "muroVidrio",
    title: "Muro cortina de vidrio",
    description: "Pared de vidrio para maximizar la luz natural.",
    images: [`${DIR}/balcon%20solo.png`],
    checkboxLabel: "Me interesa cotizar muro de vidrio",
  },
  {
    key: "galeria",
    title: "Galería exterior con sobretecho",
    description: "Estructura cubierta que amplía el espacio habitable exterior.",
    images: [`${DIR}/balcon%20con%20techocompleto.png`],
    checkboxLabel: "Me interesa cotizar galería con sobretecho",
  },
  {
    key: "puertaPremium",
    title: "Puerta doble hoja premium",
    description: "Puerta doble hoja con paneles metálicos y detalles en acero — más robusta que la puerta estándar.",
    images: [`${DIR}/puertadoblehojaconcargo.png`],
    checkboxLabel: "Me interesa cotizar puerta premium",
  },
  {
    key: "ventanaPremium",
    title: "Ventana abatible",
    description: "Ventana con hoja abatible en lugar de la corrediza estándar.",
    images: [`${DIR}/ventanaconabatienteconcargo.png`],
    checkboxLabel: "Me interesa cotizar ventana abatible",
  },
];

// ─────────────────────────────────────────────────────────
// UI
// ─────────────────────────────────────────────────────────

const GOLD = "#D4B06A";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function MaterialImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="w-full h-full bg-stone-200 flex items-center justify-center p-2 text-center">
        <span className="text-[10px] font-semibold text-stone-500 leading-snug">{alt}</span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover object-center"
      onError={() => setError(true)}
    />
  );
}

// Regla única para toda la sección de materiales: mismo grid, mismo aspect-ratio,
// mismo radio de borde y mismo gap en todas las categorías — sin excepción.
const TILE_GRID = "grid grid-cols-2 sm:grid-cols-3 gap-3";
const TILE_RADIUS = "rounded-xl";
const TILE_SIZES = "(min-width: 640px) 33vw, 50vw";

function MaterialCard({ option, selected, onSelect }: { option: MaterialOption; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full text-left ${TILE_RADIUS} border-2 overflow-hidden transition-all duration-200 bg-white cursor-pointer ${
        selected ? "shadow-md" : "border-stone-200 hover:border-stone-300"
      }`}
      style={selected ? { borderColor: GOLD } : undefined}
    >
      <div className="relative w-full aspect-[4/3] bg-stone-100">
        {option.color ? (
          <div className={`w-full h-full ${option.border ? "border border-stone-300" : ""}`} style={{ backgroundColor: option.color }} />
        ) : (
          <MaterialImage src={option.img!} alt={option.label} sizes={TILE_SIZES} />
        )}
        {selected && (
          <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center shadow" style={{ backgroundColor: GOLD }}>
            <CheckIcon className="w-3 h-3 text-white" />
          </span>
        )}
      </div>
      <p className={`px-2 py-2 text-xs font-semibold leading-snug truncate ${selected ? "text-stone-900" : "text-stone-600"}`}>{option.label}</p>
    </button>
  );
}

function CategoryBlock({ category, selectedId, onSelect }: { category: MaterialCategory; selectedId: string | null; onSelect: (id: string) => void }) {
  return (
    <div>
      <p className="text-sm font-bold text-stone-800 mb-0.5">{category.title}</p>
      {category.note && <p className="text-xs text-stone-400 mb-2.5">{category.note}</p>}
      <div className={`${TILE_GRID} ${category.note ? "" : "mt-2.5"}`}>
        {category.options.map((opt) => (
          <MaterialCard key={opt.id} option={opt} selected={selectedId === opt.id} onSelect={() => onSelect(opt.id)} />
        ))}
      </div>
    </div>
  );
}

function PremiumThumbGrid({ images, swatches, alt }: { images: string[]; swatches?: PremiumSwatch[]; alt: string }) {
  if (swatches && swatches.length > 0) {
    return (
      <div className={TILE_GRID}>
        {swatches.map((sw) => (
          <div key={sw.id}>
            <div className={`w-full aspect-[4/3] ${TILE_RADIUS} border border-stone-200`} style={{ backgroundColor: sw.color }} />
            <p className="px-1 pt-1 text-[10px] font-semibold text-stone-500 truncate">{sw.label}</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={TILE_GRID}>
      {images.map((img, i) => (
        <div key={img} className={`relative w-full aspect-[4/3] ${TILE_RADIUS} overflow-hidden bg-stone-100 border border-stone-200`}>
          <MaterialImage src={img} alt={`${alt} — foto ${i + 1}`} sizes={TILE_SIZES} />
        </div>
      ))}
    </div>
  );
}

function PremiumCard({ item, checked, onToggle }: { item: PremiumItem; checked: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-2xl border-2 p-4 transition-all duration-200 bg-white ${checked ? "shadow-sm" : "border-stone-200 hover:border-stone-300"}`}
      style={checked ? { borderColor: GOLD, backgroundColor: "#FBF7EF" } : undefined}
    >
      <p className="text-sm font-bold text-stone-800">{item.title}</p>
      <p className="text-xs text-stone-500 mt-1 mb-3 leading-relaxed">{item.description}</p>
      <PremiumThumbGrid images={item.images} swatches={item.swatches} alt={item.title} />
      <label className="mt-3 flex items-center gap-2.5 cursor-pointer select-none">
        <span
          className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${checked ? "border-transparent" : "border-stone-300 bg-white"}`}
          style={checked ? { backgroundColor: GOLD } : undefined}
        >
          {checked && <CheckIcon className="w-3 h-3 text-white" />}
        </span>
        <input type="checkbox" checked={checked} onChange={onToggle} className="sr-only" />
        <span className="text-xs font-bold text-stone-700">{item.checkboxLabel}</span>
      </label>
    </div>
  );
}

function GroupBadge({ variant }: { variant: "base" | "premium" }) {
  if (variant === "base") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-bold uppercase tracking-wide">
        Incluido en el precio base
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide"
      style={{ backgroundColor: "#F6EEDD", color: "#8A6A2A", border: "1px solid #E4CFA0" }}
    >
      Costo adicional — cotizar en presupuesto
    </span>
  );
}

export function MaterialesSection({
  seleccion,
  onSelect,
  premiumInteres,
  onTogglePremium,
}: {
  seleccion: MaterialesSeleccion;
  onSelect: (cat: MaterialCategoryKey, id: string) => void;
  premiumInteres: Set<PremiumKey>;
  onTogglePremium: (key: PremiumKey) => void;
}) {
  return (
    <div className="space-y-8 pt-2">
      <div>
        <h3 className="text-xl font-bold text-stone-900">Elegí los materiales de tu MOVARA</h3>
        <p className="text-stone-500 text-sm mt-1">
          Fotos de referencia — el color y la textura final pueden variar levemente según el lote de fabricación.
        </p>
      </div>

      {/* Grupo 1 — incluido en el precio base */}
      <div className="space-y-6">
        <GroupBadge variant="base" />
        <div className="space-y-6">
          {MATERIAL_CATEGORIES.map((cat) => (
            <div key={cat.key} className="pb-6 border-b border-stone-200 last:border-b-0 last:pb-0">
              <CategoryBlock category={cat} selectedId={seleccion[cat.key]} onSelect={(id) => onSelect(cat.key, id)} />
            </div>
          ))}
        </div>
      </div>

      {/* Grupo 2 — costo adicional */}
      <div className="space-y-4">
        <div className="space-y-2">
          <GroupBadge variant="premium" />
          <p className="text-xs text-stone-500">Seleccioná las que te interesan y las incluimos en tu presupuesto.</p>
        </div>
        <div className="space-y-3">
          {PREMIUM_ITEMS.map((item) => (
            <PremiumCard key={item.key} item={item} checked={premiumInteres.has(item.key)} onToggle={() => onTogglePremium(item.key)} />
          ))}
        </div>
      </div>
    </div>
  );
}
