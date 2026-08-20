"use client";

import { useState } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────
// Datos
// ─────────────────────────────────────────────────────────
//
// Cada categoría agrupa uno o más "selectores". Un selector es una franja de
// cards de selección única para un mismo slot (`key`). Dos selectores pueden
// compartir el mismo `key` (ej. exterior base + exterior premium): al
// compartir estado, elegir una opción premium desactiva automáticamente la
// base elegida antes, y viceversa — son alternativas del mismo componente
// físico. Cuando `priceName` está definido, esa franja tiene costo adicional
// (se resuelve contra `siteConfig.preciosExtras` en Sanity, con fallback a
// `precioAdicionalDefault`). `nullable` permite deseleccionar (para extras
// opcionales que no reemplazan nada, como bañera o galería).

export type MaterialOption = {
  id: string;
  label: string;
  img?: string;
  color?: string;
  /** Borde sutil — para colores claros que se pierden contra el fondo blanco. */
  border?: boolean;
};

export type MaterialSelector = {
  /** Slot de estado — dos selectores con el mismo key comparten selección. */
  key: string;
  label: string;
  options: MaterialOption[];
  /** Permite deseleccionar (click de nuevo = ninguno). Default: false. */
  nullable?: boolean;
  /** Si está seteado, esta franja tiene costo adicional. Nombre usado tanto
   *  para mostrarlo (badge, desglose, WhatsApp) como para buscar el precio
   *  cargado en Sanity (`preciosExtras[].nombre`). */
  priceName?: string;
};

export type MaterialCategoryGroup = {
  key: string;
  title: string;
  selectors: MaterialSelector[];
};

export type MaterialesSeleccion = Record<string, string | null>;

const DIR = "/configurador";

const EXTERIOR_PREMIUM = [
  ["01-gris-lineas", "Gris con líneas"],
  ["02-azul-oscuro", "Azul oscuro"],
  ["03-gris-oscuro", "Gris oscuro"],
  ["04-marron-oscuro", "Marrón oscuro"],
  ["05-madera-clara", "Madera clara"],
  ["06-ladrillo", "Ladrillo"],
  ["07-madera-naranja", "Madera naranja"],
  ["08-gris-medio", "Gris medio"],
  ["09-madera-clara2", "Madera clara 2"],
  ["10-marron-veta", "Marrón veteado"],
  ["11-madera-vertical", "Madera vertical"],
  ["12-blanco-liso", "Blanco liso"],
  ["13-amarillo", "Amarillo"],
  ["14-celeste", "Celeste"],
  ["15-rosa", "Rosa"],
  ["16-verde", "Verde"],
  ["17-naranja", "Naranja"],
] as const;

