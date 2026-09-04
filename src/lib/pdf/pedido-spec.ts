import type { PedidoInput } from "@/lib/validators/pedido";
import { getModeloKey, REGIONAL_MODELS } from "@/data/regional-models";
import { findUpgrade } from "@/data/configurador-catalog";
import { MATERIAL_CATEGORY_GROUPS, findMaterialOption } from "@/data/material-catalog";
import {
  finalidadLabels,
  tipoCocinaLabels,
  tipoAguaLabels,
  lavarropasLabels,
} from "@/lib/pdf/pedido-labels";
import { MODEL_CODES } from "@/lib/pdf/model-codes";

// Referencia técnica en inglés para el proveedor. Las etiquetas de materiales
// (StepMateriales.tsx) están solo en español — se muestran tal cual acá;
// traducirlas al inglés queda fuera de este alcance.
const SELECTOR_LABELS_EN: Record<string, string> = {
  exterior: "Exterior finish",
  piso: "Flooring",
  panelesBano: "Bathroom wall panels",
  puertaBano: "Bathroom door",
  banera: "Bathtub",
  cocina: "Kitchen",
  mesada: "Countertop",
  cocinaAmpliada: "Extended kitchen",
  puertaPrincipal: "Main door",
  ventanas: "Windows",
  muroVidrio: "Glass curtain wall",
  galeria: "Covered gallery",
};

export type SupplierSpecLine = { type: "line"; label: string; value: string };
export type SupplierSpecGroup = {
  type: "group";
  title: string;
  rows: { label: string; value: string }[];
  note?: string;
};
export type SupplierSpecItem = SupplierSpecLine | SupplierSpecGroup;

export function buildSupplierSpecItems(data: PedidoInput): SupplierSpecItem[] {
  const regionalKey = getModeloKey(data.provincia, data.localidad);
  const regional = REGIONAL_MODELS[regionalKey];

  const upgradeRows = data.upgrades
    .map((key) => findUpgrade(regionalKey, key)?.nombre)
    .filter((n): n is string => Boolean(n))
    .map((nombre) => ({ label: "Upgrade", value: nombre }));

  const materialGroups: SupplierSpecGroup[] = MATERIAL_CATEGORY_GROUPS.map((group) => {
    const seenKeys = new Set<string>();
    const rows: { label: string; value: string }[] = [];
    for (const selector of group.selectors) {
      if (seenKeys.has(selector.key)) continue;
      seenKeys.add(selector.key);
      const found = findMaterialOption(selector.key, data.materiales[selector.key] ?? null);
      rows.push({
        label: SELECTOR_LABELS_EN[selector.key] ?? selector.key,
        value: found ? found.option.label : "Not included",
      });
    }
    return { type: "group", title: group.title, rows };
  });

  return [
    { type: "line", label: "MODEL", value: `${data.modelo} (ref. code: ${MODEL_CODES[data.modelo]})` },
    { type: "line", label: "PURPOSE", value: finalidadLabels[data.finalidad] },
    { type: "line", label: "LOCATION", value: `${data.localidad}, ${data.provincia}` },
    { type: "line", label: "REGION", value: regional?.region ?? regionalKey },
    {
      type: "group",
      title: "LAYOUT",
      rows: [
        { label: "Bedrooms", value: String(data.habitaciones) },
        { label: "Kitchen", value: data.incluyeCocina ? tipoCocinaLabels[data.tipoCocina] : "Not included" },
        { label: "Bathroom", value: data.incluyeBano ? tipoAguaLabels[data.tipoAgua] : "Not included" },
        { label: "Washing machine", value: lavarropasLabels[data.lavarropas] },
      ],
    },
    ...materialGroups,
    ...(upgradeRows.length
      ? [{ type: "group" as const, title: "UPGRADES TO QUOTE", rows: upgradeRows }]
      : []),
  ];
}
