import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { db } from "@/lib/db";
import { PedidoDocumentCliente } from "@/lib/pdf/PedidoDocumentCliente";
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

  const fechaEs = config.updatedAt.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const pdfBuffer = await renderToBuffer(
    PedidoDocumentCliente({
      data: config as unknown as PedidoInput,
      fechaEs,
      numeroPedido: config.numeroPedido,
      precioFinal: config.precioFinal,
      anticipo: config.anticipo,
      saldoPendiente: config.saldoPendiente,
    })
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="pedido-cliente-${config.clienteNombre.replace(/\s+/g, "-").toLowerCase()}.pdf"`,
    },
  });
}
