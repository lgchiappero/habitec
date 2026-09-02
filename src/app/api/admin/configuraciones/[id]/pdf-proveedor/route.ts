import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { db } from "@/lib/db";
import { PedidoDocumentProveedor } from "@/lib/pdf/PedidoDocumentProveedor";
import type { PedidoInput } from "@/lib/validators/pedido";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const config = await db.configuracionPedido.findUnique({ where: { id } });

  if (!config || config.estado === "pendiente") {
    return NextResponse.json({ error: "Configuración no encontrada" }, { status: 404 });
  }

  const fechaIso = config.updatedAt.toISOString().slice(0, 10);

  const pdfBuffer = await renderToBuffer(
    PedidoDocumentProveedor({
      data: config as unknown as PedidoInput,
      fechaIso,
      numeroPedido: config.numeroPedido,
      numeroFabrica: config.numeroFabrica,
    })
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="pedido-proveedor-${config.clienteNombre.replace(/\s+/g, "-").toLowerCase()}.pdf"`,
    },
  });
}