export const MATERIAL_CATEGORY_GROUPS: MaterialCategoryGroup[] = [
  {
    key: "exterior-group",
    title: "Apariencia exterior",
    selectors: [
      {
        key: "exterior",
        label: "Opciones base — sin costo",
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
        key: "exterior",
        label: "Opciones con diseño — costo adicional",
        priceName: "Paneles premium",
        options: EXTERIOR_PREMIUM.map(([suffix, label]) => ({
          id: `premium-${suffix}`,
          img: `${DIR}/exterior-premium-${suffix}.png`,
          label,
        })),
      },
    ],
  },
  {
    key: "piso-group",
    title: "Piso",
    selectors: [
      {
        key: "piso",
        label: "PVC estándar — sin costo",
        options: [
          { id: "nogal-oscuro", color: "#3d2b1f", label: "Nogal oscuro" },
          { id: "gris-oscuro", color: "#4a4a4a", label: "Gris oscuro" },
          { id: "pino-blanco", color: "#f0e6d3", label: "Pino blanco", border: true },
          { id: "maple", color: "#c8a46e", label: "Maple" },
          { id: "castano-gris", color: "#8a8070", label: "Castaño gris" },
        ],
      },
      {
        key: "piso",
        label: "SPC premium — costo adicional",
        priceName: "Piso SPC",
        options: [
          { id: "spc-8917", color: "#8b5e3c", label: "8917" },
          { id: "spc-8916", color: "#c79a65", label: "8916" },
          { id: "spc-8915", color: "#c9a876", label: "8915" },
          { id: "spc-8913", color: "#6e6259", label: "8913" },
          { id: "spc-8912", color: "#d8b98b", label: "8912" },
          { id: "spc-8911", color: "#e8dfc8", label: "8911" },
          { id: "spc-8918", color: "#5c3a26", label: "8918" },
          { id: "spc-8920", color: "#6b2e22", label: "8920" },
          { id: "spc-8921", color: "#8c8c8c", label: "8921" },
          { id: "spc-8923", color: "#d9c4a0", label: "8923" },
          { id: "spc-8927", color: "#7c7873", label: "8927" },
        ],
      },
    ],
  },
  {
    key: "bano-group",
    title: "Baño",
    selectors: [
      {
        key: "panelesBano",
        label: "Paneles de pared — sin costo",
        options: [
          { id: "marmol-venas", img: `${DIR}/bano-panel-01-marmol-venas1.png`, label: "Mármol blanco con venas" },
          { id: "marmol-dorado", img: `${DIR}/bano-panel-02-marmol-dorado.png`, label: "Mármol dorado" },
          { id: "blanco-liso", img: `${DIR}/bano-panel-03-blanco-liso.png`, label: "Blanco liso" },
          { id: "gris-marmol", img: `${DIR}/bano-panel-04-gris-marmol.png`, label: "Gris mármol" },
        ],
      },
      {
        key: "puertaBano",
        label: "Puerta de baño — sin costo",
        options: [
          { id: "negro-cuadricula", img: `${DIR}/bano-puerta-01-negro-cuadricula.png`, label: "Negro cuadriculado" },
          { id: "blanco-cuadricula", img: `${DIR}/bano-puerta-02-blanco-cuadricula.png`, label: "Blanco cuadriculado" },
          { id: "blanco-horizontal", img: `${DIR}/bano-puerta-03-blanco-horizontal.png`, label: "Blanco horizontal" },
          { id: "blanco-mixto", img: `${DIR}/bano-puerta-04-blanco-mixto.png`, label: "Blanco mixto" },
        ],
      },
      {
        key: "banera",
        label: "Bañera en lugar de ducha — costo adicional",
        nullable: true,
        priceName: "Bañera",
        options: [
          { id: "banera-01", img: `${DIR}/bano-banera-01.png`, label: "Bañera — opción 1" },
          { id: "banera-02", img: `${DIR}/bano-banera-02.png`, label: "Bañera — opción 2" },
          { id: "banera-03", img: `${DIR}/bano-banera-03.png`, label: "Bañera — opción 3" },
        ],
      },
    ],
  },
  {
    key: "cocina-group",
    title: "Cocina",
    selectors: [
      {
        key: "cocina",
        label: "Cocina L-Shape — sin costo",
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
        label: "Mesada — sin costo",
        options: [
          { id: "negro", color: "#1a1a1a", label: "Negro" },
          { id: "blanco-marmol", color: "#f5f5f0", label: "Blanco mármol" },
          { id: "gris", color: "#808080", label: "Gris" },
          { id: "blanco", color: "#ffffff", label: "Blanco", border: true },
          { id: "dorado", color: "#c8a96e", label: "Dorado/Ocre" },
        ],
      },
      {
        key: "cocinaAmpliada",
        label: "Cocina ampliada — costo adicional",
        nullable: true,
        priceName: "Cocina ampliada",
        options: [
          { id: "alacena-01", img: `${DIR}/cocina-premium-alacena-01.png`, label: "Con alacena — opción 1" },
          { id: "alacena-02", img: `${DIR}/cocina-premium-alacena-02.png`, label: "Con alacena — opción 2" },
          { id: "alacena-03", img: `${DIR}/cocina-premium-alacena-03.png`, label: "Con alacena — opción 3" },
          { id: "ushape-01", img: `${DIR}/cocina-premium-ushape-01.png`, label: "En U — opción 1" },
          { id: "ushape-02", img: `${DIR}/cocina-premium-ushape-02.png`, label: "En U — opción 2" },
        ],
      },
    ],
  },
  {
    key: "puertas-group",
    title: "Puertas y ventanas",
    selectors: [
      {
        key: "puertaPrincipal",
        label: "Puerta principal — sin costo",
        options: [
          { id: "corredera-doble", img: `${DIR}/puertacorrediza2hojas.png`, label: "Corredera doble hoja" },
          { id: "doble-hoja-abatible", img: `${DIR}/puertadeabrir2hojas.png`, label: "Doble hoja abatible" },
          { id: "vidrio-lateral", img: `${DIR}/puerta4vidrios.png`, label: "Con vidrio lateral" },
          { id: "doble-hoja-moderna", img: `${DIR}/puertadoblehojaconcargo.png`, label: "Doble hoja moderna" },
        ],
      },
      {
        key: "ventanas",
        label: "Ventanas — sin costo",
        options: [
          { id: "estandar-mosquitero", img: `${DIR}/ventanadeabrirconmosquitero.png`, label: "Estándar con mosquitero" },
          { id: "abatible-fija", img: `${DIR}/ventanaconabatienteconcargo.png`, label: "Abatible con paño fijo" },
        ],
      },
    ],
  },
  {
    key: "extras-group",
    title: "Extras exteriores",
    selectors: [
      {
        key: "muroVidrio",
        label: "Muro cortina de vidrio — costo adicional",
        nullable: true,
        priceName: "Muro cortina",
        options: [{ id: "vidrio-01", img: `${DIR}/balcon%20solo.png`, label: "Muro cortina de vidrio" }],
      },
      {
        key: "galeria",
        label: "Galería con sobretecho — costo adicional",
        nullable: true,
        priceName: "Galería con sobretecho",
        options: [{ id: "galeria-01", img: `${DIR}/balcon%20con%20techocompleto.png`, label: "Galería con sobretecho" }],
      },
    ],
  },
];

