import type { PedidoInput } from "@/lib/validators/pedido";

// Etiquetas en inglés — el spec técnico para el proveedor se genera en inglés.

export const modeloLabels: Record<PedidoInput["modelo"], string> = {
  "10ft": "10ft (18m²)",
  "20ft": "20ft (38m²)",
  "40ft": "40ft (77m²)",
};

export const finalidadLabels: Record<PedidoInput["finalidad"], string> = {
  inversor: "Investment / rental",
  agro: "Agriculture / rural",
  vivienda: "Primary residence",
  turismo: "Tourism & hospitality",
  empresa: "Business / B2B",
  "sector-publico": "Public sector",
};

export const tipoCocinaLabels: Record<PedidoInput["tipoCocina"], string> = {
  electrico: "Electric cooktop",
  gas: "Gas-ready",
};

export const tipoAguaLabels: Record<PedidoInput["tipoAgua"], string> = {
  "calefon-electrico": "Electric water heater",
  "termotanque-gas": "Gas water heater space",
};

export const lavarropasLabels: Record<PedidoInput["lavarropas"], string> = {
  sin: "No space provided",
  bano: "Bathroom space",
  cocina: "Kitchen space",
  externo: "External space with drain",
};

export function yesNo(value: boolean): string {
  return value ? "Yes" : "No";
}
