import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ensureNumeroPedido } from "@/lib/pedido/numero-pedido";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const config = await db.configuracionPedido.findUnique({ where: { id } });
  if (!config) {
    return NextResponse.json({ error: "Configuración no encontrada" }, { status: 404 });
  }
  if (config.estadoPedido !== "confirmado") {
    return NextResponse.json(
      { error: "El pedido debe estar confirmado para generar el número" },
      { status: 400 }
    );
  }

  const numeroPedido = await ensureNumeroPedido(id);
  return NextResponse.json({ ok: true, numeroPedido });
}