export function getDefaultMateriales(): MaterialesSeleccion {
  const result: MaterialesSeleccion = {};
  for (const cat of MATERIAL_CATEGORY_GROUPS) {
    for (const sel of cat.selectors) {
      if (!(sel.key in result)) {
        result[sel.key] = sel.nullable ? null : sel.options[0]?.id ?? null;
      }
    }
  }
  return result;
}

export function findMaterialOption(key: string, id: string | null): { option: MaterialOption; selector: MaterialSelector } | null {
  if (!id) return null;
  for (const cat of MATERIAL_CATEGORY_GROUPS) {
    for (const sel of cat.selectors) {
      if (sel.key !== key) continue;
      const option = sel.options.find((o) => o.id === id);
      if (option) return { option, selector: sel };
    }
  }
  return null;
}

export function getMaterialLabel(key: string, id: string | null): string {
  return findMaterialOption(key, id)?.option.label ?? "(no seleccionado)";
}

// ─────────────────────────────────────────────────────────
// UI
// ─────────────────────────────────────────────────────────

const GREEN = "#2d9e75";
const ORANGE = "#d45a1a";
const TILE_GRID = "grid grid-cols-2 sm:grid-cols-3 gap-3";
const TILE_RADIUS = "rounded-xl";
const TILE_SIZES = "(min-width: 640px) 33vw, 50vw";

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

function StatusBadge({ isPremium }: { isPremium: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 mb-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white whitespace-nowrap"
      style={{ backgroundColor: isPremium ? ORANGE : GREEN }}
    >
      <CheckIcon className="w-2.5 h-2.5" />
      {isPremium ? "Agregado" : "Elegido"}
    </span>
  );
}

/** Badge de precio sobre la imagen — solo en cards premium. Siempre muestra el
 * precio, esté o no seleccionada; el estado "Agregado" vive en el área de texto. */
function ImagePriceBadge({ amount }: { amount: number }) {
  return (
    <span
      className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold shadow whitespace-nowrap"
      style={{ backgroundColor: "#faeeda", color: "#854F0B" }}
    >
      {`+ USD ${amount}`}
    </span>
  );
}

