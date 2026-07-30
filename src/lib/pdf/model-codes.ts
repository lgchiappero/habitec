import type { PedidoInput } from "@/lib/validators/pedido";

// Referencia interna para el proveedor — solo va en la sección técnica del PDF.
// Proveedor: Heshi (reemplaza al proveedor anterior, cuyos códigos eran dcgtsy-*).
// Actualizar acá cuando se confirmen los códigos definitivos con Heshi.
export const MODEL_CODES: Record<PedidoInput["modelo"], string> = {
  "10ft": "a confirmar con Heshi",
  "20ft": "HS-09 (Heshi)",
  "40ft": "a confirmar con Heshi",
};
