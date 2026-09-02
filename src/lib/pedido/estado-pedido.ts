export const estadoPedidoOptions = [
  "consulta",
  "presupuestado",
  "confirmado",
  "en_produccion",
  "en_transito",
  "en_aduana",
  "entregado",
] as const;

export type EstadoPedido = (typeof estadoPedidoOptions)[number];

export const estadoPedidoLabels: Record<EstadoPedido, string> = {
  consulta: "Consulta",
  presupuestado: "Presupuestado",
  confirmado: "Confirmado",
  en_produccion: "En producción",
  en_transito: "En tránsito",
  en_aduana: "En aduana",
  entregado: "Entregado",
};

export function estadoPedidoIndex(estado: string): number {
  return estadoPedidoOptions.indexOf(estado as EstadoPedido);
}