function MaterialCard({
  option,
  selected,
  onSelect,
  priceAmount,
}: {
  option: MaterialOption;
  selected: boolean;
  onSelect: () => void;
  /** Si está definida, esta card tiene costo adicional. */
  priceAmount?: number;
}) {
  const isPremium = priceAmount !== undefined;
  const accent = isPremium ? ORANGE : GREEN;
  const textBg = isPremium ? "#faeeda" : "#e6f7f1";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full text-left ${TILE_RADIUS} overflow-hidden transition-all duration-200 cursor-pointer ${
        selected ? "border-[3px] shadow-md" : "border border-stone-200 hover:border-stone-300"
      }`}
      style={selected ? { borderColor: accent } : undefined}
    >
      {/* Imagen — nunca lleva overlay ni tinte, se ve siempre limpia. */}
      <div className="relative w-full aspect-[4/3] bg-stone-100">
        {option.color ? (
          <div className={`w-full h-full ${option.border ? "border border-stone-300" : ""}`} style={{ backgroundColor: option.color }} />
        ) : (
          <MaterialImage src={option.img!} alt={option.label} sizes={TILE_SIZES} />
        )}
        {isPremium && <ImagePriceBadge amount={priceAmount!} />}
      </div>
      {/* Estado de selección: solo acá — nunca sobre la imagen. */}
      <div className="px-2 py-2 transition-colors duration-200" style={{ backgroundColor: selected ? textBg : "#ffffff" }}>
        {selected && <StatusBadge isPremium={isPremium} />}
        <p className={`text-xs font-semibold leading-snug truncate ${selected ? "text-stone-900" : "text-stone-600"}`}>{option.label}</p>
      </div>
    </button>
  );
}

function SelectorBlock({
  selector,
  selectedId,
  onSelect,
  priceFor,
}: {
  selector: MaterialSelector;
  selectedId: string | null;
  onSelect: (id: string) => void;
  priceFor: (priceName: string) => number;
}) {
  const amount = selector.priceName ? priceFor(selector.priceName) : undefined;
  return (
    <div>
      <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">{selector.label}</p>
      <div className={TILE_GRID}>
        {selector.options.map((opt) => (
          <MaterialCard key={opt.id} option={opt} selected={selectedId === opt.id} onSelect={() => onSelect(opt.id)} priceAmount={amount} />
        ))}
      </div>
    </div>
  );
}

function CategoryGroupBlock({
  category,
  seleccion,
  onSelect,
  priceFor,
}: {
  category: MaterialCategoryGroup;
  seleccion: MaterialesSeleccion;
  onSelect: (key: string, id: string, nullable?: boolean) => void;
  priceFor: (priceName: string) => number;
}) {
  return (
    <div>
      <h4 className="text-base font-bold text-stone-900 mb-4">{category.title}</h4>
      <div className="space-y-5">
        {category.selectors.map((sel, i) => {
          const prevPriced = i > 0 && !!category.selectors[i - 1].priceName;
          const divider = !!sel.priceName && !prevPriced;
          return (
            <div key={`${sel.key}-${i}`}>
              {divider && <div className="mb-5 border-t border-dashed border-stone-300" />}
              <SelectorBlock
                selector={sel}
                selectedId={seleccion[sel.key] ?? null}
                onSelect={(id) => onSelect(sel.key, id, sel.nullable)}
                priceFor={priceFor}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MaterialesSection({
  seleccion,
  onSelect,
  priceFor,
}: {
  seleccion: MaterialesSeleccion;
  onSelect: (key: string, id: string, nullable?: boolean) => void;
  priceFor: (priceName: string) => number;
}) {
  return (
    <div className="space-y-8 pt-2">
      <div>
        <h3 className="text-xl font-bold text-stone-900">Elegí los materiales de tu MOVARA</h3>
        <p className="text-stone-500 text-sm mt-1">
          Fotos de referencia — el color y la textura final pueden variar levemente según el lote de fabricación. Las opciones marcadas con
          &quot;+ USD&quot; suman ese monto al precio estimado.
        </p>
      </div>
      <div className="space-y-8">
        {MATERIAL_CATEGORY_GROUPS.map((cat) => (
          <div key={cat.key} className="pb-8 border-b border-stone-200 last:border-b-0 last:pb-0">
            <CategoryGroupBlock category={cat} seleccion={seleccion} onSelect={onSelect} priceFor={priceFor} />
          </div>
        ))}
      </div>
    </div>
  );
}
